"""Canonical catalog subset shared by the Telegram bot and order validation."""

PRODUCTS = {
    "ordinary": {"category": "skincare", "brand": "The Ordinary", "name": "Niacinamide 10% + Zinc 1%", "price": 6.0},
    "lucin": {"category": "skincare", "brand": "Lucin Organics", "name": "Vitamin C Serum", "price": 90.0},
    "laneige": {"category": "skincare", "brand": "LANEIGE", "name": "Water Sleeping Mask", "price": 33.0},
    "cosrx": {"category": "skincare", "brand": "COSRX", "name": "Advanced Snail 96 Mucin Essence", "price": 25.0},
    "rare": {"category": "makeup", "brand": "Rare Beauty", "name": "Soft Pinch Liquid Blush", "price": 25.0},
    "fenty": {"category": "makeup", "brand": "Fenty Beauty", "name": "Killawatt Freestyle Highlighter", "price": 40.0},
    "urban": {"category": "makeup", "brand": "Urban Decay", "name": "Naked3 Eyeshadow Palette", "price": 59.0},
    "charlotte": {"category": "makeup", "brand": "Charlotte Tilbury", "name": "Matte Revolution Lipstick", "price": 37.0},
    "clinique": {"category": "makeup", "brand": "Clinique", "name": "Almost Lipstick", "price": 25.0},
    "nars": {"category": "makeup", "brand": "NARS", "name": "Radiant Creamy Concealer", "price": 36.0},
    "k18": {"category": "hair", "brand": "K18", "name": "Leave-In Molecular Repair Hair Mask", "price": 75.0},
    "kerastase": {"category": "hair", "brand": "Kérastase", "name": "Résistance Masque Force Architecte", "price": 67.0},
    "olaplex": {"category": "hair", "brand": "OLAPLEX", "name": "N°.3PLUS Complete Repair Treatment", "price": 34.0},
    "beautyblender": {"category": "tools", "brand": "Beautyblender", "name": "Original Makeup Sponge", "price": 20.0},
    "rareBrush": {"category": "tools", "brand": "Rare Beauty", "name": "Soft Pinch Blush Brush", "price": 26.0},
}

CATEGORIES = {
    "skincare": "Уход за кожей",
    "hair": "Уход за волосами",
    "makeup": "Макияж",
    "tools": "Кисти и аксессуары",
}


def product(product_id):
    return PRODUCTS.get(product_id)


def products_in_category(category):
    return [(key, value) for key, value in PRODUCTS.items() if value["category"] == category]
