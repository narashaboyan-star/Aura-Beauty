"""Configure Telegram only after the production deployment is healthy.

This script reads local .env, never prints secrets, and applies the webhook,
commands and Mini App menu button to the single Aura Beauty bot.
"""

import json
from pathlib import Path
import urllib.request


def load_env():
    result = {}
    for line in Path(".env").read_text(encoding="utf-8").splitlines():
        if "=" in line and not line.lstrip().startswith("#"):
            key, value = line.split("=", 1)
            result[key.strip()] = value.strip()
    return result


def call(token, method, payload):
    request = urllib.request.Request(
        f"https://api.telegram.org/bot{token}/{method}",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(request, timeout=15) as response:
        result = json.load(response)
    if not result.get("ok"):
        raise RuntimeError(f"Telegram rejected {method}")
    return result.get("result")


def main():
    env = load_env()
    token = env.get("TELEGRAM_BOT_TOKEN", "")
    secret = env.get("TELEGRAM_WEBHOOK_SECRET", "")
    origin = env.get("SITE_ORIGIN", "").rstrip("/")
    if not token or not secret or not origin.startswith("https://"):
        raise SystemExit("TELEGRAM_BOT_TOKEN, TELEGRAM_WEBHOOK_SECRET and HTTPS SITE_ORIGIN are required")
    with urllib.request.urlopen(f"{origin}/api/health", timeout=15) as response:
        health = json.load(response)
    required = ("databaseConfigured", "telegramConfigured", "webhookSecretConfigured", "siteOriginConfigured")
    if not health.get("ok") or not all(health.get(key) for key in required):
        raise SystemExit("Production health check is incomplete; webhook was not changed")
    public_commands = [
        {"command": "start", "description": "Открыть Aura Beauty"},
        {"command": "id", "description": "Показать мой Telegram ID"},
    ]
    call(token, "setMyCommands", {"commands": public_commands})
    for value in env.get("TELEGRAM_ADMIN_USER_IDS", "").split(","):
        value = value.strip()
        if value.isdigit():
            call(token, "setMyCommands", {
                "scope": {"type": "chat", "chat_id": int(value)},
                "commands": public_commands + [{"command": "admin", "description": "Заказы администратора"}],
            })
    call(token, "setChatMenuButton", {"menu_button": {
        "type": "web_app", "text": "Открыть каталог", "web_app": {"url": f"{origin}/products.html"}
    }})
    call(token, "setWebhook", {
        "url": f"{origin}/api/telegram/webhook",
        "secret_token": secret,
        "allowed_updates": ["message", "callback_query"],
        "drop_pending_updates": False,
    })
    info = call(token, "getWebhookInfo", {})
    print("Telegram configuration applied")
    print("webhook_url=" + info.get("url", ""))
    print("pending_updates=" + str(info.get("pending_update_count", 0)))
    if info.get("last_error_message"):
        print("last_error=" + info["last_error_message"])


if __name__ == "__main__":
    main()
