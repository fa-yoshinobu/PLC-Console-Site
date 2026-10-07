#!/usr/bin/env python3
"""Generate sitemap.xml for the FA Labo PLC Console manual site.

Every canonical public HTML page is listed with an absolute URL. `404.html`,
compatibility redirects and the `templates/` directory are excluded. Actual
page-update dates come from .github/sitemap-lastmod.json, never the build date.

Usage:
    python .github/scripts/build_sitemap.py            # write sitemap.xml
    python .github/scripts/build_sitemap.py --check    # fail if sitemap.xml is stale
"""

from __future__ import annotations

import argparse
import json
import sys
from datetime import date
from pathlib import Path

from site_config import REDIRECTS, SITE_ORIGIN

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "sitemap.xml"
EXCLUDED = {"404.html", *REDIRECTS}
LASTMOD = ROOT / ".github" / "sitemap-lastmod.json"


def pages() -> list[str]:
    rels = sorted(
        p.relative_to(ROOT).as_posix()
        for p in ROOT.rglob("*.html")
        if "templates" not in p.relative_to(ROOT).parts
        and p.relative_to(ROOT).as_posix() not in EXCLUDED
    )
    return rels


def loc_for(rel: str) -> str:
    if rel == "index.html":
        return f"{SITE_ORIGIN}/"
    return f"{SITE_ORIGIN}/{rel}"


def build() -> str:
    rels = pages()
    modified = json.loads(LASTMOD.read_text(encoding="utf-8"))
    if not isinstance(modified, dict):
        raise SystemExit("sitemap-lastmod.json must be an object mapping page paths to dates")
    missing = set(rels) - modified.keys()
    extra = modified.keys() - set(rels)
    if missing or extra:
        raise SystemExit(
            "sitemap-lastmod.json paths differ from canonical pages: "
            f"missing={sorted(missing)}, extra={sorted(extra)}"
        )
    for rel, value in modified.items():
        try:
            valid = isinstance(value, str) and date.fromisoformat(value).isoformat() == value
        except ValueError:
            valid = False
        if not valid:
            raise SystemExit(f"sitemap-lastmod.json: {rel} must have a YYYY-MM-DD date")
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for rel in rels:
        priority = "1.0" if rel == "index.html" else "0.7"
        lines += [
            "  <url>",
            f"    <loc>{loc_for(rel)}</loc>",
            f"    <lastmod>{modified[rel]}</lastmod>",
            f"    <priority>{priority}</priority>",
            "  </url>",
        ]
    lines.append("</urlset>")
    return "\n".join(lines) + "\n"


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()

    expected = build()
    if args.check:
        if not OUTPUT.exists() or OUTPUT.read_text(encoding="utf-8") != expected:
            print("sitemap.xml is out of date. Run build_sitemap.py.")
            return 1
        print(f"sitemap.xml is current: {len(pages())} URLs.")
        return 0

    OUTPUT.write_text(expected, encoding="utf-8", newline="\n")
    print(f"sitemap.xml written: {len(pages())} URLs.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
