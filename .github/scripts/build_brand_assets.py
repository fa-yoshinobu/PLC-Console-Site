#!/usr/bin/env python3
"""Generate raster brand assets (favicon PNG, apple-touch-icon, Open Graph cover).

These outputs are committed to the repository. They are NOT verified in CI because
rasterisation depends on locally installed fonts, which differ between machines.
Re-run this script only when the brand mark or cover art changes, then commit the
regenerated PNG files.

Usage:
    python .github/scripts/build_brand_assets.py

Requires Pillow. On Windows the script picks up Yu Gothic / Meiryo automatically;
on other platforms set PLC_BRAND_FONT / PLC_BRAND_FONT_BOLD to a CJK-capable .ttf.
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:  # pragma: no cover - tooling guard
    sys.stderr.write("Pillow is required: pip install Pillow\n")
    raise SystemExit(1)

ROOT = Path(__file__).resolve().parents[2]
ASSETS = ROOT / "assets"
IMAGES = ASSETS / "images"

ACCENT = (17, 115, 70)          # --accent  #117346
ACCENT_DARK = (11, 82, 50)      # deeper green for gradients
INK = (23, 33, 27)             # --ink     #17211b
BG = (245, 247, 245)           # --bg      #f5f7f5
WHITE = (255, 255, 255)

FONT_CANDIDATES = [
    os.environ.get("PLC_BRAND_FONT_BOLD"),
    r"C:\Windows\Fonts\YuGothB.ttc",
    r"C:\Windows\Fonts\meiryob.ttc",
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc",
    "/usr/share/fonts/truetype/noto/NotoSansCJKjp-Bold.otf",
]
FONT_CANDIDATES_REG = [
    os.environ.get("PLC_BRAND_FONT"),
    r"C:\Windows\Fonts\YuGothM.ttc",
    r"C:\Windows\Fonts\meiryo.ttc",
    "/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc",
]


def load_font(candidates: list[str | None], size: int) -> ImageFont.FreeTypeFont:
    for path in candidates:
        if path and Path(path).exists():
            try:
                return ImageFont.truetype(path, size=size)
            except OSError:
                continue
    return ImageFont.load_default()


def rounded_mark(size: int, radius_ratio: float = 0.22) -> Image.Image:
    """The FA Labo PLC Console mark: green rounded square with a white pulse."""
    scale = 4
    big = size * scale
    img = Image.new("RGBA", (big, big), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    radius = int(big * radius_ratio)
    draw.rounded_rectangle([0, 0, big - 1, big - 1], radius=radius, fill=ACCENT + (255,))

    # Pulse waveform, coordinates in a 64x64 design space (matches favicon.svg).
    pts = [(7, 39), (18, 39), (24.5, 21), (34, 48), (40, 35), (51, 35)]
    unit = big / 64
    draw.line([(x * unit, y * unit) for x, y in pts], fill=WHITE, width=int(5 * unit),
              joint="curve")
    for x, y in (pts[0], pts[-1]):
        r = 2.5 * unit
        draw.ellipse([x * unit - r, y * unit - r, x * unit + r, y * unit + r], fill=WHITE)

    return img.resize((size, size), Image.LANCZOS)


def write_icon(size: int, name: str) -> None:
    rounded_mark(size).save(ASSETS / name)
    print(f"wrote assets/{name} ({size}x{size})")


def vertical_gradient(w: int, h: int, top: tuple[int, int, int], bot: tuple[int, int, int]) -> Image.Image:
    base = Image.new("RGB", (w, h), top)
    grad = Image.new("L", (1, h))
    for y in range(h):
        grad.putpixel((0, y), int(255 * y / max(h - 1, 1)))
    grad = grad.resize((w, h))
    return Image.composite(Image.new("RGB", (w, h), bot), base, grad)


def build_og_cover() -> None:
    w, h = 1200, 630
    card = vertical_gradient(w, h, (240, 246, 242), (255, 255, 255))
    draw = ImageDraw.Draw(card)

    # Left accent bar.
    draw.rectangle([0, 0, 14, h], fill=ACCENT)

    pad = 84
    mark = rounded_mark(132)
    card.paste(mark, (pad, pad), mark)

    brand_font = load_font(FONT_CANDIDATES, 40)
    draw.text((pad + 160, pad + 34), "FA Labo", font=brand_font, fill=(90, 104, 96))

    title_font = load_font(FONT_CANDIDATES, 88)
    draw.text((pad, pad + 168), "PLC Console", font=title_font, fill=INK)

    sub_font = load_font(FONT_CANDIDATES, 46)
    draw.text((pad, pad + 288), "操作マニュアル", font=sub_font, fill=ACCENT)

    body_font = load_font(FONT_CANDIDATES_REG, 30)
    lines = [
        "MELSEC / KEYENCE PLC をスマホから",
        "監視・書込・タイムチャート・トラップ",
    ]
    for i, line in enumerate(lines):
        draw.text((pad, pad + 372 + i * 46), line, font=body_font, fill=(58, 72, 64))

    url_font = load_font(FONT_CANDIDATES_REG, 30)
    draw.text((pad, h - pad - 8), "plc-console.fa-labo.com", font=url_font, fill=(120, 132, 124))

    # Full app screenshot on the right, scaled to fit height with clean margins.
    shot_path = IMAGES / "monitoring" / "list-monitor.png"
    if shot_path.exists():
        shot = Image.open(shot_path).convert("RGB")
        target_h = h - 2 * 70
        ratio = target_h / shot.height
        shot = shot.resize((max(1, int(shot.width * ratio)), target_h), Image.LANCZOS)
        x = w - shot.width - 76
        y = 70
        card.paste(shot, (x, y))
        draw = ImageDraw.Draw(card)
        draw.rectangle([x - 1, y - 1, x + shot.width, y + shot.height], outline=(198, 208, 202), width=2)

    out = IMAGES / "og-cover.png"
    card.save(out)
    print(f"wrote assets/images/og-cover.png (1200x630)")


def main() -> int:
    ASSETS.mkdir(exist_ok=True)
    write_icon(32, "favicon-32.png")
    write_icon(180, "apple-touch-icon.png")
    write_icon(192, "icon-192.png")
    write_icon(512, "icon-512.png")
    build_og_cover()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
