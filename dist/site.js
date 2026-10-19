const preferenceStorage = "auraBeautyPreferences";
const usdToRub = 83.6177;

function loadPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(preferenceStorage));
    return {
      lang: saved?.lang === "en" ? "en" : "ru",
      currency: saved?.currency === "USD" ? "USD" : "RUB"
    };
  } catch {
    return {lang: "ru", currency: "RUB"};
  }
}

let preferences = loadPreferences();

function translatePage() {
  document.documentElement.lang = preferences.lang;
  const isCatalog = /products(?:\.html)?\/?$/.test(window.location.pathname);
  document.title = isCatalog
    ? (preferences.lang === "ru" ? "Товары — Aura Beauty" : "Products — Aura Beauty")
    : (preferences.lang === "ru" ? "Aura Beauty — профессиональная косметика" : "Aura Beauty — professional cosmetics");
  document.querySelectorAll("[data-ru][data-en]").forEach((element) => {
    element.textContent = element.dataset[preferences.lang];
  });
  document.querySelectorAll("[data-placeholder-ru][data-placeholder-en]").forEach((element) => {
    element.placeholder = element.dataset[`placeholder${preferences.lang === "ru" ? "Ru" : "En"}`];
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === preferences.lang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-currency-select]").forEach((select) => {
    select.value = preferences.currency;
    select.setAttribute("aria-label", preferences.lang === "ru" ? "Выбрать валюту" : "Choose currency");
  });
  document.dispatchEvent(new CustomEvent("aura:preferences", {detail: {...preferences}}));
}

function savePreferences() {
  localStorage.setItem(preferenceStorage, JSON.stringify(preferences));
  translatePage();
}

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    preferences.lang = button.dataset.lang;
    savePreferences();
  });
});

document.querySelectorAll("[data-currency-select]").forEach((select) => {
  select.addEventListener("change", () => {
    preferences.currency = select.value === "USD" ? "USD" : "RUB";
    savePreferences();
  });
});

window.AuraPreferences = {
  get lang() { return preferences.lang; },
  get currency() { return preferences.currency; },
  get rate() { return usdToRub; },
  text(ru, en) { return preferences.lang === "ru" ? ru : en; },
  formatPrice(usd) {
    if (preferences.currency === "USD") {
      return new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(usd);
    }
    return `≈ ${new Intl.NumberFormat("ru-RU", {style: "currency", currency: "RUB", maximumFractionDigits: 0}).format(usd * usdToRub)}`;
  }
};

translatePage();
