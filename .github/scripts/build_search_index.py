#!/usr/bin/env python3
"""Build the static full-text index used by search.html."""

from __future__ import annotations

import argparse
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "assets" / "search-index.js"
EXCLUDED = {"404.html", "search.html"}


class SearchPageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.in_main = False
        self.skip_depth = 0
        self.current_heading: list[str] | None = None
        self.current_h1: list[str] | None = None
        self.description = ""
        self.headings: list[str] = []
        self.h1 = ""
        self.text: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        tag = tag.lower()
        attr_map = dict(attrs)
        if tag == "meta" and attr_map.get("name") == "description":
            self.description = attr_map.get("content") or ""
        if tag == "main":
            self.in_main = True
        elif self.in_main and tag in {"script", "style", "nav", "noscript"}:
            self.skip_depth += 1
        elif self.in_main and not self.skip_depth and tag in {"h1", "h2", "h3"}:
            self.current_heading = []
            if tag == "h1":
                self.current_h1 = self.current_heading

    def handle_endtag(self, tag: str) -> None:
        tag = tag.lower()
        if tag == "main":
            self.in_main = False
        elif self.in_main and tag in {"script", "style", "nav", "noscript"} and self.skip_depth:
            self.skip_depth -= 1
        elif self.current_heading is not None and tag in {"h1", "h2", "h3"}:
            value = clean_text(" ".join(self.current_heading))
            if value:
                self.headings.append(value)
            if self.current_h1 is self.current_heading:
                self.h1 = value
            self.current_heading = None
            self.current_h1 = None

    def handle_data(self, data: str) -> None:
        if not self.in_main or self.skip_depth:
            return
        value = clean_text(data)
        if not value:
            return
        self.text.append(value)
        if self.current_heading is not None:
            self.current_heading.append(value)


def clean_text(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def pages() -> list[Path]:
    return sorted(
        path
        for path in ROOT.rglob("*.html")
        if "templates" not in path.relative_to(ROOT).parts
        and path.relative_to(ROOT).as_posix() not in EXCLUDED
    )


def build() -> str:
    entries: list[dict[str, object]] = []
    for path in pages():
        parser = SearchPageParser()
        parser.feed(path.read_text(encoding="utf-8"))
        entries.append(
            {
                "title": parser.h1,
                "url": path.relative_to(ROOT).as_posix(),
                "description": parser.description,
                "headings": parser.headings,
                "text": clean_text(" ".join(parser.text)),
            }
        )
    payload = json.dumps(entries, ensure_ascii=False, indent=2)
    return f"window.PLC_CONSOLE_SEARCH_INDEX = {payload};\n"


def main() -> int:
    argument_parser = argparse.ArgumentParser()
    argument_parser.add_argument("--check", action="store_true")
    args = argument_parser.parse_args()
    expected = build()
    if args.check:
        if not OUTPUT.exists() or OUTPUT.read_text(encoding="utf-8") != expected:
            print("Search index is out of date. Run build_search_index.py.")
            return 1
        print(f"Search index is current: {len(pages())} pages indexed.")
        return 0
    OUTPUT.write_text(expected, encoding="utf-8", newline="\n")
    print(f"Search index written: {len(pages())} pages indexed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
