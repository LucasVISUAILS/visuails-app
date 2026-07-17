#!/usr/bin/env python3
"""
Generate calm-dark placeholder WebP images for the VISUAILS v4 rebuild.

Aesthetic: near-black background (#0b0d13), a single soft blurred radial
vignette glow (blue, low opacity), thin border, centered label text.
Deliberately avoids the "neon glow soup" look — one glow, one accent color,
low contrast, generous whitespace.
"""
import os
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images")
os.makedirs(OUT_DIR, exist_ok=True)

FONT_DIR = "/usr/share/fonts/truetype/dejavu"
FONT_REGULAR = os.path.join(FONT_DIR, "DejaVuSans.ttf")
FONT_BOLD = os.path.join(FONT_DIR, "DejaVuSans-Bold.ttf")

BG = (11, 13, 19)          # #0b0d13 near-black
SURFACE = (18, 21, 31)     # #12151f
ACCENT = (77, 141, 255)    # #4d8dff single blue accent
BORDER = (36, 41, 56)
TEXT_PRIMARY = (226, 230, 240)
TEXT_SECONDARY = (140, 148, 168)

random.seed(42)  # deterministic placement variety, but no time-based randomness


def rounded_rect(draw, box, radius, fill=None, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def add_vignette_glow(img, cx_ratio=0.5, cy_ratio=0.38, radius_ratio=0.55, color=ACCENT, opacity=46):
    """Single soft radial glow — calm, not flashy."""
    w, h = img.size
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    cx, cy = int(w * cx_ratio), int(h * cy_ratio)
    r = int(max(w, h) * radius_ratio)
    gd.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(*color, opacity))
    blur_radius = max(w, h) // 6
    glow = glow.filter(ImageFilter.GaussianBlur(blur_radius))
    img.paste(Image.alpha_composite(img.convert("RGBA"), glow).convert("RGB"), (0, 0))
    return img


def noise_texture(img, amount=3):
    """Extremely subtle grain so flat backgrounds don't look banded."""
    w, h = img.size
    px = img.load()
    for _ in range(int(w * h * 0.02)):
        x = random.randint(0, w - 1)
        y = random.randint(0, h - 1)
        r, g, b = px[x, y]
        d = random.randint(-amount, amount)
        px[x, y] = (max(0, min(255, r + d)), max(0, min(255, g + d)), max(0, min(255, b + d)))
    return img


def fit_font(draw, text, font_path, max_width, start_size, min_size=14):
    size = start_size
    while size > min_size:
        font = ImageFont.truetype(font_path, size)
        bbox = draw.textbbox((0, 0), text, font=font)
        if bbox[2] - bbox[0] <= max_width:
            return font
        size -= 2
    return ImageFont.truetype(font_path, min_size)


def base_canvas(w, h, glow=True, cx_ratio=0.5, cy_ratio=0.38):
    img = Image.new("RGB", (w, h), BG)
    if glow:
        img = add_vignette_glow(img, cx_ratio=cx_ratio, cy_ratio=cy_ratio)
    return img


def draw_frame(draw, w, h, margin=18, radius=20):
    rounded_rect(draw, [margin, margin, w - margin, h - margin], radius, outline=BORDER, width=2)


def draw_label_block(draw, w, h, eyebrow, title, sub=None):
    cy = h // 2
    if eyebrow:
        f_eyebrow = fit_font(draw, eyebrow.upper(), FONT_BOLD, w * 0.7, 22, 12)
        bbox = draw.textbbox((0, 0), eyebrow.upper(), font=f_eyebrow)
        tw = bbox[2] - bbox[0]
        draw.text(((w - tw) / 2, cy - 46), eyebrow.upper(), font=f_eyebrow, fill=ACCENT)

    f_title = fit_font(draw, title, FONT_BOLD, w * 0.8, 42, 18)
    bbox = draw.textbbox((0, 0), title, font=f_title)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    draw.text(((w - tw) / 2, cy - th / 2), title, font=f_title, fill=TEXT_PRIMARY)

    if sub:
        f_sub = fit_font(draw, sub, FONT_REGULAR, w * 0.7, 18, 12)
        bbox = draw.textbbox((0, 0), sub, font=f_sub)
        tw = bbox[2] - bbox[0]
        draw.text(((w - tw) / 2, cy + 34), sub, font=f_sub, fill=TEXT_SECONDARY)


