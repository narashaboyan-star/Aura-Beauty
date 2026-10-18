const products = {
  ordinary: {
    brand: "The Ordinary",
    name: "Niacinamide 10% + Zinc 1%",
    image: "assets/the-ordinary-niacinamide.webp",
    alt: "Сыворотка The Ordinary Niacinamide 10% + Zinc 1%",
    price: 6,
    currency: "USD",
    priceLabel: "$6",
    description: "Лёгкая водная сыворотка для кожи с расширенными порами, неровной текстурой и избыточной жирностью.",
    facts: [["Объём", "30 мл"], ["Активы", "Ниацинамид 10%, цинк 1%"], ["Подходит", "Для всех типов кожи"], ["Применение", "Несколько капель утром и вечером перед кремом"]]
  },
  lucin: {
    brand: "Lucin Organics",
    name: "Vitamin C Serum",
    image: "assets/user-brand-skincare.jpeg",
    alt: "Сыворотка Lucin Organics Vitamin C",
    price: 36000,
    currency: "AMD",
    priceLabel: "36 000 ֏",
    description: "Армянская органическая сыворотка для сияния кожи и более ровного тона с растительными маслами и стабилизированным витамином C.",
    facts: [["Объём", "30 мл"], ["Актив", "15% стабилизированный витамин C"], ["Эффект", "Сияние, восстановление и более ровный тон"], ["Применение", "Наносить перед кремом утром или вечером"]]
  },
  laneige: {
    brand: "LANEIGE • K-Beauty",
    name: "Water Sleeping Mask",
    image: "assets/laneige-water-sleeping-mask.jpg",
    alt: "Ночная маска LANEIGE Water Sleeping Mask",
    price: 33,
    currency: "USD",
    priceLabel: "$33",
    description: "Корейская ночная гель-маска, которая интенсивно увлажняет кожу и поддерживает защитный барьер во время сна.",
    facts: [["Объём", "70 мл"], ["Активы", "Ниацинамид, сквалан и гиалуроновая кислота"], ["Подходит", "Для нормальной, сухой, комбинированной и жирной кожи"], ["Применение", "Наносить вечером завершающим этапом ухода"]]
  },
  rare: {
    brand: "Rare Beauty • Румяна",
    name: "Soft Pinch Liquid Blush",
    image: "assets/rare-beauty-soft-pinch-blush.jpg",
    alt: "Жидкие румяна Rare Beauty Soft Pinch",
    price: 25,
    currency: "USD",
    priceLabel: "$25",
    description: "Невесомые жидкие румяна с насыщенным цветом: одной небольшой точки достаточно для естественного свежего оттенка.",
    facts: [["Объём", "7,5 мл"], ["Оттенок", "Virtue — бежево-персиковый"], ["Финиш", "Сияющий"], ["Применение", "Нанести одну точку и растушевать пальцами или кистью"]]
  },
  fenty: {
    brand: "Fenty Beauty • Хайлайтер",
    name: "Killawatt Freestyle Highlighter",
    image: "assets/fenty-killawatt-highlighter.jpg",
    alt: "Хайлайтер Fenty Beauty Killawatt",
    price: 40,
    currency: "USD",
    priceLabel: "$40",
    description: "Стойкий кремово-пудровый хайлайтер с мелким сиянием для скул, глаз и ключиц.",
    facts: [["Вес", "8 г"], ["Оттенок", "Wattabrat — сияющий розовый"], ["Финиш", "Яркое сияние"], ["Применение", "Наносить на выступающие части лица кистью или пальцами"]]
  },
  urban: {
    brand: "Urban Decay • Тени",
    name: "Naked3 Eyeshadow Palette",
    image: "assets/urban-decay-naked3.jpg",
    alt: "Палетка теней Urban Decay Naked3",
    price: 59,
    currency: "USD",
    priceLabel: "$59",
    description: "Палетка из розово-нейтральных оттенков для спокойного дневного или выразительного вечернего макияжа.",
    facts: [["Состав", "12 оттенков и двусторонняя кисть"], ["Цвета", "Розовые, бежевые, медные и сливовые"], ["Финиши", "Матовые и сияющие"], ["Применение", "Сочетать светлые базовые и более глубокие акцентные оттенки"]]
  },
  charlotte: {
    brand: "Charlotte Tilbury • Помада",
    name: "Matte Revolution Lipstick",
    image: "assets/charlotte-tilbury-pillow-talk.jpg",
    alt: "Помада Charlotte Tilbury Matte Revolution",
    price: 37,
    currency: "USD",
    priceLabel: "$37",
    description: "Стойкая матовая помада с комфортной текстурой и возможностью наслаивать цвет от лёгкого до насыщенного.",
    facts: [["Вес", "0,12 oz"], ["Оттенок", "Pillow Talk Medium — тёплый ягодно-розовый"], ["Финиш", "Матовый"], ["Применение", "Наносить прямо из стика или кистью для более точного контура"]]
  }
};

const storageKey = "auraBeautyCart";
const orderStorageKey = "auraBeautyLastOrder";
let cart = loadCart();
let activeProductId = null;

const cartButton = document.querySelector("#cart-button");
const cartCount = document.querySelector("#cart-count");
const cartDialog = document.querySelector("#cart-dialog");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartCheckout = document.querySelector("#cart-checkout");
const cartTotals = document.querySelector("#cart-totals");
const checkoutForm = document.querySelector("#checkout-form");
const formError = document.querySelector("#form-error");
const orderSuccess = document.querySelector("#order-success");
const orderSuccessText = document.querySelector("#order-success-text");
const productDialog = document.querySelector("#product-dialog");

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    return saved && typeof saved === "object" ? saved : {};
  } catch {
    return {};
  }
}

