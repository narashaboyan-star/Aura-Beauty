"""Grounded Aura Beauty knowledge retrieval without customer or order data."""

import json
import re
import unicodedata
from pathlib import Path

from . import db
from .catalog import CATEGORIES


KNOWLEDGE_PATH = Path(__file__).resolve().parent.parent / "knowledge" / "aura_beauty.json"
STOP_WORDS = {
    "а", "и", "в", "во", "вы", "для", "до", "как", "какая", "какие", "какой",
    "ли", "мне", "мы", "на", "о", "об", "по", "у", "что", "это", "я", "есть",
}
CATEGORY_KEYWORDS = {
    "skincare": ["уход за кожей", "кожа", "лицо", "skincare"],
    "hair": ["уход за волосами", "волосы", "hair"],
    "makeup": ["макияж", "декоративная косметика", "makeup"],
    "tools": ["кисти", "аксессуары", "спонж", "tools"],
}


def _normalize(value):
    text = unicodedata.normalize("NFKC", str(value or "")).lower().replace("ё", "е")
    return " ".join(re.findall(r"[a-zа-я0-9]+", text))


def _tokens(value):
    return {token for token in _normalize(value).split() if len(token) > 1 and token not in STOP_WORDS}


def load_entries():
    with KNOWLEDGE_PATH.open(encoding="utf-8") as source:
        payload = json.load(source)
    return payload.get("entries", [])


def _catalog_entries():
    entries = []
    for item in db.list_products():
        stock = item.get("stock_quantity")
        available = db.product_is_available(item)
        availability = "в наличии" if available else "временно недоступен"
        stock_text = "остаток не ограничен числом" if stock is None else f"остаток {int(stock)} шт."
        entries.append({
            "id": f"product-{item['id']}",
            "title": f"{item['brand']} — {item['name']}",
            "keywords": [
                item["id"], item["brand"], item["name"], item["category"],
                CATEGORIES.get(item["category"], ""),
                *CATEGORY_KEYWORDS.get(item["category"], []),
                *sorted(_tokens(f"{item['brand']} {item['name']}")),
            ],
            "text": (f"{item['brand']} — {item['name']}. Актуальная серверная цена: "
                     f"${item['price']:.2f}. Статус: {availability}; {stock_text}."),
        })
    return entries


def _score(query, entry):
    query_text = _normalize(query)
    query_tokens = _tokens(query_text)
    keywords = [_normalize(value) for value in entry.get("keywords", [])]
    entry_tokens = _tokens(" ".join(keywords + [entry.get("title", "")]))
    overlap = len(query_tokens & entry_tokens)
    phrase_hits = sum(1 for keyword in keywords if keyword and keyword in query_text)
    return overlap + phrase_hits * 3


def search(question, limit=3):
    """Return only relevant public facts. Customer records and orders are never read."""
    query = str(question or "").strip()[:800]
    if not query:
        return []
    entries = load_entries() + _catalog_entries()
    ranked = sorted(((_score(query, entry), entry) for entry in entries),
                    key=lambda pair: pair[0], reverse=True)
    return [entry for score, entry in ranked[:limit] if score >= 3]


def context_text(entries):
    return "\n".join(f"- {entry['title']}: {entry['text']}" for entry in entries)
