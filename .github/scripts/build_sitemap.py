#!/usr/bin/env python3
"""Generate sitemap.xml for the FA Labo PLC Console manual site.

Every public HTML page is listed with an absolute URL. `404.html` and the
`templates/` directory are excluded. No `<lastmod>` is emitted so the output is
deterministic and safe to verify in CI.

Usage:
    python .github/scripts/build_sitemap.py            # write sitemap.xml
    python .github/scripts/build_sitemap.py --check    # fail if sitemap.xml is stale
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / "sitemap.xml"
SITE_ORIGIN = "https://plc-console.fa-labo.com"
EXCLUDED = {"404.html"}


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
    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ]
    for rel in pages():
        priority = "1.0" if rel == "index.html" else "0.7"
        lines += [
            "  <url>",
            f"    <loc>{loc_for(rel)}</loc>",
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