def small_mark(draw, w, h):
    """Small corner brand mark so images feel consistent/branded."""
    f = ImageFont.truetype(FONT_BOLD, 16)
    draw.text((30, h - 46), "VISUAILS", font=f, fill=TEXT_SECONDARY)


def make_placeholder(filename, w, h, eyebrow, title, sub=None, cx_ratio=0.5, cy_ratio=0.38, glow_color=ACCENT):
    img = base_canvas(w, h, glow=True, cx_ratio=cx_ratio, cy_ratio=cy_ratio)
    img = noise_texture(img, amount=2)
    draw = ImageDraw.Draw(img)
    draw_frame(draw, w, h)
    draw_label_block(draw, w, h, eyebrow, title, sub)
    small_mark(draw, w, h)
    path = os.path.join(OUT_DIR, filename)
    img.convert("RGB").save(path, "WEBP", quality=82, method=6)
    print("wrote", filename)


def make_phone_mock(filename, w, h, label, sub, cx_ratio=0.5, glow_color=ACCENT):
    """Phone-frame style mock for hero before/after."""
    img = base_canvas(w, h, glow=True, cx_ratio=cx_ratio, cy_ratio=0.42)
    img = noise_texture(img, amount=2)
    draw = ImageDraw.Draw(img)
    draw_frame(draw, w, h)

    # inner "phone" rectangle
    pw, ph = int(w * 0.46), int(h * 0.62)
    px, py = (w - pw) // 2, (h - ph) // 2 - 10
    rounded_rect(draw, [px, py, px + pw, py + ph], 28, fill=SURFACE, outline=BORDER, width=2)

    f_label = fit_font(draw, label, FONT_BOLD, pw * 0.8, 26, 14)
    bbox = draw.textbbox((0, 0), label, font=f_label)
    tw = bbox[2] - bbox[0]
    draw.text((px + (pw - tw) / 2, py + ph / 2 - 20), label, font=f_label, fill=TEXT_PRIMARY)

    if sub:
        f_sub = fit_font(draw, sub, FONT_REGULAR, pw * 0.8, 16, 11)
        bbox = draw.textbbox((0, 0), sub, font=f_sub)
        tw = bbox[2] - bbox[0]
        draw.text((px + (pw - tw) / 2, py + ph / 2 + 14), sub, font=f_sub, fill=TEXT_SECONDARY)

    small_mark(draw, w, h)
    path = os.path.join(OUT_DIR, filename)
    img.convert("RGB").save(path, "WEBP", quality=82, method=6)
    print("wrote", filename)


def make_logo(filename, w=480, h=120):
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    f = ImageFont.truetype(FONT_BOLD, 44)
    text = "VISUAILS"
    bbox = draw.textbbox((0, 0), text, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((w - tw) / 2, (h - th) / 2 - bbox[1]), text, font=f, fill=(226, 230, 240, 255))
    # accent dot after wordmark
    dot_x = (w + tw) / 2 + 14
    dot_y = h / 2
    draw.ellipse([dot_x, dot_y - 6, dot_x + 12, dot_y + 6], fill=(*ACCENT, 255))
    path = os.path.join(OUT_DIR, filename)
    img.save(path, "WEBP", quality=90, method=6)
    print("wrote", filename)


# ---------------------------------------------------------------------------
# Manifest
# ---------------------------------------------------------------------------

STYLE_LABELS = {
    "catalog-classic": ("Catalog", "VISUAILS Classic Catalog"),
    "catalog-custom": ("Catalog · Custom", "Custom Brand Catalog"),
    "lifestyle-phone-made": ("Lifestyle", "Phone-Made Look"),
    "lifestyle-glow": ("Lifestyle", "Glow"),
    "lifestyle-flash": ("Lifestyle", "Flash"),
    "lifestyle-dunes": ("Lifestyle", "Dunes"),
    "lifestyle-custom": ("Lifestyle · Custom", "Custom Brand Lifestyle"),
    "video-motion": ("Video", "Motion"),
    "video-lifestyle": ("Video", "Lifestyle Video"),
    "video-campaign": ("Video", "Campaign Video"),
    "video-custom": ("Video · Custom", "Custom Campaign Video"),
}