function saveCart() {
  localStorage.setItem(storageKey, JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  cartCount.textContent = count;
  cartCount.setAttribute("aria-label", `${count} товаров в корзине`);
}

function addToCart(productId) {
  cart[productId] = (cart[productId] || 0) + 1;
  saveCart();
  renderCart();
}

function changeQuantity(productId, change) {
  const next = (cart[productId] || 0) + change;
  if (next <= 0) delete cart[productId];
  else cart[productId] = next;
  saveCart();
  renderCart();
}

function getCartEntries() {
  return Object.entries(cart).filter(([id, quantity]) => products[id] && quantity > 0);
}

function renderCart() {
  const entries = getCartEntries();
  cartItems.replaceChildren();
  cartEmpty.hidden = entries.length > 0;
  cartCheckout.hidden = entries.length === 0;

  entries.forEach(([id, quantity]) => {
    const product = products[id];
    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${product.image}" alt="">
      <div class="cart-item-copy"><strong>${product.name}</strong><small>${product.brand}</small><span>${product.priceLabel}</span></div>
      <div class="quantity-control" aria-label="Количество ${product.name}">
        <button type="button" data-cart-action="decrease" data-product-id="${id}" aria-label="Уменьшить количество">−</button>
        <span>${quantity}</span>
        <button type="button" data-cart-action="increase" data-product-id="${id}" aria-label="Увеличить количество">+</button>
      </div>`;
    cartItems.append(row);
  });

  const totals = entries.reduce((result, [id, quantity]) => {
    const product = products[id];
    result[product.currency] = (result[product.currency] || 0) + product.price * quantity;
    return result;
  }, {});

  cartTotals.replaceChildren();
  if (totals.USD) cartTotals.append(createTotal("Товары в долларах", `$${totals.USD}`));
  if (totals.AMD) cartTotals.append(createTotal("Товары в драмах", `${new Intl.NumberFormat("ru-RU").format(totals.AMD)} ֏`));
}

function createTotal(label, value) {
  const row = document.createElement("div");
  row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  return row;
}

function openProduct(productId) {
  const product = products[productId];
  if (!product) return;
  activeProductId = productId;
  const image = document.querySelector("#dialog-product-image");
  image.src = product.image;
  image.alt = product.alt;
  document.querySelector("#dialog-product-brand").textContent = product.brand;
  document.querySelector("#product-dialog-title").textContent = product.name;
  document.querySelector("#dialog-product-description").textContent = product.description;
  document.querySelector("#dialog-product-price").textContent = product.priceLabel;
  const facts = document.querySelector("#dialog-product-facts");
  facts.replaceChildren();
  product.facts.forEach(([term, description]) => {
    const wrapper = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = term;
    dd.textContent = description;
    wrapper.append(dt, dd);
    facts.append(wrapper);
  });
  productDialog.showModal();
}

function openCart() {
  orderSuccess.hidden = true;
  cartItems.hidden = false;
  renderCart();
  cartDialog.showModal();
}

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]");
    if (action?.dataset.action === "add") {
      event.stopPropagation();
      addToCart(card.dataset.productId);
      const original = action.textContent;
      action.textContent = "Добавлено ✓";
      window.setTimeout(() => { action.textContent = original; }, 900);
      return;
    }
    if (event.target.closest("a")) return;
    openProduct(card.dataset.productId);
  });
  card.addEventListener("keydown", (event) => {
    if (event.target !== card || !["Enter", " "].includes(event.key)) return;
    event.preventDefault();
    openProduct(card.dataset.productId);
  });
});

document.querySelector("#dialog-add-button").addEventListener("click", () => {
  if (!activeProductId) return;
  addToCart(activeProductId);
  productDialog.close();
  openCart();
});

cartButton.addEventListener("click", openCart);

document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => productDialog.close()));
document.querySelectorAll("[data-close-cart]").forEach((button) => button.addEventListener("click", () => cartDialog.close()));

cartItems.addEventListener("click", (event) => {
  const control = event.target.closest("[data-cart-action]");
  if (!control) return;
  changeQuantity(control.dataset.productId, control.dataset.cartAction === "increase" ? 1 : -1);
});

[productDialog, cartDialog].forEach((dialog) => dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
}));

checkoutForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.textContent = "";
  const name = document.querySelector("#customer-name").value.trim();
  const emailInput = document.querySelector("#customer-email");
  const phone = document.querySelector("#customer-phone").value.trim();
  const email = emailInput.value.trim();

  if (!name) {
    formError.textContent = "Укажите имя.";
    document.querySelector("#customer-name").focus();
    return;
  }
  if (!email && !phone) {
    formError.textContent = "Укажите email или номер телефона.";
    emailInput.focus();
    return;
  }
  if (email && !emailInput.validity.valid) {
    formError.textContent = "Проверьте адрес электронной почты.";
    emailInput.focus();
    return;
  }

  const entries = getCartEntries();
  const orderId = `AB-${Date.now().toString().slice(-8)}`;
  const order = {
    id: orderId,
    createdAt: new Date().toISOString(),
    customer: {name, email, phone, comment: document.querySelector("#customer-comment").value.trim()},
    items: entries.map(([id, quantity]) => ({id, name: products[id].name, quantity, price: products[id].priceLabel}))
  };

  localStorage.setItem(orderStorageKey, JSON.stringify(order));
  cart = {};
  saveCart();
  checkoutForm.reset();
  cartItems.hidden = true;
  cartCheckout.hidden = true;
  cartEmpty.hidden = true;
  orderSuccess.hidden = false;
  const contact = email || phone;
  orderSuccessText.textContent = `Номер ${orderId}. Контакт для подтверждения: ${contact}. Заказ сохранён на этом устройстве; автоматическая отправка будет подключена следующим этапом.`;
});

updateCartCount();
renderCart();
