const products = {
  ordinary: {
    brand: "The Ordinary",
    name: "Niacinamide 10% + Zinc 1%",
    image: "assets/the-ordinary-niacinamide.webp",
    alt: "Сыворотка The Ordinary Niacinamide 10% + Zinc 1%",
    price: 2200,
    priceLabel: "2 200 ֏",
    source: "https://theordinary.com/en-us/niacinamide-10-zinc-1-serum-100436.html",
    description: "Лёгкая водная сыворотка для кожи с расширенными порами, неровной текстурой и избыточной жирностью.",
    facts: [["Объём", "30 мл"], ["Активы", "Ниацинамид 10%, цинк 1%"], ["Подходит", "Для всех типов кожи"], ["Применение", "Несколько капель утром и вечером перед кремом"]]
  },
  lucin: {
    brand: "Lucin Organics",
    name: "Vitamin C Serum",
    image: "assets/user-brand-skincare.jpeg",
    alt: "Сыворотка Lucin Organics Vitamin C",
    price: 36000,
    priceLabel: "36 000 ֏",
    source: "https://am.lucinorganics.com/products/c",
    description: "Армянская органическая сыворотка для сияния кожи и более ровного тона с растительными маслами и стабилизированным витамином C.",
    facts: [["Объём", "30 мл"], ["Актив", "15% стабилизированный витамин C"], ["Эффект", "Сияние, восстановление и более ровный тон"], ["Применение", "Наносить перед кремом утром или вечером"]]
  },
  laneige: {
    brand: "LANEIGE • K-Beauty",
    name: "Water Sleeping Mask",
    image: "assets/laneige-water-sleeping-mask.jpg",
    alt: "Ночная маска LANEIGE Water Sleeping Mask",
    price: 12000,
    priceLabel: "12 000 ֏",
    source: "https://us.laneige.com/products/water-sleeping-mask",
    description: "Корейская ночная гель-маска, которая интенсивно увлажняет кожу и поддерживает защитный барьер во время сна.",
    facts: [["Объём", "70 мл"], ["Активы", "Ниацинамид, сквалан и гиалуроновая кислота"], ["Подходит", "Для нормальной, сухой, комбинированной и жирной кожи"], ["Применение", "Наносить вечером завершающим этапом ухода"]]
  },
  cosrx: {
    brand: "COSRX • K-Beauty",
    name: "Advanced Snail 96 Mucin Essence",
    image: "assets/cosrx-snail-96.jpg",
    alt: "Эссенция COSRX Advanced Snail 96 Mucin Power Essence",
    price: null,
    priceLabel: "Цена уточняется",
    source: "https://www.cosrx.com/collections/snail-mucin/products/advanced-snail-96-mucin-power-essence",
    description: "Лёгкая корейская эссенция для глубокого увлажнения, более ровной текстуры и поддержки защитного барьера кожи.",
    facts: [["Объём", "100 мл"], ["Актив", "96,3% фильтрата секреции улитки"], ["Дополнительно", "Аллантоин, пантенол и гиалуронат натрия"], ["Применение", "После очищения и тоника, перед увлажняющим кремом"]]
  },
  rare: {
    brand: "Rare Beauty • Румяна",
    name: "Soft Pinch Liquid Blush",
    image: "assets/rare-beauty-soft-pinch-blush.jpg",
    alt: "Жидкие румяна Rare Beauty Soft Pinch",
    price: 9100,
    priceLabel: "9 100 ֏",
    source: "https://www.rarebeauty.com/products/soft-pinch-liquid-blush",
    description: "Невесомые жидкие румяна с насыщенным цветом: одной небольшой точки достаточно для естественного свежего оттенка.",
    facts: [["Объём", "7,5 мл"], ["Финиш", "Матовый или сияющий — зависит от оттенка"], ["Стойкость", "До 12 часов"], ["Применение", "Нанести одну точку и растушевать пальцами или кистью"]],
    variants: [
      {name: "Hope", note: "пыльно-лиловый, сияющий", color: "#A96773"},
      {name: "Bliss", note: "нюдово-розовый, матовый", color: "#D99594"},
      {name: "Happy", note: "холодный розовый, сияющий", color: "#E86186"},
      {name: "Virtue", note: "бежево-персиковый, сияющий", color: "#C98268"},
      {name: "Joy", note: "приглушённый персиковый, сияющий", color: "#E47B58"},
      {name: "Faith", note: "глубокий ягодный, матовый", color: "#6F2944"}
    ]
  },
  fenty: {
    brand: "Fenty Beauty • Хайлайтер",
    name: "Killawatt Freestyle Highlighter",
    image: "assets/fenty-killawatt-highlighter.jpg",
    alt: "Хайлайтер Fenty Beauty Killawatt",
    price: 14500,
    priceLabel: "14 500 ֏",
    source: "https://fentybeauty.com/products/killawatt-freestyle-highlighter-wattabrat",
    description: "Стойкий кремово-пудровый хайлайтер с мелким сиянием для скул, глаз и ключиц.",
    facts: [["Вес", "7,5 г для одиночного оттенка"], ["Финиш", "От мягкого до яркого сияния"], ["Формула", "Кремово-пудровая"], ["Применение", "Наносить на выступающие части лица кистью или пальцами"]],
    variants: [
      {name: "Wattabrat", note: "сияющий розовый", color: "#DCA5BB"},
      {name: "Trophy Wife", note: "яркое золото", color: "#D6AA38"},
      {name: "Ruby Richez", note: "рубиново-медный", color: "#9E423D"},
      {name: "Lightning Dust / Fire Crystal", note: "шампань и ледяное сияние", color: "linear-gradient(135deg,#D8C7A8 0 50%,#F5E9D8 50%)"},
      {name: "Girl Next Door / Chic Phreak", note: "нежно-розовый дуэт", color: "linear-gradient(135deg,#E9C7CB 0 50%,#D9889C 50%)"}
    ]
  },
  urban: {
    brand: "Urban Decay • Тени",
    name: "Naked3 Eyeshadow Palette",
    image: "assets/urban-decay-naked3.jpg",
    alt: "Палетка теней Urban Decay Naked3",
    price: 21400,
    priceLabel: "21 400 ֏",
    source: "https://www.urbandecay.com/naked-3-palette-by-urban-decay/409.html",
    description: "Палетка из розово-нейтральных оттенков для спокойного дневного или выразительного вечернего макияжа.",
    facts: [["Состав", "12 оттенков и двусторонняя кисть"], ["Цвета", "Розовые, бежевые, медные и сливовые"], ["Финиши", "Матовые и сияющие"], ["Применение", "Сочетать светлые базовые и более глубокие акцентные оттенки"]],
    displayShades: [
      {name: "Strange", color: "#E5D8CF"}, {name: "Dust", color: "#D8A5AC"},
      {name: "Burnout", color: "#C78D86"}, {name: "Limit", color: "#A87878"},
      {name: "Buzz", color: "#A65D70"}, {name: "Trick", color: "#B66C45"},
      {name: "Nooner", color: "#765257"}, {name: "Liar", color: "#8A625C"},
      {name: "Factory", color: "#76534B"}, {name: "Mugshot", color: "#72524D"},
      {name: "Darkside", color: "#55464E"}, {name: "Blackheart", color: "#2E252C"}
    ]
  },
  charlotte: {
    brand: "Charlotte Tilbury • Помада",
    name: "Matte Revolution Lipstick",
    image: "assets/charlotte-tilbury-pillow-talk.jpg",
    alt: "Помада Charlotte Tilbury Matte Revolution",
    price: 13400,
    priceLabel: "13 400 ֏",
    source: "https://www.charlottetilbury.com/us/product/matte-revolution-lipstick-pillowtalk",
    description: "Стойкая матовая помада с комфортной текстурой и возможностью наслаивать цвет от лёгкого до насыщенного.",
    facts: [["Вес", "3,5 г"], ["Финиш", "Современный матовый"], ["Формула", "С экстрактами орхидеи и Lipstick Tree"], ["Применение", "Наносить прямо из стика или кистью для более точного контура"]],
    variants: [
      {name: "Pillow Talk Original", note: "нюдово-розовый", color: "#B86F70"},
      {name: "Pillow Talk Medium", note: "тёплый ягодно-розовый", color: "#924D57"},
      {name: "Sexy Sienna", note: "золотисто-коралловый", color: "#C96554"},
      {name: "Lost Cherry", note: "пастельный ягодно-красный", color: "#B83F50"},
      {name: "Walk of No Shame", note: "ягодно-розовый", color: "#873D48"},
      {name: "Red Carpet Red", note: "классический красный", color: "#9E202B"}
    ]
  },
  clinique: {
    brand: "Clinique • Губы",
    name: "Almost Lipstick",
    image: "assets/clinique-black-honey.jpg",
    alt: "Свотчи Clinique Almost Lipstick Black Honey, Pink Honey и Nude Honey",
    price: null,
    priceLabel: "Цена уточняется",
    source: "https://www.clinique.com/products/almost-lipstick-in-black-honey-pink-honey-and-nude-honey",
    description: "Лёгкая полупрозрачная формула между помадой и блеском, которая наслаивается и по-разному раскрывается на естественном цвете губ.",
    facts: [["Вес", "1,9 г"], ["Финиш", "Полупрозрачный, с мягким блеском"], ["Эффект", "От лёгкого оттенка до более насыщенного при наслаивании"], ["Применение", "Нанести один слой или добавить ещё для большей глубины цвета"]],
    variants: [
      {name: "Pink Honey", note: "мягкий прозрачный розовый", color: "#D98F96"},
      {name: "Nude Honey", note: "тёплый прозрачный нюд", color: "#B96855"},
      {name: "Black Honey", note: "прозрачный ягодно-коричневый", color: "#71383E"}
    ]
  },
  nars: {
    brand: "NARS • Консилер",
    name: "Radiant Creamy Concealer",
    image: "assets/nars-radiant-concealer.jpg",
    alt: "Консилер NARS Radiant Creamy Concealer",
    price: null,
    priceLabel: "Цена уточняется",
    source: "https://www.narscosmetics.com/USA/radiant-creamy-concealer/999NACRCC0001.html",
    description: "Кремово-жидкий консилер с сияющим финишем и наслаиваемым покрытием для зоны под глазами и точечной коррекции.",
    facts: [["Объём", "6 мл"], ["Покрытие", "Среднее, наслаиваемое"], ["Финиш", "Сияющий"], ["Стойкость", "До 16 часов по данным бренда"]],
    variants: [
      {name: "Chantilly", note: "очень светлый, нейтральный", color: "#F4D6BC"},
      {name: "Vanilla", note: "светлый, холодно-розовый", color: "#EBC4AD"},
      {name: "Custard", note: "светло-средний, нейтральный", color: "#D9A77D"},
      {name: "Ginger", note: "средний, золотистый", color: "#BF8055"},
      {name: "Caramel", note: "средне-тёмный, тёплый", color: "#9A5C3D"},
      {name: "Amande", note: "тёмный, золотисто-оливковый", color: "#70412E"}
    ]
  }
};

