#!/usr/bin/env python3
"""Regenerate LingoStep PWA icons from the OFFICIAL logo.

The canonical icon set (icons/icon-192.png, icon-512.png, maskable
variants, favicon-64.png) ships in the repository and displays the real
LingoStep logo (blue speech bubble + waveform + pencil). This script no
longer draws a placeholder letter "L" — it derives every size from the
official 512px logo so proportions, transparency and brand identity are
preserved.

Usage:
    python3 scripts/make-icons.py                 # icons/icon-512.png is the source
    python3 scripts/make-icons.py path/to/logo.png  # or an explicit source
"""
from PIL import Image
import os
import sys

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'icons')
os.makedirs(OUT, exist_ok=True)

DEFAULT_SOURCE = os.path.join(OUT, 'icon-512.png')


def load_source():
    src_path = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_SOURCE
    if not os.path.exists(src_path):
        raise SystemExit(
            f"Source logo not found: {src_path}\n"
            "Provide the official LingoStep logo, e.g.:\n"
            "  python3 scripts/make-icons.py /path/to/lingostep-logo.png"
        )
    img = Image.open(src_path).convert('RGBA')
    if img.width != img.height:
        side = max(img.width, img.height)
        canvas = Image.new('RGBA', (side, side), (0, 0, 0, 0))
        canvas.alpha_composite(img, ((side - img.width) // 2, (side - img.height) // 2))
        img = canvas
    return img


def rounded(img, radius_ratio=0.22):
    """Apply rounded-corner transparency like an app tile."""
    size = img.width
    mask = Image.new('L', (size, size), 0)
    from PIL import ImageDraw
    ImageDraw.Draw(mask).rounded_rectangle(
        [0, 0, size - 1, size - 1], radius=int(size * radius_ratio), fill=255)
    out = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    out.paste(img, (0, 0), mask)
    return out


def main():
    src = load_source()

    # standard "any" icons — official artwork, scaled down
    for size in (192, 512):
        src.resize((size, size), Image.LANCZOS).save(
            os.path.join(OUT, f'icon-{size}.png'))

    # maskable: full-bleed square, artwork inside the 80% safe zone
    for size in (192, 512):
        canvas = Image.new('RGBA', (size, size), (26, 92, 198, 255))  # brand blue
        inner = int(size * 0.80)
        art = src.resize((inner, inner), Image.LANCZOS)
        canvas.alpha_composite(art, ((size - inner) // 2, (size - inner) // 2))
        canvas.save(os.path.join(OUT, f'icon-{size}-maskable.png'))

    # favicon
    src.resize((64, 64), Image.LANCZOS).save(os.path.join(OUT, 'favicon-64.png'))
    print('icons regenerated from official logo →', OUT)


if __name__ == '__main__':
    main()
