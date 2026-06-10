#!/usr/bin/env python3
"""Validate the PLC IO Checker static manual site."""

from __future__ import annotations

import difflib
import posixpath
import sys
from dataclasses import dataclass, field
from html import escape
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parents[2]
TEMPLATE = ROOT / "templates" / "page-shell.html.tmpl"
NAV_JS = (ROOT / "assets" / "nav.js").resolve()
VOID_TAGS = {
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
}
SKIPPED_LINK_SCHEMES = {"http", "https", "mailto"}


@dataclass
class SiteIssue:
    path: Path
    line: int | None
    message: str

    def format(self) -> str:
        rel = relpath(self.path)
        if self.line is None:
            return f"{rel}: {self.message}"
        return f"{rel}:{self.line}: {self.message}"


@dataclass
class Element:
    tag: str
    attrs: list[tuple[str, str | None]]
    line: int | None = None
    children: list[Element | str] = field(default_factory=list)


class SiteHTMLParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.references: list[tuple[int, str, str, str]] = []
        self.images: list[tuple[int, dict[str, str | None]]] = []
        self.script_sources: list[tuple[int, str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self._inspect_tag(tag.lower(), attrs)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self._inspect_tag(tag.lower(), attrs)

    def _inspect_tag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        line = self.getpos()[0]
        attr_map = dict(attrs)
        for attr_name in ("href", "src"):
            value = attr_map.get(attr_name)
            if value is not None:
                self.references.append((line, tag, attr_name, value))
        if tag == "img":
            self.images.append((line, attr_map))
        if tag == "script":
            src = attr_map.get("src")
            if src is not None:
                self.script_sources.append((line, src))


class DOMParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Element("#document", [])
        self.stack = [self.root]

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        element = Element(tag.lower(), attrs, self.getpos()[0])
        self.stack[-1].children.append(element)
        if element.tag not in VOID_TAGS:
            self.stack.append(element)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        element = Element(tag.lower(), attrs, self.getpos()[0])
        self.stack[-1].children.append(element)

    def handle_endtag(self, tag: str) -> None:
        target = tag.lower()
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == target:
                del self.stack[index:]
                return

    def handle_data(self, data: str) -> None:
        text = " ".join(data.split())
        if text:
            self.stack[-1].children.append(text)


def relpath(path: Path) -> str:
    return path.resolve().relative_to(ROOT).as_posix()


def iter_pages() -> list[Path]:
    return sorted(
        path
        for path in ROOT.rglob("*.html")
        if "templates" not in path.relative_to(ROOT).parts
    )


def read_text(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def parse_site_html(source: str) -> SiteHTMLParser:
    parser = SiteHTMLParser()
    parser.feed(source)
    return parser


def parse_dom(source: str) -> Element:
    parser = DOMParser()
    parser.feed(source)
    return parser.root


def class_names(attrs: Iterable[tuple[str, str | None]]) -> set[str]:
    for name, value in attrs:
        if name == "class" and value:
            return set(value.split())
    return set()


def find_headers(node: Element) -> list[Element]:
    headers: list[Element] = []
    for child in node.children:
        if isinstance(child, Element):
            if child.tag == "header" and "site-header" in class_names(child.attrs):
                headers.append(child)
            headers.extend(find_headers(child))
    return headers


def base_prefix(page: Path) -> str:
    depth = len(page.relative_to(ROOT).parent.parts)
    return "../" * depth


def normalized_attrs(element: Element) -> list[tuple[str, str]]:
    normalized: list[tuple[str, str]] = []
    original_classes = class_names(element.attrs)
    for name, value in element.attrs:
        if name == "aria-current":
            continue
        if name == "aria-label" and element.tag == "a" and "brand" in original_classes:
            continue
        if name == "class":
            classes = sorted(cls for cls in (value or "").split() if cls != "active")
            if classes:
                normalized.append((name, " ".join(classes)))
            continue
        normalized.append((name, "" if value is None else value))
    return sorted(normalized)


def render_normalized(node: Element | str, indent: int = 0) -> list[str]:
    prefix = "  " * indent
    if isinstance(node, str):
        return [f"{prefix}{escape(node)}"]

    attrs = "".join(
        f' {name}="{escape(value, quote=True)}"' for name, value in normalized_attrs(node)
    )
    if not node.children:
        return [f"{prefix}<{node.tag}{attrs}>"]

    lines = [f"{prefix}<{node.tag}{attrs}>"]
    for child in node.children:
        lines.extend(render_normalized(child, indent + 1))
    lines.append(f"{prefix}</{node.tag}>")
    return lines


def header_for(path: Path, source: str) -> Element | None:
    headers = find_headers(parse_dom(source))
    if len(headers) != 1:
        return None
    return headers[0]


def is_skipped_reference(value: str) -> bool:
    stripped = value.strip()
    if not stripped or stripped.startswith("#"):
        return True
    parsed = urlsplit(stripped)
    return parsed.scheme.lower() in SKIPPED_LINK_SCHEMES


def resolve_reference(page: Path, value: str) -> Path | None:
    parsed = urlsplit(value.strip())
    path = unquote(parsed.path)
    if not path:
        return None
    if path.startswith("/"):
        target = ROOT / path.lstrip("/")
    else:
        normalized = posixpath.normpath(path)
        target = page.parent / Path(*normalized.split("/"))
    return target.resolve()


def check_references(page: Path, parser: SiteHTMLParser) -> list[SiteIssue]:
    issues: list[SiteIssue] = []
    for line, tag, attr, value in parser.references:
        if is_skipped_reference(value):
            continue
        target = resolve_reference(page, value)
        if target is None:
            continue
        try:
            target.relative_to(ROOT)
        except ValueError:
            issues.append(
                SiteIssue(
                    page,
                    line,
                    f"{tag} {attr} points outside the repository: {value!r}",
                )
            )
            continue
        if not target.exists():
            issues.append(
                SiteIssue(
                    page,
                    line,
                    f"missing internal target for {tag} {attr}: {value!r}",
                )
            )
    return issues


def check_image_alt(page: Path, parser: SiteHTMLParser) -> list[SiteIssue]:
    issues: list[SiteIssue] = []
    for line, attrs in parser.images:
        alt = attrs.get("alt")
        if alt is None or not alt.strip():
            src = attrs.get("src") or "(no src)"
            issues.append(SiteIssue(page, line, f"img is missing non-empty alt: {src!r}"))
    return issues


def check_nav_js(page: Path, parser: SiteHTMLParser) -> list[SiteIssue]:
    for _line, src in parser.script_sources:
        if is_skipped_reference(src):
            continue
        target = resolve_reference(page, src)
        if target == NAV_JS:
            return []
    return [SiteIssue(page, None, "page does not load assets/nav.js")]


def expected_header_lines(page: Path, template_source: str) -> list[str] | None:
    source = template_source.replace("{{BASE}}", base_prefix(page))
    header = header_for(TEMPLATE, source)
    if header is None:
        return None
    return render_normalized(header)


def check_header(
    page: Path, source: str, template_source: str
) -> tuple[list[SiteIssue], list[str]]:
    header = header_for(page, source)
    expected = expected_header_lines(page, template_source)
    if header is None:
        return [SiteIssue(page, None, "expected exactly one site-header block")], []
    if expected is None:
        return [SiteIssue(TEMPLATE, None, "expected exactly one site-header block")], []

    actual = render_normalized(header)
    if actual == expected:
        return [], []

    diff = list(
        difflib.unified_diff(
            expected,
            actual,
            fromfile=f"{relpath(TEMPLATE)} expected for {relpath(page)}",
            tofile=relpath(page),
            lineterm="",
        )
    )
    return [SiteIssue(page, header.line, "site-header differs from template")], diff


def run() -> int:
    pages = iter_pages()
    template_source = read_text(TEMPLATE)
    issues: list[SiteIssue] = []
    header_diffs: list[tuple[Path, list[str]]] = []

    for page in pages:
        source = read_text(page)
        parser = parse_site_html(source)
        issues.extend(check_references(page, parser))
        issues.extend(check_image_alt(page, parser))
        issues.extend(check_nav_js(page, parser))
        header_issues, diff = check_header(page, source, template_source)
        issues.extend(header_issues)
        if diff:
            header_diffs.append((page, diff))

    if issues:
        print("Site check failed:")
        for issue in issues:
            print(f"- {issue.format()}")
        for page, diff in header_diffs:
            print()
            print(f"Header diff for {relpath(page)}:")
            print("\n".join(diff))
        return 1

    print(f"Site check passed: {len(pages)} HTML pages checked.")
    print("- internal href/src targets exist")
    print("- every img has non-empty alt")
    print("- every page loads assets/nav.js")
    print("- site-header blocks match templates/page-shell.html.tmpl")
    return 0


if __name__ == "__main__":
    sys.exit(run())
