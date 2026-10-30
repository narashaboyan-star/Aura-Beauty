(() => {
  const telegram = window.Telegram?.WebApp;
  const query = new URLSearchParams(window.location.search);
  const preview = query.get("telegram-preview") === "1";
  const insideTelegram = Boolean(telegram && telegram.platform && telegram.platform !== "unknown");
  const active = insideTelegram || preview;
  const statusPanel = document.querySelector("#telegram-miniapp-status");
  const statusMessage = document.querySelector("#telegram-session-message");
  const retryButton = document.querySelector("#telegram-session-retry");
  const checkoutGate = document.querySelector("#telegram-checkout-gate");
  const checkoutButton = document.querySelector(".checkout-button");

  const state = {
    active,
    preview,
    verified: false,
    createOrders: false,
    viewOrders: false,
    messageKey: preview ? "preview" : "connecting"
  };

  function tr(ru, en, hy) {
    return window.AuraPreferences?.text(ru, en, hy) || ru;
  }

  const messages = {
    preview: () => tr(
      "Режим проверки: каталог и корзина готовы. Оформление и свои заказы откроются только после проверки Telegram и подключения общего сервера.",
      "Preview mode: the catalog and cart are ready. Checkout and order history require Telegram verification and the shared server.",
      "Փորձարկման ռեժիմ․ կատալոգն ու զամբյուղը պատրաստ են։ Պատվերի ձևակերպումն ու պատմությունը կբացվեն միայն Telegram-ի ստուգումից և ընդհանուր սերվերի միացումից հետո։"
    ),
    connecting: () => tr(
      "Проверяем безопасное подключение к Telegram…",
      "Checking the secure Telegram connection…",
      "Ստուգվում է Telegram-ի ապահով կապը…"
    ),
    missing: () => tr(
      "Telegram не передал данные входа. Откройте каталог кнопкой Mini App внутри личного чата с ботом.",
      "Telegram did not provide sign-in data. Open the catalog with the Mini App button in a private chat with the bot.",
      "Telegram-ը մուտքի տվյալներ չի փոխանցել։ Բացեք կատալոգը բոտի անձնական զրույցի Mini App կոճակով։"
    ),
    unavailable: () => tr(
      "Каталог работает, но общий сервер заказов пока недоступен. Корзина сохранится на этом устройстве — попробуйте позже.",
      "The catalog works, but the shared order server is not available yet. Your cart stays on this device—please try again later.",
      "Կատալոգն աշխատում է, բայց պատվերների ընդհանուր սերվերը դեռ հասանելի չէ։ Զամբյուղը կմնա այս սարքում․ փորձեք ավելի ուշ։"
    ),
    rejected: () => tr(
      "Не удалось подтвердить Telegram-покупателя. Оформление и свои заказы заблокированы для защиты данных.",
      "The Telegram buyer could not be verified. Checkout and order history are locked to protect customer data.",
      "Չհաջողվեց հաստատել Telegram գնորդին։ Տվյալների պաշտպանության համար պատվերի ձևակերպումն ու պատմությունը արգելափակված են։"
    ),
    linked: () => tr(
      "Telegram-покупатель подтверждён. Каталог и корзина готовы; сервер заказов будет подключён на следующем этапе.",
      "The Telegram buyer is verified. The catalog and cart are ready; the order service comes in the next stage.",
      "Telegram գնորդը հաստատված է։ Կատալոգն ու զամբյուղը պատրաստ են, իսկ պատվերների ծառայությունը կմիանա հաջորդ փուլում։"
    ),
    ready: () => tr(
      "Telegram-покупатель подтверждён. Оформление заказа доступно.",
      "The Telegram buyer is verified. Checkout is available.",
      "Telegram գնորդը հաստատված է։ Պատվերի ձևակերպումը հասանելի է։"
    )
  };

  function renderState() {
    if (!active) return;
    statusPanel.hidden = false;
    checkoutGate.hidden = state.createOrders;
    checkoutButton.disabled = !state.createOrders;
    checkoutButton.setAttribute("aria-disabled", String(!state.createOrders));
    retryButton.hidden = !["missing", "unavailable", "rejected"].includes(state.messageKey);
    statusPanel.dataset.state = state.messageKey;
    statusMessage.textContent = messages[state.messageKey]();
  }

  function applyTelegramViewport() {
    if (!telegram) return;
    const stableHeight = telegram.viewportStableHeight || telegram.viewportHeight;
    if (stableHeight) document.documentElement.style.setProperty("--telegram-stable-height", `${stableHeight}px`);
  }

  async function connectSession() {
    if (!active) return;
    state.verified = false;
    state.createOrders = false;
    state.viewOrders = false;

    if (preview) {
      state.messageKey = "preview";
      renderState();
      return;
    }

    if (!telegram?.initData) {
      state.messageKey = "missing";
      renderState();
      return;
    }

    state.messageKey = "connecting";
    renderState();

    try {
      const response = await fetch("/api/telegram/session", {
        method: "POST",
        headers: {
          "Authorization": `tma ${telegram.initData}`,
          "Content-Type": "application/json"
        },
        credentials: "same-origin",
        body: JSON.stringify({client: "aura-beauty-mini-app", version: 1})
      });

      if (!response.ok) {
        state.messageKey = response.status === 401 || response.status === 403 ? "rejected" : "unavailable";
        renderState();
        return;
      }

      const session = await response.json();
      state.verified = session?.verified === true;
      state.createOrders = state.verified && session?.capabilities?.createOrders === true;
      state.viewOrders = state.verified && session?.capabilities?.viewOrders === true;
      state.messageKey = state.createOrders ? "ready" : "linked";
      renderState();
    } catch {
      state.messageKey = "unavailable";
      renderState();
    }
  }

  window.AuraTelegram = {
    get active() { return state.active; },
    get verified() { return state.verified; },
    canCreateOrders() { return !state.active || state.createOrders; },
    canViewOrders() { return state.active && state.viewOrders; },
    guardCheckout() {
      if (!state.active || state.createOrders) return true;
      checkoutGate.hidden = false;
      checkoutGate.scrollIntoView({behavior: "smooth", block: "center"});
      return false;
    }
  };

  if (!active) return;

  document.documentElement.classList.add("telegram-mini-app");
  telegram?.ready();
  telegram?.expand();
  applyTelegramViewport();
  telegram?.onEvent?.("viewportChanged", applyTelegramViewport);
  retryButton.addEventListener("click", connectSession);
  document.addEventListener("aura:preferences", renderState);
  connectSession();
})();
