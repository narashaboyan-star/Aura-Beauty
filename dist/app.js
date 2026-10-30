const products = {
  ordinary: {
    brand: "The Ordinary",
    name: "Niacinamide 10% + Zinc 1%",
    image: "assets/the-ordinary-niacinamide.webp",
    alt: "Сыворотка The Ordinary Niacinamide 10% + Zinc 1%",
    price: 6,
    priceLabel: "$6.00",
    source: "https://theordinary.com/en-us/category/skincare/serums",
    description: "Лёгкая водная сыворотка для кожи с расширенными порами, неровной текстурой и избыточной жирностью.",
    facts: [["Объём", "30 мл"], ["Активы", "Ниацинамид 10%, цинк 1%"], ["Подходит", "Для всех типов кожи"], ["Применение", "Несколько капель утром и вечером перед кремом"]]
  },
  lucin: {
    brand: "Lucin Organics",
    name: "Vitamin C Serum",
    image: "assets/user-brand-skincare.jpeg",
    alt: "Сыворотка Lucin Organics Vitamin C",
    price: 90,
    priceLabel: "$90.00",
    source: "https://lucinorganics.com/products/vitamin-c-serum-repair-and-brighten",
    description: "Армянская органическая сыворотка для сияния кожи и более ровного тона с растительными маслами и стабилизированным витамином C.",
    facts: [["Объём", "30 мл"], ["Актив", "15% стабилизированный витамин C"], ["Эффект", "Сияние, восстановление и более ровный тон"], ["Применение", "Наносить перед кремом утром или вечером"]]
  },
  laneige: {
    brand: "LANEIGE • K-Beauty",
    name: "Water Sleeping Mask",
    image: "assets/laneige-water-sleeping-mask.jpg",
    alt: "Ночная маска LANEIGE Water Sleeping Mask",
    price: 33,
    priceLabel: "$33.00",
    source: "https://us.laneige.com/products/water-sleeping-mask",
    description: "Корейская ночная гель-маска, которая интенсивно увлажняет кожу и поддерживает защитный барьер во время сна.",
    facts: [["Объём", "70 мл"], ["Активы", "Ниацинамид, сквалан и гиалуроновая кислота"], ["Подходит", "Для нормальной, сухой, комбинированной и жирной кожи"], ["Применение", "Наносить вечером завершающим этапом ухода"]]
  },
  cosrx: {
    brand: "COSRX • K-Beauty",
    name: "Advanced Snail 96 Mucin Essence",
    image: "assets/cosrx-snail-96.jpg",
    alt: "Эссенция COSRX Advanced Snail 96 Mucin Power Essence",
    price: 25,
    priceLabel: "$25.00",
    source: "https://www.cosrx.com/collections/snail-mucin/products/advanced-snail-96-mucin-power-essence",
    description: "Лёгкая корейская эссенция для глубокого увлажнения, более ровной текстуры и поддержки защитного барьера кожи.",
    facts: [["Объём", "100 мл"], ["Актив", "96,3% фильтрата секреции улитки"], ["Дополнительно", "Аллантоин, пантенол и гиалуронат натрия"], ["Применение", "После очищения и тоника, перед увлажняющим кремом"]]
  },
  rare: {
    brand: "Rare Beauty • Румяна",
    name: "Soft Pinch Liquid Blush",
    image: "assets/rare-beauty-soft-pinch-blush.jpg",
    alt: "Жидкие румяна Rare Beauty Soft Pinch",
    price: 25,
    priceLabel: "$25.00",
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
    price: 40,
    priceLabel: "$40.00",
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
    price: 59,
    priceLabel: "$59.00",
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
    price: 37,
    priceLabel: "$37.00",
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
    image: "assets/clinique-almost-lipstick.png",
    alt: "Помада Clinique Almost Lipstick в оттенке Black Honey",
    price: 25,
    priceLabel: "$25.00",
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
    price: 36,
    priceLabel: "$36.00",
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
  },
  k18: {
    brand: "K18 • Уход за волосами",
    name: "Leave-In Molecular Repair Hair Mask",
    image: "assets/k18-leave-in-mask.webp",
    alt: "Несмываемая маска K18 Leave-In Molecular Repair Hair Mask",
    price: 75,
    priceLabel: "$75.00",
    source: "https://www.k18hair.com/collections/treatment-routine/products/leave-in-molecular-repair-hair-mask-50-ml",
    description: "Несмываемая четырёхминутная маска для повреждённых волос, созданная для восстановления силы, мягкости и эластичности.",
    facts: [["Объём", "50 мл"], ["Подходит", "Для повреждённых и ломких волос"], ["Время", "4 минуты, не смывать"], ["Применение", "После шампуня без кондиционера; 1–3 нажатия на подсушенные полотенцем волосы"]]
  },
  kerastase: {
    brand: "Kérastase • Уход за волосами",
    name: "Résistance Masque Force Architecte",
    image: "assets/kerastase-masque-force-architecte.webp",
    alt: "Маска Kérastase Résistance Masque Force Architecte",
    price: 67,
    priceLabel: "$67.00",
    source: "https://www.kerastase-usa.com/collections/resistance/masque-force-architecte-hair-mask.html",
    description: "Восстанавливающая маска для повреждённых и чрезмерно обработанных волос, помогающая уменьшить ломкость и появление секущихся концов.",
    facts: [["Объём", "200 мл"], ["Подходит", "Для повреждённых и ослабленных волос"], ["Ключевые компоненты", "Про-кератиновый комплекс и керамиды"], ["Применение", "На влажную длину и концы на 5–10 минут, затем смыть"]]
  },
  olaplex: {
    brand: "OLAPLEX • Уход за волосами",
    name: "N°.3PLUS Complete Repair Treatment",
    image: "assets/olaplex-n3plus.webp",
    alt: "Восстанавливающий уход OLAPLEX N°.3PLUS Complete Repair Treatment",
    price: 34,
    priceLabel: "$34.00",
    source: "https://olaplex.com/collections/the-holiday-shop/products/olaplex-n-3plus-complete-repair-treatment-100ml",
    description: "Трёхминутный уход перед шампунем для более мягких и крепких волос и уменьшения будущей ломкости.",
    facts: [["Объём", "100 мл"], ["Подходит", "Для всех типов волос"], ["Формула", "Без протеинов и SLS/SLES"], ["Применение", "Нанести на влажные волосы до шампуня на 3 минуты, смыть"]]
  },
  beautyblender: {
    brand: "Beautyblender • Спонж",
    name: "Original Makeup Sponge",
    image: "assets/beautyblender-original.png",
    alt: "Розовый спонж Beautyblender Original в упаковке",
    price: 20,
    priceLabel: "$20.00",
    source: "https://beautyblender.com/products/beautyblender-original",
    description: "Мягкий многоразовый спонж без латекса для равномерной растушёвки тонального средства, консилера и кремовых продуктов.",
    facts: [["Материал", "Мягкая пена без латекса"], ["Подходит", "Для жидких, кремовых и пудровых текстур"], ["Применение", "Намочить, хорошо отжать и наносить продукт похлопывающими движениями"], ["Уход", "Очищать после использования и сушить на воздухе"]]
  },
  rareBrush: {
    brand: "Rare Beauty • Кисть",
    name: "Soft Pinch Blush Brush",
    image: "assets/rare-beauty-blush-brush.jpg",
    alt: "Кисть Rare Beauty Soft Pinch Blush Brush",
    price: 26,
    priceLabel: "$26.00",
    source: "https://www.rarebeauty.com/collections/soft-pinch-collection-1/products/soft-pinch-blush-brush",
    description: "Мягкая скошенная кисть, которая помогает аккуратно растушевать пигментированные жидкие и кремовые румяна.",
    facts: [["Ворс", "Синтетический, разной длины"], ["Форма", "Скошенная, повторяет контуры щёк"], ["Подходит", "Для жидких и кремовых формул"], ["Применение", "Растушёвывать лёгкими вбивающими и круговыми движениями"]]
  }
};