def main():
    # --- Homepage hero transform visual (phone-mockup before/after) ---
    make_phone_mock("visuails-hero-before.webp", 640, 800, "Before", "Raw phone photo", cx_ratio=0.35)
    make_phone_mock("visuails-hero-after.webp", 640, 800, "After", "VISUAILS visual", cx_ratio=0.65)

    # --- Interactive process demo tabs ---
    make_placeholder("visuails-demo-catalog.webp", 720, 560, "Catalog Visuals", "Clean, on-white product shots", "From one product photo")
    make_placeholder("visuails-demo-lifestyle.webp", 720, 560, "Lifestyle Visuals", "Real-world scenes with AI models", "From one product photo")
    make_placeholder("visuails-demo-campaign.webp", 720, 560, "Campaign Visuals", "Motion & campaign-ready video", "From one product photo")

    # --- Models grid (10 standard models) ---
    for i in range(1, 11):
        make_placeholder(f"visuails-model-{i}.webp", 480, 640, "Standard Model", f"Model {i:02d}", "Ready to wear your brand", cx_ratio=0.5, cy_ratio=0.32)

    # --- Homepage before/after + gallery ---
    make_placeholder("visuails-home-before.webp", 720, 900, "Before", "Original product photo", cx_ratio=0.5, cy_ratio=0.4)
    make_placeholder("visuails-home-after.webp", 720, 900, "After", "VISUAILS ecommerce visual", cx_ratio=0.5, cy_ratio=0.4)
    for i in range(1, 9):
        make_placeholder(f"visuails-gallery-{i}.webp", 640, 800, "Gallery", f"Example {i:02d}", "Catalog · Lifestyle · Campaign", cx_ratio=0.5, cy_ratio=0.35)

    # --- About ---
    make_placeholder("visuails-about.webp", 800, 1000, "VISUAILS", "Behind the Studio", "Human-checked, AI-produced visuals", cx_ratio=0.5, cy_ratio=0.4)

    # --- Service hero images ---
    make_placeholder("visuails-catalog-images-hero.webp", 1200, 900, "Catalog Visuals", "Clean Ecommerce Product Photography", "From €19 per visual")
    make_placeholder("visuails-lifestyle-images-hero.webp", 1200, 900, "Lifestyle Visuals", "AI Models in Real-World Scenes", "From €35 per visual")
    make_placeholder("visuails-video-hero.webp", 1200, 900, "Product & Campaign Video", "Motion for Every Platform", "Get a quote")

    # --- Style card images ---
    for slug, (eyebrow, title) in STYLE_LABELS.items():
        make_placeholder(f"visuails-{slug}.webp", 640, 800, eyebrow, title, cx_ratio=0.5, cy_ratio=0.35)

    # --- Service before/after ---
    for svc in ["catalog", "lifestyle", "video"]:
        make_placeholder(f"visuails-{svc}-before.webp", 640, 800, "Before", "Raw product photo", cx_ratio=0.5, cy_ratio=0.4)
        make_placeholder(f"visuails-{svc}-after.webp", 640, 800, "After", f"VISUAILS {svc.capitalize()} Visual", cx_ratio=0.5, cy_ratio=0.4)

    # --- Service galleries (6 each) ---
    for svc, label in [("catalog", "Catalog"), ("lifestyle", "Lifestyle"), ("video", "Campaign")]:
        for i in range(1, 7):
            make_placeholder(f"visuails-{svc}-gallery-{i}.webp", 640, 800, label, f"Example {i:02d}", cx_ratio=0.5, cy_ratio=0.35)

    # --- Test sample input guidelines ---
    make_placeholder("visuails-input-good.webp", 400, 500, "Good Example", "Clear, Neutral, Well Lit", cx_ratio=0.5, cy_ratio=0.4, glow_color=ACCENT)
    make_placeholder("visuails-input-bad.webp", 400, 500, "Avoid", "Cluttered, Low Light", cx_ratio=0.5, cy_ratio=0.4, glow_color=(120, 60, 60))

    # --- Sitewide ---
    make_logo("visuails-logo.webp")
    make_placeholder("visuails-og-share-ai-product-visuals.webp", 1200, 630, "VISUAILS", "AI-Powered Product Visuals for Ecommerce Brands", "visuails.com", cx_ratio=0.5, cy_ratio=0.42)


if __name__ == "__main__":
    main()
