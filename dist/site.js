const preferenceStorage = "auraBeautyPreferences";
const usdToRub = 83.6177;
const usdToAmd = 362.34;

function loadPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(preferenceStorage));
    return {
      lang: ["ru", "en", "hy"].includes(saved?.lang) ? saved.lang : "ru",
      currency: ["USD", "RUB", "AMD"].includes(saved?.currency) ? saved.currency : "RUB"
    };
  } catch {
    return {lang: "ru", currency: "RUB"};
  }
}

let preferences = loadPreferences();

function translatePage() {
  document.documentElement.lang = preferences.lang;
  const isCatalog = /products(?:\.html)?\/?$/.test(window.location.pathname);
  const titles = isCatalog
    ? {ru: "Товары — Aura Beauty", en: "Products — Aura Beauty", hy: "Ապրանքներ — Aura Beauty"}
    : {ru: "Aura Beauty — профессиональная косметика", en: "Aura Beauty — professional cosmetics", hy: "Aura Beauty — պրոֆեսիոնալ կոսմետիկա"};
  document.title = titles[preferences.lang];
  document.querySelectorAll("[data-ru][data-en]").forEach((element) => {
    element.textContent = element.dataset[preferences.lang] || element.dataset.ru;
  });
  document.querySelectorAll("[data-placeholder-ru][data-placeholder-en]").forEach((element) => {
    const key = `placeholder${preferences.lang === "ru" ? "Ru" : preferences.lang === "en" ? "En" : "Hy"}`;
    element.placeholder = element.dataset[key] || element.dataset.placeholderRu;
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    const active = button.dataset.lang === preferences.lang;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.querySelectorAll("[data-currency-select]").forEach((select) => {
    select.value = preferences.currency;
    select.setAttribute("aria-label", preferences.lang === "ru" ? "Выбрать валюту" : preferences.lang === "en" ? "Choose currency" : "Ընտրել արժույթը");
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
    preferences.currency = ["USD", "RUB", "AMD"].includes(select.value) ? select.value : "RUB";
    savePreferences();
  });
});

window.AuraPreferences = {
  get lang() { return preferences.lang; },
  get currency() { return preferences.currency; },
  get rate() { return usdToRub; },
  get amdRate() { return usdToAmd; },
  text(ru, en, hy) { return preferences.lang === "ru" ? ru : preferences.lang === "en" ? en : (hy || ru); },
  formatPrice(usd) {
    if (preferences.currency === "USD") {
      return new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(usd);
    }
    if (preferences.currency === "AMD") {
      return `≈ ${new Intl.NumberFormat("hy-AM", {style: "currency", currency: "AMD", maximumFractionDigits: 0}).format(usd * usdToAmd)}`;
    }
    return `≈ ${new Intl.NumberFormat("ru-RU", {style: "currency", currency: "RUB", maximumFractionDigits: 0}).format(usd * usdToRub)}`;
  }
};

translatePage();
