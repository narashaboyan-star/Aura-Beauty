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
  const ordersOpen = document.querySelector("#telegram-orders-open");
  const ordersDialog = document.querySelector("#telegram-orders-dialog");
  const ordersClose = document.querySelector("#telegram-orders-close");
  const ordersRefresh = document.querySelector("#telegram-orders-refresh");
  const ordersMessage = document.querySelector("#telegram-orders-message");
  const ordersList = document.querySelector("#telegram-orders-list");
  const notificationsButton = document.querySelector("#telegram-notifications");
  let ordersTimer = null;

  const state = {
    active,
    preview,
    verified: false,
    createOrders: false,
    viewOrders: false,
    notificationsEnabled: false,
    writeAccess: "unknown",
    notificationMessage: "",
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
    ordersOpen.hidden = !state.viewOrders;
    notificationsButton.hidden = !state.verified;
    notificationsButton.textContent = state.notificationsEnabled
      ? tr("Выключить уведомления", "Disable notifications", "Անջատել ծանուցումները")
      : tr("Включить уведомления", "Enable notifications", "Միացնել ծանուցումները");
    retryButton.hidden = !["missing", "unavailable", "rejected"].includes(state.messageKey);
    statusPanel.dataset.state = state.messageKey;
    statusMessage.textContent = state.notificationMessage || messages[state.messageKey]();
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
      state.notificationsEnabled = session?.notifications?.enabled === true;
      state.writeAccess = session?.notifications?.writeAccess || "unknown";
      state.messageKey = state.createOrders ? "ready" : "linked";
      renderState();
    } catch {
      state.messageKey = "unavailable";
      renderState();
    }
  }

  async function apiRequest(path, options = {}) {
    if (!telegram?.initData || !state.verified) throw new Error("telegram-session-unavailable");
    const response = await fetch(path, {
      ...options,
      headers: {
        "Authorization": `tma ${telegram.initData}`,
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      credentials: "same-origin"
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload?.error || "request-failed");
    return payload;
  }

  async function createOrder(order) {
    if (!state.createOrders) throw new Error("checkout-unavailable");
    const payload = await apiRequest("/api/orders", {method: "POST", body: JSON.stringify(order)});
    return payload.order;
  }

  async function saveNotificationPreference(enabled, extra = {}) {
    const payload = await apiRequest("/api/telegram/notifications", {
      method: "POST",
      body: JSON.stringify({enabled, ...extra})
    });
    state.notificationsEnabled = payload.notifications?.enabled === true;
    state.writeAccess = payload.notifications?.writeAccess || state.writeAccess;
    renderState();
    return payload.notifications;
  }

  function requestNotifications() {
    state.notificationMessage = "";
    if (state.notificationsEnabled) {
      saveNotificationPreference(false).then(() => {
        state.notificationMessage = tr("Уведомления выключены. Статусы остаются в «Моих заказах».", "Notifications are off. Statuses remain under My orders.", "Ծանուցումներն անջատված են։ Կարգավիճակները կմնան «Իմ պատվերները» բաժնում։");
        renderState();
      }).catch(() => {
        statusMessage.textContent = tr("Не удалось изменить настройку. Попробуйте позже.", "Could not change the setting. Try again later.", "Չհաջողվեց փոխել կարգավորումը։ Փորձեք ավելի ուշ։");
      });
      return;
    }
    const alreadyWritable = ["chat_started", "granted_signed", "granted_client"].includes(state.writeAccess)
      || telegram?.initDataUnsafe?.user?.allows_write_to_pm === true;
    if (alreadyWritable) {
      saveNotificationPreference(true, {writeAccessGranted: true}).then(() => {
        state.notificationMessage = tr("Уведомления включены только для согласованных статусов заказов.", "Notifications are enabled only for agreed order statuses.", "Ծանուցումները միացված են միայն համաձայնեցված պատվերի կարգավիճակների համար։");
        renderState();
      }).catch(() => {
        statusMessage.textContent = tr("Не удалось включить уведомления. Статусы останутся в «Моих заказах».", "Could not enable notifications. Statuses remain under My orders.", "Չհաջողվեց միացնել ծանուցումները։ Կարգավիճակները կմնան «Իմ պատվերները» բաժնում։");
      });
      return;
    }
    if (!telegram?.isVersionAtLeast?.("6.9") || typeof telegram.requestWriteAccess !== "function") {
      statusMessage.textContent = tr("Этот Telegram-клиент не поддерживает запрос разрешения. Откройте чат с ботом и нажмите /start. Статусы доступны в «Моих заказах».", "This Telegram client cannot request permission. Open the bot chat and press /start. Statuses remain under My orders.", "Telegram-ի այս տարբերակը չի աջակցում թույլտվության հարցումը։ Բացեք բոտի զրույցը և սեղմեք /start։ Կարգավիճակները հասանելի են «Իմ պատվերները» բաժնում։");
      return;
    }
    telegram.requestWriteAccess((granted) => {
      if (granted) {
        saveNotificationPreference(true, {writeAccessGranted: true}).then(() => {
          state.notificationMessage = tr("Разрешение получено. Уведомления о статусах включены.", "Permission granted. Status notifications are enabled.", "Թույլտվությունը ստացվել է։ Կարգավիճակի ծանուցումները միացված են։");
          renderState();
        }).catch(() => {
          statusMessage.textContent = tr("Telegram разрешил сообщения, но настройку не удалось сохранить. Попробуйте ещё раз.", "Telegram allowed messages, but the setting could not be saved. Try again.", "Telegram-ը թույլատրել է հաղորդագրությունները, սակայն կարգավորումը չպահպանվեց։ Կրկին փորձեք։");
        });
      } else {
        state.notificationMessage = tr("Разрешение не дано. Сообщений не будет; статусы остаются в «Моих заказах».", "Permission was not granted. No messages will be sent; statuses remain under My orders.", "Թույլտվություն չի տրվել։ Հաղորդագրություններ չեն ուղարկվի, կարգավիճակները կմնան «Իմ պատվերները» բաժնում։");
        renderState();
        saveNotificationPreference(false, {writeAccessDenied: true}).then(() => renderState()).catch(() => {});
      }
    });
  }

  async function loadOrdersIntoDialog() {
    ordersList.replaceChildren();
    ordersMessage.textContent = tr("Загружаем заказы…", "Loading orders…", "Պատվերները բեռնվում են…");
    try {
      const payload = await apiRequest("/api/orders");
      ordersMessage.textContent = payload.orders.length
        ? tr("Статусы обновляются автоматически каждые 15 секунд.", "Statuses refresh automatically every 15 seconds.", "Կարգավիճակներն ինքնաբերաբար թարմացվում են յուրաքանչյուր 15 վայրկյանը մեկ։")
        : tr("Заказов пока нет.", "No orders yet.", "Պատվերներ դեռ չկան։");
      payload.orders.forEach((order) => {
        const card = document.createElement("article");
        card.className = "telegram-order-card";
        const status = {
          new: tr("Новый", "New", "Նոր"), confirmed: tr("Подтверждён", "Confirmed", "Հաստատված"),
          preparing: tr("Собирается", "Preparing", "Հավաքվում է"), sent: tr("Передан в доставку", "Handed to delivery", "Փոխանցվել է առաքման"),
          completed: tr("Выполнен", "Completed", "Կատարված"), cancelled: tr("Отменён", "Cancelled", "Չեղարկված")
        }[order.status] || order.status;
        const changed = order.updatedAt || order.createdAt;
        card.innerHTML = `<strong>${order.id}</strong><span>${status}</span><small>$${Number(order.totalUsd).toFixed(2)} · ${tr("обновлено", "updated", "թարմացվել է")} ${new Date(changed).toLocaleString()}</small>`;
        ordersList.append(card);
      });
    } catch {
      ordersMessage.textContent = tr("Не удалось загрузить заказы. Попробуйте позже.", "Could not load orders. Try again later.", "Չհաջողվեց բեռնել պատվերները։ Փորձեք ավելի ուշ։");
    }
  }

  function openOrders() {
    ordersDialog.showModal();
    loadOrdersIntoDialog();
    clearInterval(ordersTimer);
    ordersTimer = setInterval(() => {
      if (ordersDialog.open && document.visibilityState === "visible") loadOrdersIntoDialog();
    }, 15000);
  }

  function closeOrders() {
    clearInterval(ordersTimer);
    ordersTimer = null;
    ordersDialog.close();
  }

  window.AuraTelegram = {
    get active() { return state.active; },
    get verified() { return state.verified; },
    canCreateOrders() { return !state.active || state.createOrders; },
    canViewOrders() { return state.active && state.viewOrders; },
    createOrder,
    loadOrders() { return apiRequest("/api/orders"); },
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
  ordersOpen.addEventListener("click", openOrders);
  ordersClose.addEventListener("click", closeOrders);
  ordersDialog.addEventListener("close", () => {
    clearInterval(ordersTimer);
    ordersTimer = null;
  });
  ordersRefresh.addEventListener("click", loadOrdersIntoDialog);
  notificationsButton.addEventListener("click", requestNotifications);
  document.addEventListener("visibilitychange", () => {
    if (ordersDialog.open && document.visibilityState === "visible") loadOrdersIntoDialog();
  });
  document.addEventListener("aura:preferences", renderState);
  connectSession();
})();