const productLocales = {
  ordinary: {
    ru: {brand: "The Ordinary", note: "Сыворотка для контроля жирности, 30 мл", description: "Лёгкая водная сыворотка для кожи с расширенными порами, неровной текстурой и избыточной жирностью.", facts: [["Объём", "30 мл"], ["Активы", "Ниацинамид 10%, цинк 1%"], ["Подходит", "Для всех типов кожи"], ["Применение", "Несколько капель утром и вечером перед кремом"]], ingredients: "Ключевые ингредиенты: ниацинамид 10%, Zinc PCA, пентиленгликоль и камедь тамаринда. Формула без отдушки и масел."},
    en: {brand: "The Ordinary", note: "Oil-control serum, 30 ml", description: "A lightweight water-based serum for visible pores, uneven texture and excess oil.", facts: [["Size", "30 ml"], ["Actives", "10% niacinamide, 1% zinc"], ["Suitable for", "All skin types"], ["How to use", "Apply a few drops morning and evening before moisturizer"]], ingredients: "Key ingredients: 10% niacinamide, Zinc PCA, pentylene glycol and tamarind gum. Fragrance-free and oil-free."}
  },
  lucin: {
    ru: {brand: "Lucin Organics", note: "Сыворотка с 15% стабилизированным витамином C, 30 мл", description: "Армянская органическая сыворотка для сияния кожи и более ровного тона с растительными маслами и стабилизированным витамином C.", facts: [["Объём", "30 мл"], ["Актив", "15% стабилизированный витамин C"], ["Эффект", "Сияние, восстановление и более ровный тон"], ["Применение", "Наносить перед кремом утром или вечером"]], ingredients: "Ключевые ингредиенты: 15% стабилизированный витамин C, масла жожоба, шиповника, сквалана и какай, витамин E, экстракты томата, ягод годжи, какаду-сливы и ацеролы. Есть эфирные масла грейпфрута и лайма — чувствительной коже нужен патч-тест."},
    en: {brand: "Lucin Organics", note: "Serum with 15% stabilized vitamin C, 30 ml", description: "An Armenian organic brightening serum with botanical oils and stabilized vitamin C for a more even-looking tone.", facts: [["Size", "30 ml"], ["Active", "15% stabilized vitamin C"], ["Benefits", "Radiance, repair and a more even-looking tone"], ["How to use", "Apply before moisturizer, morning or evening"]], ingredients: "Key ingredients: 15% stabilized vitamin C, jojoba, rosehip, squalane and cacay oils, vitamin E, plus tomato, goji berry, Kakadu plum and acerola extracts. Contains grapefruit and lime essential oils; patch-test sensitive skin."}
  },
  laneige: {
    ru: {brand: "LANEIGE • K-Beauty", note: "Увлажняющая ночная маска, 70 мл", description: "Корейская ночная гель-маска, которая интенсивно увлажняет кожу и поддерживает защитный барьер во время сна.", facts: [["Объём", "70 мл"], ["Активы", "Сквалан, бета-глюкан и увлажняющий комплекс"], ["Подходит", "Для нормальной, сухой, комбинированной и жирной кожи"], ["Применение", "Наносить вечером завершающим этапом ухода"]], ingredients: "Ключевые компоненты: сквалан, глицерин, бета-глюкан и комплекс на основе пробиотиков. Формула может содержать отдушку — проверьте актуальный INCI при чувствительной коже."},
    en: {brand: "LANEIGE • K-Beauty", note: "Hydrating overnight mask, 70 ml", description: "A Korean overnight gel mask that deeply hydrates and supports the skin barrier while you sleep.", facts: [["Size", "70 ml"], ["Key ingredients", "Squalane, beta-glucan and a moisturizing complex"], ["Suitable for", "Normal, dry, combination and oily skin"], ["How to use", "Apply as the last step of your evening routine"]], ingredients: "Key ingredients include squalane, glycerin, beta-glucan and a probiotic-derived complex. The formula may contain fragrance; check the current INCI if your skin is sensitive."}
  },
  cosrx: {
    ru: {brand: "COSRX • K-Beauty", note: "Эссенция с 96,3% муцина улитки, 100 мл", description: "Лёгкая корейская эссенция для глубокого увлажнения, более ровной текстуры и поддержки защитного барьера кожи.", facts: [["Объём", "100 мл"], ["Актив", "96,3% фильтрата секреции улитки"], ["Дополнительно", "Аллантоин, пантенол и гиалуронат натрия"], ["Применение", "После очищения и тоника, перед увлажняющим кремом"]], ingredients: "Основные ингредиенты: фильтрат секреции улитки 96,3%, бетаин, бутиленгликоль, гиалуронат натрия, пантенол, аллантоин и аргинин."},
    en: {brand: "COSRX • K-Beauty", note: "Essence with 96.3% snail secretion filtrate, 100 ml", description: "A lightweight Korean essence for deep hydration, smoother-looking texture and skin-barrier support.", facts: [["Size", "100 ml"], ["Active", "96.3% snail secretion filtrate"], ["Also contains", "Allantoin, panthenol and sodium hyaluronate"], ["How to use", "After cleansing and toner, before moisturizer"]], ingredients: "Key ingredients: 96.3% snail secretion filtrate, betaine, butylene glycol, sodium hyaluronate, panthenol, allantoin and arginine."}
  },
  rare: {
    ru: {brand: "Rare Beauty • Румяна", note: "Жидкие румяна, 7,5 мл — выберите оттенок", description: "Невесомые жидкие румяна с насыщенным цветом: одной небольшой точки достаточно для естественного свежего оттенка.", facts: [["Объём", "7,5 мл"], ["Финиш", "Матовый или сияющий — зависит от оттенка"], ["Стойкость", "До 12 часов"], ["Применение", "Нанести одну точку и растушевать пальцами или кистью"]], ingredients: "Формула зависит от оттенка. В основе — лёгкие эмоленты, силиконы и пигменты; также заявлены экстракты белой кувшинки, гардении и лотоса. Цветовые пигменты различаются."},
    en: {brand: "Rare Beauty • Blush", note: "Liquid blush, 7.5 ml — choose a shade", description: "A weightless, highly pigmented liquid blush; one small dot gives a natural-looking flush.", facts: [["Size", "7.5 ml"], ["Finish", "Matte or radiant, depending on shade"], ["Wear", "Up to 12 hours"], ["How to use", "Apply one dot and blend with fingers or a brush"]], ingredients: "The formula varies by shade. It uses lightweight emollients, silicones and pigments, with white water lily, gardenia and lotus extracts. Colorants differ by shade."}
  },
  fenty: {
    ru: {brand: "Fenty Beauty • Хайлайтер", note: "Сияющий хайлайтер, 7,5 г — выберите оттенок", description: "Стойкий кремово-пудровый хайлайтер с мелким сиянием для скул, глаз и ключиц.", facts: [["Вес", "7,5 г для одиночного оттенка"], ["Финиш", "От мягкого до яркого сияния"], ["Формула", "Кремово-пудровая"], ["Применение", "Наносить на выступающие части лица кистью или пальцами"]], ingredients: "Состав зависит от оттенка и может включать синтетическую слюду, эмоленты, силиконы и цветовые пигменты. Для чувствительной кожи проверьте INCI выбранного оттенка."},
    en: {brand: "Fenty Beauty • Highlighter", note: "Shimmering highlighter, 7.5 g — choose a shade", description: "A long-wear cream-to-powder highlighter with fine shimmer for cheekbones, eyes and collarbones.", facts: [["Weight", "7.5 g for a single shade"], ["Finish", "Soft to high-impact shimmer"], ["Formula", "Cream-to-powder"], ["How to use", "Apply to the high points with a brush or fingers"]], ingredients: "Ingredients vary by shade and may include synthetic mica, emollients, silicones and color pigments. Check the selected shade’s INCI if your skin is sensitive."}
  },
  urban: {
    ru: {brand: "Urban Decay • Тени", note: "Палетка из 12 розово-нейтральных оттенков", description: "Палетка из розово-нейтральных оттенков для спокойного дневного или выразительного вечернего макияжа.", facts: [["Комплектация", "12 оттенков и двусторонняя кисть"], ["Цвета", "Розовые, бежевые, медные и сливовые"], ["Финиши", "Матовые и сияющие"], ["Применение", "Сочетать светлые базовые и более глубокие акцентные оттенки"]], ingredients: "У каждого из 12 оттенков свой состав. В тенях могут быть слюда, силика, эмоленты и минеральные или синтетические пигменты. Проверьте список нужного оттенка на упаковке."},
    en: {brand: "Urban Decay • Eyeshadow", note: "Palette with 12 rose-neutral shades", description: "A rose-neutral palette for soft daytime looks or more defined evening makeup.", facts: [["Includes", "12 shades and a dual-ended brush"], ["Colors", "Rose, beige, copper and plum"], ["Finishes", "Matte and shimmer"], ["How to use", "Combine pale base shades with deeper accents"]], ingredients: "Each of the 12 shades has its own ingredient list. Shadows may contain mica, silica, emollients and mineral or synthetic pigments. Check the packaging for the exact shade formula."}
  },
  charlotte: {
    ru: {brand: "Charlotte Tilbury • Помада", note: "Матовая помада, 3,5 г — выберите оттенок", description: "Стойкая матовая помада с комфортной текстурой и возможностью наслаивать цвет от лёгкого до насыщенного.", facts: [["Вес", "3,5 г"], ["Финиш", "Современный матовый"], ["Формула", "С экстрактами орхидеи и Lipstick Tree"], ["Применение", "Наносить прямо из стика или кистью для более точного контура"]], ingredients: "Ключевые компоненты: воски и эмоленты, экстракты орхидеи и Lipstick Tree, а также пигменты. Состав и красители зависят от выбранного оттенка; возможна отдушка."},
    en: {brand: "Charlotte Tilbury • Lipstick", note: "Matte lipstick, 3.5 g — choose a shade", description: "A comfortable, long-wear matte lipstick with buildable color from soft to full intensity.", facts: [["Weight", "3.5 g"], ["Finish", "Modern matte"], ["Formula", "With orchid and Lipstick Tree extracts"], ["How to use", "Apply from the bullet or with a lip brush for precision"]], ingredients: "Key components include waxes and emollients, orchid and Lipstick Tree extracts, plus pigments. Ingredients and colorants vary by shade; fragrance may be present."}
  },
  clinique: {
    ru: {brand: "Clinique • Губы", note: "Полупрозрачный цвет для губ — три оттенка Honey", description: "Лёгкая полупрозрачная формула между помадой и блеском, которая наслаивается и по-разному раскрывается на естественном цвете губ.", facts: [["Вес", "1,9 г"], ["Финиш", "Полупрозрачный, с мягким блеском"], ["Эффект", "От лёгкого оттенка до более насыщенного при наслаивании"], ["Применение", "Нанести один слой или добавить ещё для большей глубины цвета"]], ingredients: "Формула на основе смягчающих масел, восков и пигментов; бренд указывает 95% ухаживающих компонентов и отсутствие отдушки. Красители зависят от оттенка."},
    en: {brand: "Clinique • Lips", note: "Sheer lip color — three Honey shades", description: "A lightweight, sheer formula between lipstick and gloss that builds and adapts to your natural lip color.", facts: [["Weight", "1.9 g"], ["Finish", "Sheer with a soft shine"], ["Effect", "Buildable from a tint to deeper color"], ["How to use", "Apply one layer or build for more depth"]], ingredients: "A blend of conditioning oils, waxes and pigments; the brand states 95% conditioning ingredients and fragrance-free wear. Colorants vary by shade."}
  },
  nars: {
    ru: {brand: "NARS • Консилер", note: "Сияющий кремовый консилер — выберите тон", description: "Кремово-жидкий консилер с сияющим финишем и наслаиваемым покрытием для зоны под глазами и точечной коррекции.", facts: [["Объём", "6 мл"], ["Покрытие", "Среднее, наслаиваемое"], ["Финиш", "Сияющий"], ["Стойкость", "До 16 часов по данным бренда"]], ingredients: "Ключевые компоненты: вода, диметикон, смягчающие и увлажняющие компоненты, а также пигменты. Точный список красителей зависит от оттенка."},
    en: {brand: "NARS • Concealer", note: "Radiant creamy concealer — choose a shade", description: "A creamy liquid concealer with a radiant finish and buildable coverage for under-eyes and spot correction.", facts: [["Size", "6 ml"], ["Coverage", "Medium, buildable"], ["Finish", "Radiant"], ["Wear", "Up to 16 hours, according to the brand"]], ingredients: "Key components include water, dimethicone, conditioning and hydrating ingredients, plus pigments. The exact colorant list varies by shade."}
  },
  k18: {
    ru: {brand: "K18 • Уход за волосами", note: "Несмываемая восстанавливающая маска, 50 мл", description: "Несмываемая четырёхминутная маска для повреждённых волос, созданная для восстановления силы, мягкости и эластичности.", facts: [["Объём", "50 мл"], ["Подходит", "Для повреждённых и ломких волос"], ["Время", "4 минуты, не смывать"], ["Применение", "После шампуня без кондиционера; 1–3 нажатия на подсушенные полотенцем волосы"]], ingredients: "INCI с официальной страницы: Water, Alcohol Denat., Propylene Glycol, Cetearyl Alcohol, Dicaprylyl Ether, Cetyl Esters, Behentrimonium Chloride, Polysorbate 20, sh-Oligopeptide-78, Hydrolyzed Wheat Protein, Hydrolyzed Wheat Starch, Isopropyl Alcohol, Tocopherol, Phenoxyethanol, Potassium Sorbate, Citric Acid, Fragrance, Geraniol, Linalool, Hexyl Cinnamal, Benzyl Alcohol, Amyl Salicylate, Benzaldehyde."},
    en: {brand: "K18 • Hair care", note: "Leave-in repair mask, 50 ml", description: "A four-minute leave-in treatment for damaged hair, designed to restore strength, softness and bounce.", facts: [["Size", "50 ml"], ["Suitable for", "Damaged and brittle hair"], ["Timing", "Leave in for 4 minutes; do not rinse"], ["How to use", "Shampoo without conditioner; apply 1–3 pumps to towel-dried hair"]], ingredients: "Official INCI: Water, Alcohol Denat., Propylene Glycol, Cetearyl Alcohol, Dicaprylyl Ether, Cetyl Esters, Behentrimonium Chloride, Polysorbate 20, sh-Oligopeptide-78, Hydrolyzed Wheat Protein, Hydrolyzed Wheat Starch, Isopropyl Alcohol, Tocopherol, Phenoxyethanol, Potassium Sorbate, Citric Acid, Fragrance, Geraniol, Linalool, Hexyl Cinnamal, Benzyl Alcohol, Amyl Salicylate, Benzaldehyde."}
  },
  kerastase: {
    ru: {brand: "Kérastase • Уход за волосами", note: "Восстанавливающая маска, 200 мл", description: "Маска для повреждённых и чрезмерно обработанных волос, помогающая уменьшить ломкость и появление секущихся концов.", facts: [["Объём", "200 мл"], ["Подходит", "Для повреждённых и ослабленных волос"], ["Ключевые компоненты", "Про-кератиновый комплекс и керамиды"], ["Применение", "На влажную длину и концы на 5–10 минут, затем смыть"]], ingredients: "Бренд выделяет про-кератиновый комплекс, керамиды и сок растения воскрешения. Полный актуальный INCI проверьте на упаковке или официальной странице перед покупкой."},
    en: {brand: "Kérastase • Hair care", note: "Repairing hair mask, 200 ml", description: "A mask for damaged and over-processed hair that helps reduce breakage and the look of split ends.", facts: [["Size", "200 ml"], ["Suitable for", "Damaged and weakened hair"], ["Key ingredients", "Pro-keratin complex and ceramides"], ["How to use", "Apply to wet mid-lengths and ends for 5–10 minutes, then rinse"]], ingredients: "The brand highlights a pro-keratin complex, ceramides and resurrection plant sap. Check the current full INCI on the packaging or official page before purchase."}
  },
  olaplex: {
    ru: {brand: "OLAPLEX • Уход за волосами", note: "Трёхминутный уход перед шампунем, 100 мл", description: "Уход перед шампунем для более мягких и крепких волос и уменьшения будущей ломкости.", facts: [["Объём", "100 мл"], ["Подходит", "Для всех типов волос"], ["Формула", "Без протеинов и SLS/SLES"], ["Применение", "Нанести на влажные волосы до шампуня на 3 минуты, смыть"]], ingredients: "В формуле используется фирменная технология OLAPLEX для поддержки связей волос и смесь аминокислот. Полный актуальный INCI проверьте на упаковке или официальной странице."},
    en: {brand: "OLAPLEX • Hair care", note: "Three-minute pre-shampoo treatment, 100 ml", description: "A pre-shampoo treatment for softer, stronger-looking hair and reduced future breakage.", facts: [["Size", "100 ml"], ["Suitable for", "All hair types"], ["Formula", "Protein-free and SLS/SLES-free"], ["How to use", "Apply to wet hair before shampoo, wait 3 minutes, then rinse"]], ingredients: "The formula uses OLAPLEX bond-building technology and an amino-acid blend. Check the current full INCI on the packaging or official page."}
  },
  beautyblender: {
    ru: {brand: "Beautyblender • Спонж", note: "Многоразовый спонж для тона и консилера", description: "Мягкий многоразовый спонж без латекса для равномерной растушёвки тонального средства, консилера и кремовых продуктов.", facts: [["Материал", "Мягкая пена без латекса"], ["Подходит", "Для жидких, кремовых и пудровых текстур"], ["Применение", "Намочить, хорошо отжать и наносить похлопывающими движениями"], ["Уход", "Очищать после использования и сушить на воздухе"]], ingredients: "Это инструмент, а не косметическая формула: спонж изготовлен из пенополиуретана без латекса с водорастворимыми красителями. Регулярно мойте и заменяйте при повреждении."},
    en: {brand: "Beautyblender • Sponge", note: "Reusable sponge for foundation and concealer", description: "A soft, reusable latex-free sponge for even blending of foundation, concealer and cream products.", facts: [["Material", "Soft latex-free foam"], ["Suitable for", "Liquid, cream and powder textures"], ["How to use", "Wet, squeeze well and bounce product onto skin"], ["Care", "Clean after use and air-dry"]], ingredients: "This is a tool, not a cosmetic formula: the sponge is made from latex-free polyurethane foam with water-soluble dyes. Wash regularly and replace if damaged."}
  },
  rareBrush: {
    ru: {brand: "Rare Beauty • Кисть", note: "Мягкая скошенная кисть для жидких и кремовых румян", description: "Мягкая скошенная кисть, которая помогает аккуратно растушевать пигментированные жидкие и кремовые румяна.", facts: [["Ворс", "Синтетический, разной длины"], ["Форма", "Скошенная, повторяет контуры щёк"], ["Подходит", "Для жидких и кремовых формул"], ["Применение", "Растушёвывать лёгкими вбивающими и круговыми движениями"]], ingredients: "Это инструмент: мягкий синтетический ворс разной длины, металлический обжим и ручка. Мойте мягким средством и сушите горизонтально."},
    en: {brand: "Rare Beauty • Brush", note: "Soft angled brush for liquid and cream blush", description: "A soft angled brush designed to blend pigmented liquid and cream blush with control.", facts: [["Bristles", "Synthetic, mixed length"], ["Shape", "Angled to follow cheek contours"], ["Suitable for", "Liquid and cream formulas"], ["How to use", "Blend with light tapping or circular motions"]], ingredients: "This is a tool: soft mixed-length synthetic bristles, a metal ferrule and a handle. Wash with a gentle cleanser and dry flat."}
  }
};

