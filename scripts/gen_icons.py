#!/usr/bin/env python3
"""Generate LingoStep11 PWA icons (simple, clean, emerald graduation-cap glyph)."""
from PIL import Image, ImageDraw
import os

OUT = "/home/z/my-project/public/icons"
os.makedirs(OUT, exist_ok=True)

EMERALD = (5, 150, 105)        # #059669
WHITE = (255, 255, 255)

def rounded_rect_mask(size, radius):
    mask = Image.new("L", (size, size), 0)
    d = ImageDraw.Draw(mask)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    return mask

def make_icon(size: int, maskable: bool = False) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    if maskable:
        d.rectangle([0, 0, size, size], fill=EMERALD + (255,))
    else:
        bg = Image.new("RGBA", (size, size), (0, 0, 0, 0))
        bd = ImageDraw.Draw(bg)
        bd.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * 0.22), fill=EMERALD + (255,))
        m = rounded_rect_mask(size, int(size * 0.22))
        img = Image.composite(bg, img, m)
        d = ImageDraw.Draw(img)

    s = size / 512
    cx = size / 2
    cy = size * (0.48 if maskable else 0.46)
    # cap board (diamond)
    w, h = 150 * s, 62 * s
    d.polygon([(cx, cy - h), (cx + w, cy), (cx, cy + h), (cx - w, cy)], fill=WHITE)
    # cap base
    bw, bh = 78 * s, 60 * s
    d.rounded_rectangle(
        [cx - bw, cy - 6 * s, cx + bw, cy - 6 * s + bh],
        radius=int(10 * s),
        fill=WHITE,
    )
    # tassel
    d.line([(cx + 118 * s, cy + 2 * s), (cx + 118 * s, cy + 78 * s)], fill=WHITE, width=max(2, int(10 * s)))
    d.ellipse(
        [cx + 118 * s - 14 * s, cy + 78 * s, cx + 118 * s + 14 * s, cy + 78 * s + 26 * s],
        fill=WHITE,
    )
    # step chevrons (LingoStep brand cue)
    for k, dy in enumerate([104 * s, 136 * s]):
        cwid = (74 - k * 16) * s
        d.line(
            [(cx - cwid, cy + dy), (cx, cy + dy + 36 * s), (cx + cwid, cy + dy)],
            fill=(255, 255, 255, 235),
            width=max(2, int(18 * s)),
            joint="curve",
        )
    return img

for size in (192, 512):
    make_icon(size).save(f"{OUT}/icon-{size}.png", optimize=True)

make_icon(512, maskable=True).save(f"{OUT}/icon-512-maskable.png", optimize=True)
make_icon(64).save(f"{OUT}/icon-64.png", optimize=True)
print("icons written:", sorted(os.listdir(OUT)))