const storageKey = "auraBeautyCart";
const orderStorageKey = "auraBeautyLastOrder";
let cart = loadCart();
let activeProductId = null;
let activeVariant = null;

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
const shadeArea = document.querySelector("#dialog-shade-area");
const shadeTitle = document.querySelector("#shade-title");
const shadeOptions = document.querySelector("#shade-options");
const selectedShade = document.querySelector("#selected-shade");
const productSource = document.querySelector("#dialog-product-source");
const dialogAddButton = document.querySelector("#dialog-add-button");

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

function makeCartKey(productId, variant) {
  return variant ? `${productId}::${variant}` : productId;
}

function splitCartKey(key) {
  const separator = key.indexOf("::");
  return separator === -1 ? {productId: key, variant: null} : {productId: key.slice(0, separator), variant: key.slice(separator + 2)};
}

function addToCart(productId, variant = null) {
  const key = makeCartKey(productId, variant);
  cart[key] = (cart[key] || 0) + 1;
  saveCart();
  renderCart();
}

function changeQuantity(key, change) {
  const next = (cart[key] || 0) + change;
  if (next <= 0) delete cart[key];
  else cart[key] = next;
  saveCart();
  renderCart();
}

function getCartEntries() {
  return Object.entries(cart)
    .map(([key, quantity]) => ({key, quantity, ...splitCartKey(key)}))
    .filter(({productId, quantity}) => products[productId] && quantity > 0);
}

