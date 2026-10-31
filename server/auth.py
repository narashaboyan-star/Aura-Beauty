"""Telegram Mini App authentication."""

import hashlib
import hmac
import json
import time
from urllib.parse import parse_qsl


class TelegramAuthError(ValueError):
    pass


def validate_init_data(raw, bot_token, max_age_seconds=900, now=None):
    if not raw or not bot_token:
        raise TelegramAuthError("missing credentials")
    pairs = dict(parse_qsl(raw, keep_blank_values=True))
    received_hash = pairs.pop("hash", "")
    if not received_hash:
        raise TelegramAuthError("missing hash")
    data_check_string = "\n".join(f"{key}={pairs[key]}" for key in sorted(pairs))
    secret_key = hmac.new(b"WebAppData", bot_token.encode("utf-8"), hashlib.sha256).digest()
    expected_hash = hmac.new(secret_key, data_check_string.encode("utf-8"), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(expected_hash, received_hash):
        raise TelegramAuthError("invalid signature")
    try:
        auth_date = int(pairs["auth_date"])
        user = json.loads(pairs["user"])
        telegram_id = int(user["id"])
    except (KeyError, TypeError, ValueError, json.JSONDecodeError) as exc:
        raise TelegramAuthError("invalid identity") from exc
    current_time = int(time.time() if now is None else now)
    if auth_date > current_time + 30 or current_time - auth_date > max_age_seconds:
        raise TelegramAuthError("expired data")
    return {
        "telegram_id": telegram_id,
        "username": user.get("username", ""),
        "first_name": user.get("first_name", ""),
        "last_name": user.get("last_name", ""),
        "language_code": user.get("language_code", ""),
        "allows_write_to_pm": user.get("allows_write_to_pm") is True,
        "auth_date": auth_date,
    }


def parse_authorization(value):
    prefix = "tma "
    if not value or not value.startswith(prefix):
        raise TelegramAuthError("missing authorization")
    return value[len(prefix):]