const productLocalesHy = {
  ordinary: {brand: "The Ordinary", note: "Յուղայնությունը վերահսկող շիճուկ, 30 մլ", description: "Թեթև ջրային շիճուկ՝ տեսանելի ծակոտիների, անհարթ հյուսվածքի և ավելորդ յուղայնության համար։", facts: [["Ծավալ", "30 մլ"], ["Ակտիվներ", "Նիացինամիդ 10%, ցինկ 1%"], ["Հարմար է", "Բոլոր տեսակի մաշկերի համար"], ["Կիրառում", "Մի քանի կաթիլ՝ առավոտյան և երեկոյան, կրեմից առաջ"]], ingredients: "Հիմնական բաղադրիչներ՝ 10% նիացինամիդ, Zinc PCA, պենտիլեն գլիկոլ և թամարինդի խեժ։ Առանց բույրի և յուղերի։"},
  lucin: {brand: "Lucin Organics", note: "Շիճուկ՝ 15% կայունացված վիտամին C-ով, 30 մլ", description: "Հայկական օրգանական շիճուկ՝ մաշկի փայլի և ավելի հավասար երանգի համար։", facts: [["Ծավալ", "30 մլ"], ["Ակտիվ", "15% կայունացված վիտամին C"], ["Արդյունք", "Փայլ, վերականգնում և հավասար երանգ"], ["Կիրառում", "Կրեմից առաջ՝ առավոտյան կամ երեկոյան"]], ingredients: "Հիմնական բաղադրիչներ՝ 15% կայունացված վիտամին C, ժոժոբայի, մասուրի, սկվալանի և կակայ յուղեր, վիտամին E ու բուսական քաղվածքներ։ Պարունակում է գրեյպֆրուտի և լայմի եթերայուղեր․ զգայուն մաշկի դեպքում փորձարկեք փոքր հատվածում։"},
  laneige: {brand: "LANEIGE • K-Beauty", note: "Խոնավեցնող գիշերային դիմակ, 70 մլ", description: "Կորեական գելային գիշերային դիմակ՝ ինտենսիվ խոնավեցման և մաշկի պաշտպանիչ շերտի համար։", facts: [["Ծավալ", "70 մլ"], ["Բաղադրիչներ", "Սկվալան, բետա-գլյուկան և խոնավեցնող համալիր"], ["Հարմար է", "Նորմալ, չոր, համակցված և յուղոտ մաշկի համար"], ["Կիրառում", "Երեկոյան խնամքի վերջին փուլում"]], ingredients: "Հիմնական բաղադրիչներ՝ սկվալան, գլիցերին, բետա-գլյուկան և պրոբիոտիկներից ստացված համալիր։ Կարող է պարունակել բուրավետիչ։"},
  cosrx: {brand: "COSRX • K-Beauty", note: "Էսենցիա՝ 96,3% խխունջի մուցինով, 100 մլ", description: "Թեթև կորեական էսենցիա՝ խորը խոնավեցման, ավելի հարթ հյուսվածքի և մաշկի պատնեշի համար։", facts: [["Ծավալ", "100 մլ"], ["Ակտիվ", "96,3% խխունջի սեկրեցիայի ֆիլտրատ"], ["Լրացուցիչ", "Ալանտոին, պանտենոլ և նատրիումի հիալուրոնատ"], ["Կիրառում", "Մաքրումից և տոնիկից հետո, կրեմից առաջ"]], ingredients: "Հիմնական բաղադրիչներ՝ 96,3% խխունջի սեկրեցիայի ֆիլտրատ, բետաին, բուտիլեն գլիկոլ, նատրիումի հիալուրոնատ, պանտենոլ, ալանտոին և արգինին։"},
  rare: {brand: "Rare Beauty • Կարմրաներկ", note: "Հեղուկ կարմրաներկ, 7,5 մլ — ընտրեք երանգը", description: "Թեթև և հագեցած հեղուկ կարմրաներկ․ մեկ փոքր կաթիլը բավարար է բնական թարմ գույնի համար։", facts: [["Ծավալ", "7,5 մլ"], ["Վերջնարդյունք", "Փայլատ կամ փայլուն՝ ըստ երանգի"], ["Դիմացկունություն", "Մինչև 12 ժամ"], ["Կիրառում", "Մեկ կաթիլ և տարածել մատներով կամ վրձնով"]], ingredients: "Բանաձևը տարբերվում է ըստ երանգի։ Հիմքում կան թեթև էմոլիենտներ, սիլիկոններ և պիգմենտներ, ինչպես նաև ջրաշուշանի, գարդենիայի և լոտոսի քաղվածքներ։"},
  fenty: {brand: "Fenty Beauty • Հայլայթեր", note: "Փայլուն հայլայթեր, 7,5 գ — ընտրեք երանգը", description: "Դիմացկուն կրեմ-փոշի հայլայթեր՝ այտոսկրերի, աչքերի և անրակների համար։", facts: [["Քաշ", "7,5 գ՝ մեկ երանգի համար"], ["Վերջնարդյունք", "Նուրբից մինչև վառ փայլ"], ["Բանաձև", "Կրեմ-փոշի"], ["Կիրառում", "Քսել վրձնով կամ մատներով"]], ingredients: "Բաղադրությունը տարբերվում է ըստ երանգի և կարող է ներառել սինթետիկ միկա, էմոլիենտներ, սիլիկոններ և գունանյութեր։"},
  urban: {brand: "Urban Decay • Ստվերաներկ", note: "12 վարդագույն-չեզոք երանգների ներկապնակ", description: "Վարդագույն-չեզոք ներկապնակ՝ առօրյա կամ արտահայտիչ երեկոյան դիմահարդարման համար։", facts: [["Հավաքածու", "12 երանգ և երկկողմանի վրձին"], ["Գույներ", "Վարդագույն, բեժ, պղնձագույն և սալորագույն"], ["Վերջնարդյունք", "Փայլատ և փայլուն"], ["Կիրառում", "Միավորել բաց հիմքային և մուգ շեշտադրող երանգները"]], ingredients: "12 երանգներից յուրաքանչյուրն ունի իր բաղադրությունը։ Կարող են լինել միկա, սիլիկա, էմոլիենտներ և հանքային կամ սինթետիկ պիգմենտներ։"},
  charlotte: {brand: "Charlotte Tilbury • Շրթներկ", note: "Փայլատ շրթներկ, 3,5 գ — ընտրեք երանգը", description: "Հարմարավետ և դիմացկուն փայլատ շրթներկ՝ շերտավորվող գույնով։", facts: [["Քաշ", "3,5 գ"], ["Վերջնարդյունք", "Ժամանակակից փայլատ"], ["Բանաձև", "Խոլորձի և Lipstick Tree քաղվածքներով"], ["Կիրառում", "Ուղիղ շրթներկից կամ վրձնով"]], ingredients: "Հիմնական բաղադրիչներ՝ մոմեր և էմոլիենտներ, խոլորձի ու Lipstick Tree քաղվածքներ և պիգմենտներ։ Բաղադրությունը տարբերվում է ըստ երանգի։"},
  clinique: {brand: "Clinique • Շուրթեր", note: "Թափանցիկ շուրթերի գույն — երեք Honey երանգ", description: "Թեթև, կիսաթափանցիկ բանաձև՝ շրթներկի և փայլի միջև, որը շերտավորվում է բնական գույնի վրա։", facts: [["Քաշ", "1,9 գ"], ["Վերջնարդյունք", "Կիսաթափանցիկ, նուրբ փայլով"], ["Արդյունք", "Թեթևից մինչև ավելի հագեցած գույն"], ["Կիրառում", "Մեկ շերտ կամ մի քանի շերտ՝ խորության համար"]], ingredients: "Փափկեցնող յուղերի, մոմերի և պիգմենտների խառնուրդ։ Բրենդը նշում է 95% խնամող բաղադրիչ և բույրի բացակայություն։"},
  nars: {brand: "NARS • Քողարկիչ", note: "Փայլուն կրեմային քողարկիչ — ընտրեք երանգը", description: "Կրեմային հեղուկ քողարկիչ՝ միջին և շերտավորվող ծածկույթով աչքերի տակ ու տեղային ուղղման համար։", facts: [["Ծավալ", "6 մլ"], ["Ծածկույթ", "Միջին, շերտավորվող"], ["Վերջնարդյունք", "Փայլուն"], ["Դիմացկունություն", "Մինչև 16 ժամ՝ ըստ բրենդի"]], ingredients: "Հիմնական բաղադրիչներ՝ ջուր, դիմետիկոն, փափկեցնող և խոնավեցնող բաղադրիչներ ու պիգմենտներ։ Գունանյութերը տարբերվում են ըստ երանգի։"},
  beautyblender: {brand: "Beautyblender • Սպունգ", note: "Բազմակի օգտագործման սպունգ՝ տոնայինի և քողարկիչի համար", description: "Փափուկ, լատեքս չպարունակող սպունգ՝ տոնայինի, քողարկիչի և կրեմային միջոցների հավասար տարածման համար։", facts: [["Նյութ", "Փափուկ փրփուր՝ առանց լատեքսի"], ["Հարմար է", "Հեղուկ, կրեմային և փոշային հյուսվածքների համար"], ["Կիրառում", "Թրջել, քամել և քսել թեթև հարվածներով"], ["Խնամք", "Մաքրել օգտագործումից հետո և չորացնել օդում"]], ingredients: "Սա գործիք է, ոչ թե կոսմետիկ բանաձև․ պատրաստված է լատեքս չպարունակող պոլիուրեթանային փրփուրից։"},
  rareBrush: {brand: "Rare Beauty • Վրձին", note: "Փափուկ թեք վրձին՝ հեղուկ և կրեմային կարմրաներկի համար", description: "Փափուկ թեք վրձին, որը օգնում է հավասար տարածել պիգմենտավորված հեղուկ և կրեմային կարմրաներկը։", facts: [["Մազիկներ", "Սինթետիկ, տարբեր երկարության"], ["Ձև", "Թեք՝ այտերի ուրվագծին համապատասխան"], ["Հարմար է", "Հեղուկ և կրեմային բանաձևերի համար"], ["Կիրառում", "Տարածել թեթև հարվածող կամ շրջանաձև շարժումներով"]], ingredients: "Սա գործիք է՝ փափուկ սինթետիկ մազիկներով, մետաղական օղակով և բռնակով։ Լվացեք նուրբ միջոցով և չորացրեք հորիզոնական։"},
  k18: {brand: "K18 • Մազերի խնամք", note: "Չլվացվող վերականգնող դիմակ, 50 մլ", description: "Չորս րոպեանոց չլվացվող միջոց՝ վնասված մազերի ամրության, փափկության և առաձգականության համար։", facts: [["Ծավալ", "50 մլ"], ["Հարմար է", "Վնասված և փխրուն մազերի համար"], ["Ժամանակ", "4 րոպե, չլվանալ"], ["Կիրառում", "Շամպունից հետո՝ առանց կոնդիցիոների, 1–3 սեղմում սրբիչով չորացրած մազերին"]], ingredients: "Հիմնական բաղադրիչները ներառում են sh-Oligopeptide-78, հիդրոլիզացված ցորենի սպիտակուց և օժանդակ բաղադրիչներ։ Պարունակում է բուրավետիչ․ ստուգեք ամբողջ INCI-ն պաշտոնական էջում։"},
  kerastase: {brand: "Kérastase • Մազերի խնամք", note: "Վերականգնող դիմակ, 200 մլ", description: "Դիմակ՝ վնասված և քիմիական մշակման ենթարկված մազերի համար, որը օգնում է նվազեցնել կոտրվելն ու ճյուղավորված ծայրերը։", facts: [["Ծավալ", "200 մլ"], ["Հարմար է", "Վնասված և թուլացած մազերի համար"], ["Հիմնական բաղադրիչներ", "Պրո-կերատինային համալիր և կերամիդներ"], ["Կիրառում", "Խոնավ մազերի երկարությանը և ծայրերին՝ 5–10 րոպե, ապա լվանալ"]], ingredients: "Բրենդը նշում է պրո-կերատինային համալիր, կերամիդներ և վերածնվող բույսի հյութ։ Ստուգեք ամբողջ INCI-ն պաշտոնական էջում։"},
  olaplex: {brand: "OLAPLEX • Մազերի խնամք", note: "Երեք րոպեանոց նախաշամպունային խնամք, 100 մլ", description: "Նախաշամպունային խնամք՝ ավելի փափուկ և ամուր մազերի ու ապագա կոտրվելու նվազեցման համար։", facts: [["Ծավալ", "100 մլ"], ["Հարմար է", "Բոլոր տեսակի մազերի համար"], ["Բանաձև", "Առանց պրոտեինների և SLS/SLES-ի"], ["Կիրառում", "Քսել խոնավ մազերին մինչև շամպունը, սպասել 3 րոպե և լվանալ"]], ingredients: "Բանաձևը օգտագործում է OLAPLEX-ի կապերը պահպանող տեխնոլոգիան և ամինաթթուների խառնուրդ։ Ստուգեք ամբողջ INCI-ն պաշտոնական էջում։"}
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
const customerEmail = document.querySelector("#customer-email");
const customerPhone = document.querySelector("#customer-phone");
const securePaymentPanel = document.querySelector("#secure-payment-panel");
const orderSuccess = document.querySelector("#order-success");
const orderSuccessText = document.querySelector("#order-success-text");
const productDialog = document.querySelector("#product-dialog");
const shadeArea = document.querySelector("#dialog-shade-area");
const shadeTitle = document.querySelector("#shade-title");
const shadeOptions = document.querySelector("#shade-options");
const selectedShade = document.querySelector("#selected-shade");
const productSource = document.querySelector("#dialog-product-source");
const dialogAddButton = document.querySelector("#dialog-add-button");
const consultantWidget = document.querySelector("#consultant-widget");
const consultantLauncher = document.querySelector("#consultant-launcher");
const consultantMini = document.querySelector(".consultant-mini");
const consultantSmaller = document.querySelector("#consultant-smaller");
const consultantLarger = document.querySelector("#consultant-larger");
const consultantReset = document.querySelector("#consultant-reset");
const consultantDialog = document.querySelector("#consultant-dialog");
const consultantChat = document.querySelector("#consultant-chat");
const consultantQuestionForm = document.querySelector("#consultant-question-form");
const consultantQuestionInput = document.querySelector("#consultant-question-input");
const productIngredients = document.querySelector("#dialog-product-ingredients");
const productPhoto = document.querySelector("#dialog-product-photo");
const photoShadePreview = document.querySelector("#photo-shade-preview");
const photoShadeName = document.querySelector("#photo-shade-name");
const courierSchedule = document.querySelector("#courier-schedule");
const deliveryAddress = document.querySelector("#delivery-address");
const deliveryDate = document.querySelector("#delivery-date");
const deliveryTime = document.querySelector("#delivery-time");

function tr(ru, en, hy) {
  return window.AuraPreferences.text(ru, en, hy);
}

function localProduct(productId) {
  if (window.AuraPreferences.lang === "hy") return productLocalesHy[productId];
  return productLocales[productId][window.AuraPreferences.lang];
}

function formattedPrice(value) {
  return window.AuraPreferences.formatPrice(value);
}

function shadeNote(shade) {
  if (window.AuraPreferences.lang === "ru") return shade.note || "";
  if (window.AuraPreferences.lang === "hy") {
    const hyNotes = {
      "пыльно-лиловый, сияющий": "փայլուն մանուշակագույն-վարդագույն",
      "нюдово-розовый, матовый": "փայլատ նյուդ-վարդագույն",
      "холодный розовый, сияющий": "փայլուն սառը վարդագույն",
      "бежево-персиковый, сияющий": "փայլուն բեժ-դեղձագույն",
      "приглушённый персиковый, сияющий": "փայլուն մեղմ դեղձագույն",
      "глубокий ягодный, матовый": "փայլատ խորը հատապտղային",
      "сияющий розовый": "փայլուն վարդագույն",
      "яркое золото": "վառ ոսկեգույն",
      "рубиново-медный": "ռուբին-պղնձագույն",
      "шампань и ледяное сияние": "շամպայն և սառցե փայլ",
      "нежно-розовый дуэт": "նուրբ վարդագույն դուետ",
      "нюдово-розовый": "նյուդ-վարդագույն",
      "тёплый ягодно-розовый": "տաք հատապտղային-վարդագույն",
      "золотисто-коралловый": "ոսկեգույն-մարջանագույն",
      "пастельный ягодно-красный": "պաստելային հատապտղային-կարմիր",
      "ягодно-розовый": "հատապտղային-վարդագույն",
      "классический красный": "դասական կարմիր",
      "мягкий прозрачный розовый": "նուրբ թափանցիկ վարդագույն",
      "тёплый прозрачный нюд": "տաք թափանցիկ նյուդ",
      "прозрачный ягодно-коричневый": "թափանցիկ հատապտղային-շագանակագույն",
      "очень светлый, нейтральный": "շատ բաց, չեզոք",
      "светлый, холодно-розовый": "բաց, սառը վարդագույն",
      "светло-средний, нейтральный": "բաց-միջին, չեզոք",
      "средний, золотистый": "միջին, ոսկեգույն",
      "средне-тёмный, тёплый": "միջին-մուգ, տաք",
      "тёмный, золотисто-оливковый": "մուգ, ոսկեգույն-ձիթապտղային"
    };
    return hyNotes[shade.note] || shade.note || "";
  }
  const notes = {
    "пыльно-лиловый, сияющий": "dewy mauve",
    "нюдово-розовый, матовый": "matte nude pink",
    "холодный розовый, сияющий": "dewy cool pink",
    "бежево-персиковый, сияющий": "dewy beige peach",
    "приглушённый персиковый, сияющий": "dewy muted peach",
    "глубокий ягодный, матовый": "matte deep berry",
    "сияющий розовый": "shimmering pink",
    "яркое золото": "vivid gold",
    "рубиново-медный": "ruby copper",
    "шампань и ледяное сияние": "champagne and icy shimmer",
    "нежно-розовый дуэт": "soft pink duo",
    "нюдово-розовый": "nude pink",
    "тёплый ягодно-розовый": "warm berry pink",
    "золотисто-коралловый": "golden coral",
    "пастельный ягодно-красный": "pastel berry red",
    "ягодно-розовый": "berry pink",
    "классический красный": "classic red",
    "мягкий прозрачный розовый": "soft sheer pink",
    "тёплый прозрачный нюд": "warm sheer nude",
    "прозрачный ягодно-коричневый": "sheer berry brown",
    "очень светлый, нейтральный": "very light, neutral",
    "светлый, холодно-розовый": "light, cool pink",
    "светло-средний, нейтральный": "light-medium, neutral",
    "средний, золотистый": "medium, golden",
    "средне-тёмный, тёплый": "medium-deep, warm",
    "тёмный, золотисто-оливковый": "deep, golden olive"
  };
  return notes[shade.note] || shade.note || "";
}

function applyShadePreview(shade) {
  if (!shade) {
    productPhoto.classList.remove("has-shade-preview");
    productPhoto.style.removeProperty("--selected-shade");
    photoShadePreview.hidden = true;
    return;
  }
  productPhoto.style.setProperty("--selected-shade", shade.color);
  productPhoto.classList.add("has-shade-preview");
  photoShadePreview.hidden = false;
  photoShadeName.textContent = `${tr("Выбран", "Selected", "Ընտրված")}: ${shade.name}`;
}

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
  cartButton.setAttribute("aria-label", tr(`Корзина: ${count} товаров`, `Cart: ${count} items`, `Զամբյուղ՝ ${count} ապրանք`));
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
    const locale = localProduct(productId);
    const row = document.createElement("article");
    row.className = "cart-item";
    row.innerHTML = `
      <img src="${product.image}" alt="">
      <div class="cart-item-copy"><strong>${product.name}</strong><small>${locale.brand}${variant ? `<br>${tr("Оттенок", "Shade", "Երանգ")}: ${variant}` : ""}</small><span>${formattedPrice(product.price)}</span></div>
      <div class="quantity-control" aria-label="${tr("Количество", "Quantity", "Քանակ")} ${product.name}${variant ? `, ${tr("оттенок", "shade", "երանգ")} ${variant}` : ""}">
        <button type="button" data-cart-action="decrease" data-cart-key="${key}" aria-label="${tr("Уменьшить количество", "Decrease quantity", "Նվազեցնել քանակը")}">−</button>
        <span>${quantity}</span>
        <button type="button" data-cart-action="increase" data-cart-key="${key}" aria-label="${tr("Увеличить количество", "Increase quantity", "Ավելացնել քանակը")}">+</button>
      </div>`;
    cartItems.append(row);
  });

  const total = entries.reduce((sum, {productId, quantity}) => sum + products[productId].price * quantity, 0);

  cartTotals.replaceChildren();
  if (total) cartTotals.append(createTotal(tr("Товары", "Products", "Ապրանքներ"), formattedPrice(total)));
  const delivery = checkoutForm?.elements.delivery?.value;
  if (total && delivery === "courier") {
    const courierUsd = 1000 / window.AuraPreferences.amdRate;
    const courierPrice = window.AuraPreferences.currency === "AMD" ? "1 000 ֏" : formattedPrice(courierUsd);
    cartTotals.append(createTotal(tr("Курьер", "Courier", "Սուրհանդակ"), courierPrice));
    cartTotals.append(createTotal(tr("Итого", "Total", "Ընդամենը"), formattedPrice(total + courierUsd)));
  } else if (total && delivery === "post") {
    cartTotals.append(createTotal(tr("Доставка", "Delivery", "Առաքում"), tr("По тарифу почты", "Postal rate", "Փոստի սակագնով")));
  }
}