function renderCart() {
  const entries = getCartEntries();
  cartItems.replaceChildren();
  cartEmpty.hidden = entries.length > 0;
  cartCheckout.hidden = entries.length === 0;

  entries.forEach(({key, productId, variant, quantity}) => {
    const product = products[productId];
    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${product.image}" alt="">
      <div class="cart-item-copy"><strong>${product.name}</strong><small>${product.brand}${variant ? `<br>Оттенок: ${variant}` : ""}</small><span>${product.priceLabel}</span></div>
      <div class="quantity-control" aria-label="Количество ${product.name}${variant ? `, оттенок ${variant}` : ""}">
        <button type="button" data-cart-action="decrease" data-cart-key="${key}" aria-label="Уменьшить количество">−</button>
        <span>${quantity}</span>
        <button type="button" data-cart-action="increase" data-cart-key="${key}" aria-label="Увеличить количество">+</button>
      </div>`;
    cartItems.append(row);
  });

  const total = entries.reduce((sum, {productId, quantity}) => sum + products[productId].price * quantity, 0);

  cartTotals.replaceChildren();
  if (total) cartTotals.append(createTotal("Итого", `${new Intl.NumberFormat("ru-RU").format(total)} ֏`));
}

function createTotal(label, value) {
  const row = document.createElement("div");
  row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  return row;
}

function renderShadeOptions(product) {
  const selectable = product.variants || [];
  const displayOnly = product.displayShades || [];
  const shades = selectable.length ? selectable : displayOnly;
  shadeOptions.replaceChildren();
  shadeArea.hidden = shades.length === 0;
  if (!shades.length) return;

  shadeTitle.textContent = selectable.length ? "Выберите оттенок" : "Цвета палетки";
  shadeOptions.setAttribute("role", selectable.length ? "radiogroup" : "list");
  activeVariant = selectable.length ? selectable[0].name : null;
  selectedShade.textContent = selectable.length ? `${selectable[0].name} — ${selectable[0].note}` : "12 настоящих оттенков";

  shades.forEach((shade, index) => {
    const item = document.createElement(selectable.length ? "button" : "div");
    item.className = `shade-option${selectable.length && index === 0 ? " selected" : ""}`;
    item.style.setProperty("--swatch", shade.color);
    item.title = shade.note ? `${shade.name} — ${shade.note}` : shade.name;
    item.setAttribute("aria-label", shade.note ? `${shade.name}, ${shade.note}` : shade.name);
    item.innerHTML = `<span class="shade-color" aria-hidden="true"></span><span>${shade.name}</span>`;
    if (selectable.length) {
      item.type = "button";
      item.setAttribute("role", "radio");
      item.setAttribute("aria-checked", index === 0 ? "true" : "false");
      item.addEventListener("click", () => {
        activeVariant = shade.name;
        selectedShade.textContent = `${shade.name} — ${shade.note}`;
        shadeOptions.querySelectorAll(".shade-option").forEach((option) => {
          const isSelected = option === item;
          option.classList.toggle("selected", isSelected);
          option.setAttribute("aria-checked", String(isSelected));
        });
      });
    } else {
      item.setAttribute("role", "listitem");
    }
    shadeOptions.append(item);
  });
}

function openProduct(productId) {
  const product = products[productId];
  if (!product) return;
  activeProductId = productId;
  activeVariant = null;
  const image = document.querySelector("#dialog-product-image");
  image.src = product.image;
  image.alt = product.alt;
  document.querySelector("#dialog-product-brand").textContent = product.brand;
  document.querySelector("#product-dialog-title").textContent = product.name;
  document.querySelector("#dialog-product-description").textContent = product.description;
  document.querySelector("#dialog-product-price").textContent = product.priceLabel;
  dialogAddButton.disabled = !Number.isFinite(product.price);
  dialogAddButton.textContent = Number.isFinite(product.price) ? "Добавить в корзину" : "Сначала уточним цену";
  productSource.href = product.source;
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
  renderShadeOptions(product);
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
      addToCart(card.dataset.productId, null);
      const original = action.textContent;
      action.textContent = "Добавлено ✓";
      window.setTimeout(() => { action.textContent = original; }, 900);
      return;
    }
    if (action?.dataset.action === "choose") {
      event.stopPropagation();
      openProduct(card.dataset.productId);
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

dialogAddButton.addEventListener("click", () => {
  if (!activeProductId || !Number.isFinite(products[activeProductId].price)) return;
  addToCart(activeProductId, activeVariant);
  productDialog.close();
  openCart();
});

cartButton.addEventListener("click", openCart);

document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => productDialog.close()));
document.querySelectorAll("[data-close-cart]").forEach((button) => button.addEventListener("click", () => cartDialog.close()));

cartItems.addEventListener("click", (event) => {
  const control = event.target.closest("[data-cart-action]");
  if (!control) return;
  changeQuantity(control.dataset.cartKey, control.dataset.cartAction === "increase" ? 1 : -1);
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
    items: entries.map(({productId, variant, quantity}) => ({id: productId, name: products[productId].name, variant, quantity, price: products[productId].priceLabel}))
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