function createTotal(label, value) {
  const row = document.createElement("div");
  row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  return row;
}

function updateDeliveryFields() {
  const courier = checkoutForm.elements.delivery.value === "courier";
  courierSchedule.hidden = !courier;
  deliveryDate.required = courier;
  deliveryTime.required = courier;
  renderCart();
}

function updatePaymentFields() {
  securePaymentPanel.hidden = checkoutForm.elements.payment.value !== "payment-link";
}

function renderShadeOptions(product, preferredVariant = null) {
  const selectable = product.variants || [];
  const displayOnly = product.displayShades || [];
  const shades = selectable.length ? selectable : displayOnly;
  shadeOptions.replaceChildren();
  shadeArea.hidden = shades.length === 0;
  if (!shades.length) return;

  shadeTitle.textContent = selectable.length ? tr("Выберите оттенок", "Choose a shade", "Ընտրեք երանգը") : tr("Цвета палетки", "Palette shades", "Ներկապնակի գույները");
  shadeOptions.setAttribute("role", selectable.length ? "radiogroup" : "list");
  const preferredIndex = selectable.findIndex((shade) => shade.name === preferredVariant);
  const selectedIndex = preferredIndex >= 0 ? preferredIndex : 0;
  activeVariant = selectable.length ? selectable[selectedIndex].name : null;
  selectedShade.textContent = selectable.length ? `${selectable[selectedIndex].name} — ${shadeNote(selectable[selectedIndex])}` : tr("12 настоящих оттенков", "12 authentic shades", "12 իրական երանգ");
  applyShadePreview(selectable.length ? selectable[selectedIndex] : null);

  shades.forEach((shade, index) => {
    const item = document.createElement(selectable.length ? "button" : "div");
    item.className = `shade-option${selectable.length && index === selectedIndex ? " selected" : ""}`;
    item.style.setProperty("--swatch", shade.color);
    const note = shadeNote(shade);
    item.title = note ? `${shade.name} — ${note}` : shade.name;
    item.setAttribute("aria-label", note ? `${shade.name}, ${note}` : shade.name);
    item.innerHTML = `<span class="shade-color" aria-hidden="true"></span><span>${shade.name}</span>`;
    if (selectable.length) {
      item.type = "button";
      item.setAttribute("role", "radio");
      item.setAttribute("aria-checked", index === selectedIndex ? "true" : "false");
      item.addEventListener("click", () => {
        activeVariant = shade.name;
        selectedShade.textContent = `${shade.name} — ${shadeNote(shade)}`;
        applyShadePreview(shade);
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

function openProduct(productId, preferredVariant = null) {
  const product = products[productId];
  if (!product) return;
  const locale = localProduct(productId);
  activeProductId = productId;
  activeVariant = null;
  applyShadePreview(null);
  const image = document.querySelector("#dialog-product-image");
  image.src = product.image;
  image.alt = `${locale.brand} ${product.name}`;
  document.querySelector("#dialog-product-brand").textContent = locale.brand;
  document.querySelector("#product-dialog-title").textContent = product.name;
  document.querySelector("#dialog-product-description").textContent = locale.description;
  document.querySelector("#dialog-product-price").textContent = formattedPrice(product.price);
  productIngredients.textContent = locale.ingredients;
  dialogAddButton.disabled = !Number.isFinite(product.price);
  dialogAddButton.textContent = Number.isFinite(product.price) ? tr("Добавить в корзину", "Add to cart", "Ավելացնել զամբյուղ") : tr("Сначала уточним цену", "Ask for the price first", "Նախ ճշտել գինը");
  productSource.href = product.source;
  const facts = document.querySelector("#dialog-product-facts");
  facts.replaceChildren();
  locale.facts.forEach(([term, description]) => {
    const wrapper = document.createElement("div");
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = term;
    dd.textContent = description;
    wrapper.append(dt, dd);
    facts.append(wrapper);
  });
  renderShadeOptions(product, preferredVariant);
  if (!productDialog.open) productDialog.showModal();
}

function openCart() {
  orderSuccess.hidden = true;
  cartItems.hidden = false;
  renderCart();
  cartDialog.showModal();
}

function renderCatalog() {
  document.title = tr("Товары — Aura Beauty", "Products — Aura Beauty", "Ապրանքներ — Aura Beauty");
  document.querySelectorAll(".product-card").forEach((card) => {
    const productId = card.dataset.productId;
    const product = products[productId];
    const locale = localProduct(productId);
    card.querySelector(".product-kind").textContent = locale.brand;
    card.querySelector(".product-note").textContent = locale.note;
    card.querySelector(".price").textContent = formattedPrice(product.price);
    card.setAttribute("aria-label", tr(`Подробнее о ${product.name}`, `View details for ${product.name}`, `${product.name} մանրամասներ`));
    card.querySelector('[data-action="details"]').textContent = tr("Подробнее", "Details", "Մանրամասներ");
    const purchase = card.querySelector('[data-action="add"], [data-action="choose"]');
    if (purchase.dataset.action === "add") purchase.textContent = tr("В корзину", "Add to cart", "Զամբյուղ");
    else if (productId === "clinique") purchase.textContent = tr("Посмотреть оттенки", "View shades", "Դիտել երանգները");
    else if (productId === "nars") purchase.textContent = tr("Посмотреть тона", "View shades", "Դիտել երանգները");
    else purchase.textContent = tr("Выбрать оттенок", "Choose shade", "Ընտրել երանգը");
  });
}

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]");
    if (action?.dataset.action === "add") {
      event.stopPropagation();
      addToCart(card.dataset.productId, null);
      const original = action.textContent;
      action.textContent = tr("Добавлено ✓", "Added ✓", "Ավելացված է ✓");
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

checkoutForm.querySelectorAll('input[name="delivery"]').forEach((radio) => radio.addEventListener("change", updateDeliveryFields));
checkoutForm.querySelectorAll('input[name="payment"]').forEach((radio) => radio.addEventListener("change", updatePaymentFields));
deliveryDate.min = new Date().toISOString().slice(0, 10);

const emailFormat = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const armenianPhoneFormat = /^\+374 \d{2} \d{3} \d{3}$/;

function markContactValidity(input, valid) {
  input.classList.toggle("is-invalid", !valid && Boolean(input.value.trim()));
  input.setAttribute("aria-invalid", String(!valid && Boolean(input.value.trim())));
}

customerEmail.addEventListener("input", () => {
  const cursor = customerEmail.selectionStart;
  const cleaned = customerEmail.value.replace(/[^A-Za-z0-9.!#$%&'*+/=?^_`{|}~@-]/g, "");
  if (cleaned !== customerEmail.value) {
    customerEmail.value = cleaned;
    customerEmail.setSelectionRange(Math.min(cursor, cleaned.length), Math.min(cursor, cleaned.length));
  }
  customerEmail.setCustomValidity("");
  markContactValidity(customerEmail, !cleaned || emailFormat.test(cleaned));
});

customerEmail.addEventListener("blur", () => {
  const valid = !customerEmail.value || emailFormat.test(customerEmail.value);
  customerEmail.setCustomValidity(valid ? "" : tr("Введите email в формате name@example.com.", "Enter an email in the format name@example.com.", "Մուտքագրեք էլ․ փոստը name@example.com ձևաչափով։"));
  markContactValidity(customerEmail, valid);
});

function formatArmenianPhone(value) {
  let digits = value.replace(/\D/g, "");
  if (value.trim().startsWith("+") && digits && !digits.startsWith("374")) return "+374 ";
  if (digits.startsWith("374")) digits = digits.slice(3);
  else if (digits.startsWith("0")) digits = digits.slice(1);
  digits = digits.slice(0, 8);
  if (!digits && !value.includes("374")) return "";
  const parts = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5, 8)].filter(Boolean);
  return `+374${parts.length ? ` ${parts.join(" ")}` : " "}`;
}

customerPhone.addEventListener("focus", () => {
  if (!customerPhone.value) customerPhone.value = "+374 ";
});

customerPhone.addEventListener("input", () => {
  customerPhone.value = formatArmenianPhone(customerPhone.value);
  customerPhone.setCustomValidity("");
  markContactValidity(customerPhone, !customerPhone.value.trim() || armenianPhoneFormat.test(customerPhone.value));
});

customerPhone.addEventListener("blur", () => {
  if (customerPhone.value.trim() === "+374") customerPhone.value = "";
  const valid = !customerPhone.value || armenianPhoneFormat.test(customerPhone.value);
  customerPhone.setCustomValidity(valid ? "" : tr("Введите армянский номер в формате +374 XX XXX XXX.", "Enter an Armenian number in the format +374 XX XXX XXX.", "Մուտքագրեք հայկական համարը +374 XX XXX XXX ձևաչափով։"));
  markContactValidity(customerPhone, valid);
});

checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formError.textContent = "";
  if (window.AuraTelegram && !window.AuraTelegram.guardCheckout()) {
    formError.textContent = tr("Сначала нужно безопасно подтвердить Telegram-покупателя и подключить общий сервер заказов.", "The Telegram buyer must be securely verified and the shared order server connected first.", "Նախ պետք է ապահով հաստատել Telegram գնորդին և միացնել պատվերների ընդհանուր սերվերը։");
    return;
  }
  const name = document.querySelector("#customer-name").value.trim();
  const phone = customerPhone.value.trim();
  const email = customerEmail.value.trim();
  const paymentMethod = checkoutForm.elements.payment.value;
  const deliveryMethod = checkoutForm.elements.delivery.value;
  const paymentLabels = {
    "payment-link": tr("онлайн банковской картой через защищённую ссылку", "online bank card via secure link", "առցանց՝ բանկային քարտով, ապահով հղմամբ"),
    "on-receipt": tr("оплата при получении", "payment on receipt", "վճարում ստանալիս"),
    "bank-transfer": tr("банковский перевод", "bank transfer", "բանկային փոխանցում")
  };
  const deliveryLabels = {
    post: tr("почтой в марзы Армении, 2–5 рабочих дней", "post to Armenia’s regions, 2–5 business days", "փոստով՝ Հայաստանի մարզեր, 2–5 աշխատանքային օր"),
    courier: tr(`курьером по адресу ${deliveryAddress.value.trim()}, ${deliveryDate.value} в ${deliveryTime.value}`, `courier to ${deliveryAddress.value.trim()}, ${deliveryDate.value} at ${deliveryTime.value}`, `սուրհանդակով՝ ${deliveryAddress.value.trim()} հասցեով, ${deliveryDate.value}, ժամը ${deliveryTime.value}`)
  };

  if (!name) {
    formError.textContent = tr("Укажите имя.", "Enter your name.", "Նշեք ձեր անունը։");
    document.querySelector("#customer-name").focus();
    return;
  }
  if (!email && !phone) {
    formError.textContent = tr("Укажите email или номер телефона.", "Enter an email address or phone number.", "Նշեք էլ․ փոստը կամ հեռախոսահամարը։");
    customerEmail.focus();
    return;
  }
  if (email && !emailFormat.test(email)) {
    formError.textContent = tr("Введите email в формате name@example.com.", "Enter an email in the format name@example.com.", "Մուտքագրեք էլ․ փոստը name@example.com ձևաչափով։");
    markContactValidity(customerEmail, false);
    customerEmail.focus();
    return;
  }
  if (phone && !armenianPhoneFormat.test(phone)) {
    formError.textContent = tr("Введите армянский номер в формате +374 XX XXX XXX.", "Enter an Armenian number in the format +374 XX XXX XXX.", "Մուտքագրեք հայկական համարը +374 XX XXX XXX ձևաչափով։");
    markContactValidity(customerPhone, false);
    customerPhone.focus();
    return;
  }
  if (!deliveryAddress.value.trim()) {
    formError.textContent = tr("Укажите адрес доставки.", "Enter a delivery address.", "Նշեք առաքման հասցեն։");
    deliveryAddress.focus();
    return;
  }
  if (deliveryMethod === "courier" && (!deliveryDate.value || !deliveryTime.value)) {
    formError.textContent = tr("Выберите удобный день и время для курьера.", "Choose a preferred courier day and time.", "Ընտրեք սուրհանդակի հարմար օրը և ժամը։");
    (!deliveryDate.value ? deliveryDate : deliveryTime).focus();
    return;
  }

  const entries = getCartEntries();
  let orderId = `AB-${Date.now().toString().slice(-8)}`;
  const order = {
    id: orderId,
    createdAt: new Date().toISOString(),
    customer: {name, email, phone, comment: document.querySelector("#customer-comment").value.trim()},
    delivery: {method: deliveryMethod, address: deliveryAddress.value.trim(), date: deliveryDate.value, time: deliveryTime.value},
    paymentMethod,
    currency: window.AuraPreferences.currency,
    items: entries.map(({productId, variant, quantity}) => ({id: productId, name: products[productId].name, variant, quantity, price: formattedPrice(products[productId].price)}))
  };

  let storedNote = tr("Заказ сохранён на этом устройстве.", "The order is saved on this device.", "Պատվերը պահպանվել է այս սարքում։");
  if (window.AuraTelegram?.active) {
    try {
      const created = await window.AuraTelegram.createOrder(order);
      orderId = created.id;
      order.id = created.id;
      storedNote = tr("Заказ сохранён в Aura Beauty и доступен в разделе «Мои заказы».", "The order is saved in Aura Beauty and is available under My orders.", "Պատվերը պահպանվել է Aura Beauty-ում և հասանելի է «Իմ պատվերները» բաժնում։");
    } catch {
      formError.textContent = tr("Не удалось сохранить заказ на сервере. Корзина не изменена — попробуйте ещё раз.", "The order could not be saved. Your cart is unchanged—please try again.", "Չհաջողվեց պահպանել պատվերը։ Զամբյուղը չի փոխվել, փորձեք կրկին։");
      return;
    }
  } else {
    localStorage.setItem(orderStorageKey, JSON.stringify(order));
  }
  cart = {};
  saveCart();
  checkoutForm.reset();
  updateDeliveryFields();
  updatePaymentFields();
  cartItems.hidden = true;
  cartCheckout.hidden = true;
  cartEmpty.hidden = true;
  orderSuccess.hidden = false;
  const contact = email || phone;
  const paymentNextStep = paymentMethod === "payment-link"
    ? tr("После подтверждения заказа защищённая ссылка на оплату будет отправлена на указанный контакт.", "After the order is confirmed, a secure payment link will be sent to your contact.", "Պատվերի հաստատումից հետո վճարման ապահով հղումը կուղարկվի նշված կապի միջոցով։")
    : tr("Магазин уточнит детали оплаты при подтверждении заказа.", "The store will confirm the payment details with your order.", "Խանութը պատվերը հաստատելիս կհստակեցնի վճարման մանրամասները։");
  orderSuccessText.textContent = tr(
    `Номер ${orderId}. Доставка: ${deliveryLabels[deliveryMethod]}. Способ оплаты: ${paymentLabels[paymentMethod]}. Контакт: ${contact}. ${paymentNextStep} ${storedNote}`,
    `Order ${orderId}. Delivery: ${deliveryLabels[deliveryMethod]}. Payment method: ${paymentLabels[paymentMethod]}. Contact: ${contact}. ${paymentNextStep} ${storedNote}`,
    `Պատվեր ${orderId}։ Առաքում՝ ${deliveryLabels[deliveryMethod]}։ Վճարման եղանակ՝ ${paymentLabels[paymentMethod]}։ Կապ՝ ${contact}։ ${paymentNextStep} ${storedNote}`
  );
});

function localizedLabel(value) {
  return typeof value === "string" ? value : value[window.AuraPreferences.lang];
}

function addConsultantMessage(text, type = "assistant") {
  const message = document.createElement("div");
  message.className = `consultant-message ${type}`;
  message.textContent = text;
  consultantChat.append(message);
  consultantChat.scrollTop = consultantChat.scrollHeight;
}

function showConsultantResults(recommendations, intro = tr("Подобрала два подходящих варианта. Откройте карточку, чтобы посмотреть состав, применение и цену.", "I found two suitable options. Open a card to see ingredients, directions and price.", "Ընտրեցի երկու հարմար տարբերակ։ Բացեք քարտը՝ բաղադրությունը, կիրառումը և գինը տեսնելու համար։")) {
  addConsultantMessage(intro);
  const resultList = document.createElement("div");
  resultList.className = "consultant-results";
  recommendations.forEach((recommendation) => {
    const item = typeof recommendation === "string" ? {id: recommendation} : recommendation;
    const {id, variant, reason} = item;
    const product = products[id];
    const locale = localProduct(id);
    const button = document.createElement("button");
    button.type = "button";
    button.className = "consultant-result";
    const variantLabel = variant ? ` · ${variant}` : "";
    const reasonLabel = reason ? `<em>${localizedLabel(reason)}</em>` : "";
    button.innerHTML = `<img src="${product.image}" alt=""><span><strong>${product.name}${variantLabel}</strong><small>${locale.brand} · ${formattedPrice(product.price)}</small>${reasonLabel}</span><span aria-hidden="true">→</span>`;
    button.addEventListener("click", () => {
      consultantDialog.close();
      openProduct(id, variant || null);
    });
    resultList.append(button);
  });
  consultantChat.append(resultList);
  consultantChat.scrollTop = consultantChat.scrollHeight;
}

function answerConsultantQuestion(question) {
  const text = question.toLocaleLowerCase();
  const asksForLips = /(помад|губ|lip|оттен|շրթ|երանգ)/.test(text);
  const asksForHair = /(волос|кож[аи] головы|шампун|hair|scalp|մազ|գլխամաշկ|շամպուն)/.test(text);
  const isLight = /(светл|бледн|fair|light|բաց)/.test(text);
  const isMedium = /(средн|оливк|medium|olive|միջին|ձիթապտղ)/.test(text);
  const isDeep = /(смугл|т[её]мн|deep|dark|մուգ|թուխ)/.test(text);

  if (asksForHair) {
    const isBrittle = /(ломк|секущ|сух|поврежд|brittle|split|dry|damag|փխրուն|չոր|վնասված|կոտր)/.test(text);
    showConsultantResults(
      isBrittle ? ["k18", "kerastase", "olaplex"] : ["olaplex", "k18", "kerastase"],
      isBrittle
        ? tr("Для ломких или повреждённых волос я выбрала восстанавливающие средства именно из раздела ухода за волосами:", "For brittle or damaged hair, I selected repair treatments specifically from the hair-care section:", "Փխրուն կամ վնասված մազերի համար ընտրեցի վերականգնող միջոցներ հենց մազերի խնամքի բաժնից․")
        : tr("Вот средства из раздела ухода за волосами. Откройте карточку, чтобы сравнить способ применения:", "Here are products from the hair-care section. Open a card to compare how each one is used:", "Ահա մազերի խնամքի բաժնի միջոցները։ Բացեք քարտը՝ կիրառման ձևերը համեմատելու համար․")
    );
    return;
  }

  if (asksForLips && isLight) {
    showConsultantResults([
      {id: "clinique", variant: "Pink Honey", reason: {ru: "мягкий прозрачный розовый для светлого тона кожи", en: "a soft sheer pink for fair skin", hy: "նուրբ թափանցիկ վարդագույն՝ բաց մաշկի համար"}},
      {id: "charlotte", variant: "Pillow Talk Original", reason: {ru: "спокойный нюдово-розовый для повседневного макияжа", en: "an easy nude pink for everyday wear", hy: "հանգիստ նյուդային վարդագույն՝ ամենօրյա դիմահարդարման համար"}}
    ], tr("Для светлой кожи я бы начала с мягких розовых оттенков. Они выглядят естественно и их легко наслаивать.", "For fair skin, I would start with soft pink shades. They look natural and are easy to build.", "Բաց մաշկի համար խորհուրդ կտամ նուրբ վարդագույն երանգներ․ դրանք բնական են երևում և հեշտ են շերտավորվում։"));
    return;
  }
  if (asksForLips && isMedium) {
    showConsultantResults([
      {id: "clinique", variant: "Nude Honey", reason: {ru: "тёплый прозрачный нюд", en: "a warm sheer nude", hy: "տաք, թափանցիկ նյուդ"}},
      {id: "charlotte", variant: "Pillow Talk Medium", reason: {ru: "выразительный тёплый розово-ягодный оттенок", en: "a richer warm berry pink", hy: "արտահայտիչ տաք վարդագույն-հատապտղային երանգ"}}
    ], tr("Для среднего или оливкового тона кожи подойдут более тёплые нюдовые и розово-ягодные оттенки.", "Medium or olive skin tones often suit warmer nudes and berry pinks.", "Միջին կամ ձիթապտղային մաշկի համար հարմար են ավելի տաք նյուդային և հատապտղային վարդագույն երանգները։"));
    return;
  }
  if (asksForLips && isDeep) {
    showConsultantResults([
      {id: "clinique", variant: "Black Honey", reason: {ru: "полупрозрачный ягодно-коричневый цвет", en: "a sheer berry-brown tint", hy: "թափանցիկ հատապտղային-շագանակագույն երանգ"}},
      {id: "charlotte", variant: "Walk of No Shame", reason: {ru: "глубокий ягодно-розовый оттенок", en: "a deep berry-pink shade", hy: "խորը հատապտղային վարդագույն երանգ"}}
    ], tr("Для смуглой или тёмной кожи предлагаю насыщенные ягодные оттенки, которые сохраняют глубину цвета.", "For deep skin tones, try richer berry shades that keep their depth.", "Թուխ կամ մուգ մաշկի համար առաջարկում եմ հագեցած հատապտղային երանգներ։"));
    return;
  }
  if (/(сух|обезвож|увлаж|dry|dehydrat|moistur|չոր|խոնավ)/.test(text)) {
    showConsultantResults(["laneige", "cosrx"], tr("Для сухости и обезвоженности начните с увлажняющей эссенции и ночной маски.", "For dryness or dehydration, start with a hydrating essence and an overnight mask.", "Չորության և ջրազրկման դեպքում սկսեք խոնավեցնող էսենցիայից և գիշերային դիմակից։"));
    return;
  }
  if (/(жирн|комбинир|пор|ниацинамид|oily|combination|pore|niacinamide|յուղոտ|կոմբինացված|ծակոտի)/.test(text)) {
    showConsultantResults(["ordinary", "cosrx"], tr("Для жирной или комбинированной кожи предлагаю лёгкие формулы без тяжёлого финиша.", "For oily or combination skin, try lightweight formulas without a heavy finish.", "Յուղոտ կամ կոմբինացված մաշկի համար առաջարկում եմ թեթև բանաձևեր՝ առանց ծանր վերջնարդյունքի։"));
    return;
  }
  if (/(чувств|раздраж|покрасн|sensitive|irritat|redness|զգայուն|գրգռ|կարմր)/.test(text)) {
    showConsultantResults(["cosrx", "laneige"], tr("Для чувствительной кожи выбирайте мягкое увлажнение и обязательно проверяйте новый продукт на небольшом участке.", "For sensitive skin, choose gentle hydration and always patch-test a new product.", "Զգայուն մաշկի համար ընտրեք նուրբ խոնավեցում և նոր միջոցը նախ փորձարկեք փոքր հատվածում։"));
    return;
  }
  if (/(сияни|блеск|glow|radiant|փայլ|շող)/.test(text)) {
    showConsultantResults(["lucin", "laneige"], tr("Для более свежего сияния предлагаю мягкое увлажнение и сыворотку. Наносите средства постепенно и используйте SPF днём.", "For a fresher glow, try gentle hydration and a serum. Introduce products gradually and wear SPF during the day.", "Թարմ փայլի համար առաջարկում եմ նուրբ խոնավեցում և շիճուկ։ Միջոցները ներմուծեք աստիճանաբար և ցերեկը օգտագործեք SPF։"));
    return;
  }
  if (/(румян|хайлайт|blush|highlight|կարմրաներկ|հայլայթ)/.test(text)) {
    showConsultantResults(["rare", "fenty"], tr("Для живого макияжа выбрала румяна и хайлайтер с наглядными вариантами оттенков.", "For a fresh makeup look, try this blush and highlighter with visible shade choices.", "Թարմ դիմահարդարման համար ընտրեցի կարմրաներկ և հայլայթեր՝ տեսանելի երանգներով։"));
    return;
  }
  if (/(кист|спонж|растуш|brush|sponge|blend|վրձին|սպունգ|տուշ)/.test(text)) {
    showConsultantResults(["beautyblender", "rareBrush"], tr("Для ровной растушёвки собрала спонж для тона и кисть для жидких или кремовых румян.", "For even blending, here is a base sponge and a brush for liquid or cream blush.", "Հավասար տարածման համար ընտրեցի տոնային սպունգ և հեղուկ կամ կրեմային կարմրաներկի վրձին։"));
    return;
  }
  if (asksForLips) {
    addConsultantMessage(tr("Чтобы точнее выбрать помаду, напишите, какой у вас тон кожи: светлый, средний/оливковый или смуглый/тёмный.", "To narrow down lipstick shades, tell me whether your skin tone is fair, medium/olive or deep.", "Շրթներկն ավելի ճշգրիտ ընտրելու համար նշեք մաշկի երանգը՝ բաց, միջին/ձիթապտղային կամ թուխ/մուգ։"));
    consultantQuestionInput.focus();
    return;
  }
  showConsultantResults(["ordinary", "rare"], tr("Я не хочу оставлять вопрос без ответа: начните с этих популярных вариантов. Для более точного совета напишите тип кожи, желаемый результат или оттенок.", "I do not want to leave your question unanswered, so start with these popular options. For a more precise suggestion, mention your skin type, desired result or shade.", "Չեմ ուզում հարցը թողնել անպատասխան․ սկսեք այս հայտնի տարբերակներից։ Ավելի ճշգրիտ խորհրդի համար նշեք մաշկի տեսակը, ցանկալի արդյունքը կամ երանգը։"));
}

function startConsultant() {
  consultantChat.replaceChildren();
  consultantQuestionInput.value = "";
  addConsultantMessage(tr("Здравствуйте! Напишите свой вопрос о коже, волосах, оттенке или способе нанесения — я отвечу и предложу подходящие товары, если они есть в каталоге.", "Hello! Ask about skin, hair, shades or application. I’ll answer and suggest suitable products when they are available in the catalog.", "Բարև՛։ Գրեք մաշկի, մազերի, երանգի կամ կիրառման մասին ձեր հարցը։ Կպատասխանեմ և կառաջարկեմ հարմար ապրանքներ, եթե դրանք կան կատալոգում։"));
  window.setTimeout(() => consultantQuestionInput.focus(), 0);
}

const consultantWidgetStorageKey = "auraBeautyConsultantWidget";
let consultantWasDragged = false;
let consultantWidgetState = { scale: 1, x: null, y: null };

try {
  const savedWidgetState = JSON.parse(localStorage.getItem(consultantWidgetStorageKey));
  if (savedWidgetState && Number.isFinite(savedWidgetState.scale)) {
    consultantWidgetState = {
      scale: Math.min(1.3, Math.max(.7, savedWidgetState.scale)),
      x: Number.isFinite(savedWidgetState.x) ? savedWidgetState.x : null,
      y: Number.isFinite(savedWidgetState.y) ? savedWidgetState.y : null
    };
  }
} catch {}

function saveConsultantWidgetState() {
  localStorage.setItem(consultantWidgetStorageKey, JSON.stringify(consultantWidgetState));
}

function clampConsultantPosition(x, y) {
  const rect = consultantWidget.getBoundingClientRect();
  return {
    x: Math.min(Math.max(0, x), Math.max(0, window.innerWidth - rect.width)),
    y: Math.min(Math.max(0, y), Math.max(0, window.innerHeight - rect.height))
  };
}

function applyConsultantWidgetState() {
  consultantWidget.style.setProperty("--consultant-scale", consultantWidgetState.scale);
  if (Number.isFinite(consultantWidgetState.x) && Number.isFinite(consultantWidgetState.y)) {
    consultantWidget.style.right = "auto";
    consultantWidget.style.bottom = "auto";
    const position = clampConsultantPosition(consultantWidgetState.x, consultantWidgetState.y);
    consultantWidgetState.x = position.x;
    consultantWidgetState.y = position.y;
    consultantWidget.style.left = `${position.x}px`;
    consultantWidget.style.top = `${position.y}px`;
  }
}

function changeConsultantScale(delta) {
  const oldRect = consultantWidget.getBoundingClientRect();
  const nextScale = Math.round(Math.min(1.3, Math.max(.7, consultantWidgetState.scale + delta)) * 10) / 10;
  if (nextScale === consultantWidgetState.scale) return;
  consultantWidgetState.scale = nextScale;
  consultantWidget.style.setProperty("--consultant-scale", nextScale);
  if (Number.isFinite(consultantWidgetState.x) && Number.isFinite(consultantWidgetState.y)) {
    const newRect = consultantWidget.getBoundingClientRect();
    const position = clampConsultantPosition(oldRect.left - (newRect.width - oldRect.width) / 2, oldRect.top - (newRect.height - oldRect.height) / 2);
    consultantWidgetState.x = position.x;
    consultantWidgetState.y = position.y;
    consultantWidget.style.left = `${position.x}px`;
    consultantWidget.style.top = `${position.y}px`;
  }
  saveConsultantWidgetState();
}

consultantSmaller.addEventListener("click", () => changeConsultantScale(-.1));
consultantLarger.addEventListener("click", () => changeConsultantScale(.1));
consultantReset.addEventListener("click", () => {
  consultantWidgetState = { scale: 1, x: null, y: null };
  consultantWidget.style.removeProperty("--consultant-scale");
  consultantWidget.style.removeProperty("left");
  consultantWidget.style.removeProperty("top");
  consultantWidget.style.removeProperty("right");
  consultantWidget.style.removeProperty("bottom");
  saveConsultantWidgetState();
});

consultantMini.addEventListener("pointerdown", (event) => {
  if (event.button !== undefined && event.button !== 0) return;
  const startRect = consultantWidget.getBoundingClientRect();
  const startX = event.clientX;
  const startY = event.clientY;
  let moved = false;
  consultantMini.setPointerCapture(event.pointerId);

  const move = (moveEvent) => {
    const deltaX = moveEvent.clientX - startX;
    const deltaY = moveEvent.clientY - startY;
    if (!moved && Math.hypot(deltaX, deltaY) < 5) return;
    moved = true;
    consultantWasDragged = true;
    consultantWidget.classList.add("is-dragging");
    consultantWidget.style.right = "auto";
    consultantWidget.style.bottom = "auto";
    const position = clampConsultantPosition(startRect.left + deltaX, startRect.top + deltaY);
    consultantWidgetState.x = position.x;
    consultantWidgetState.y = position.y;
    consultantWidget.style.left = `${position.x}px`;
    consultantWidget.style.top = `${position.y}px`;
  };

  const end = () => {
    consultantMini.removeEventListener("pointermove", move);
    consultantMini.removeEventListener("pointerup", end);
    consultantMini.removeEventListener("pointercancel", end);
    consultantWidget.classList.remove("is-dragging");
    if (moved) saveConsultantWidgetState();
    window.setTimeout(() => { consultantWasDragged = false; }, 0);
  };

  consultantMini.addEventListener("pointermove", move);
  consultantMini.addEventListener("pointerup", end);
  consultantMini.addEventListener("pointercancel", end);
});

window.addEventListener("resize", () => {
  if (!Number.isFinite(consultantWidgetState.x) || !Number.isFinite(consultantWidgetState.y)) return;
  const position = clampConsultantPosition(consultantWidgetState.x, consultantWidgetState.y);
  consultantWidgetState.x = position.x;
  consultantWidgetState.y = position.y;
  consultantWidget.style.left = `${position.x}px`;
  consultantWidget.style.top = `${position.y}px`;
  saveConsultantWidgetState();
});

applyConsultantWidgetState();

consultantLauncher.addEventListener("click", (event) => {
  if (consultantWasDragged) {
    event.preventDefault();
    return;
  }
  startConsultant();
  consultantDialog.showModal();
});
consultantQuestionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const question = consultantQuestionInput.value.trim();
  if (!question) return;
  addConsultantMessage(question, "user");
  consultantQuestionInput.value = "";
  answerConsultantQuestion(question);
});
document.querySelectorAll("[data-close-consultant]").forEach((button) => button.addEventListener("click", () => consultantDialog.close()));
consultantDialog.addEventListener("click", (event) => {
  if (event.target === consultantDialog) consultantDialog.close();
});

document.addEventListener("aura:preferences", () => {
  renderCatalog();
  updateCartCount();
  renderCart();
  if (productDialog.open && activeProductId) openProduct(activeProductId, activeVariant);
  if (consultantDialog.open) startConsultant();
});

renderCatalog();
updateCartCount();
updateDeliveryFields();
updatePaymentFields();
renderCart();
