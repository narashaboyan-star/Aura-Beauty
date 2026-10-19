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
  beautyblender: {
    ru: {brand: "Beautyblender • Спонж", note: "Многоразовый спонж для тона и консилера", description: "Мягкий многоразовый спонж без латекса для равномерной растушёвки тонального средства, консилера и кремовых продуктов.", facts: [["Материал", "Мягкая пена без латекса"], ["Подходит", "Для жидких, кремовых и пудровых текстур"], ["Применение", "Намочить, хорошо отжать и наносить похлопывающими движениями"], ["Уход", "Очищать после использования и сушить на воздухе"]], ingredients: "Это инструмент, а не косметическая формула: спонж изготовлен из пенополиуретана без латекса с водорастворимыми красителями. Регулярно мойте и заменяйте при повреждении."},
    en: {brand: "Beautyblender • Sponge", note: "Reusable sponge for foundation and concealer", description: "A soft, reusable latex-free sponge for even blending of foundation, concealer and cream products.", facts: [["Material", "Soft latex-free foam"], ["Suitable for", "Liquid, cream and powder textures"], ["How to use", "Wet, squeeze well and bounce product onto skin"], ["Care", "Clean after use and air-dry"]], ingredients: "This is a tool, not a cosmetic formula: the sponge is made from latex-free polyurethane foam with water-soluble dyes. Wash regularly and replace if damaged."}
  },
  rareBrush: {
    ru: {brand: "Rare Beauty • Кисть", note: "Мягкая скошенная кисть для жидких и кремовых румян", description: "Мягкая скошенная кисть, которая помогает аккуратно растушевать пигментированные жидкие и кремовые румяна.", facts: [["Ворс", "Синтетический, разной длины"], ["Форма", "Скошенная, повторяет контуры щёк"], ["Подходит", "Для жидких и кремовых формул"], ["Применение", "Растушёвывать лёгкими вбивающими и круговыми движениями"]], ingredients: "Это инструмент: мягкий синтетический ворс разной длины, металлический обжим и ручка. Мойте мягким средством и сушите горизонтально."},
    en: {brand: "Rare Beauty • Brush", note: "Soft angled brush for liquid and cream blush", description: "A soft angled brush designed to blend pigmented liquid and cream blush with control.", facts: [["Bristles", "Synthetic, mixed length"], ["Shape", "Angled to follow cheek contours"], ["Suitable for", "Liquid and cream formulas"], ["How to use", "Blend with light tapping or circular motions"]], ingredients: "This is a tool: soft mixed-length synthetic bristles, a metal ferrule and a handle. Wash with a gentle cleanser and dry flat."}
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
const consultantLauncher = document.querySelector("#consultant-launcher");
const consultantDialog = document.querySelector("#consultant-dialog");
const consultantChat = document.querySelector("#consultant-chat");
const consultantOptions = document.querySelector("#consultant-options");
const consultantRestart = document.querySelector("#consultant-restart");
const consultantQuestionForm = document.querySelector("#consultant-question-form");
const consultantQuestionInput = document.querySelector("#consultant-question-input");
const productIngredients = document.querySelector("#dialog-product-ingredients");

function tr(ru, en) {
  return window.AuraPreferences.text(ru, en);
}

function localProduct(productId) {
  return productLocales[productId][window.AuraPreferences.lang];
}

function formattedPrice(value) {
  return window.AuraPreferences.formatPrice(value);
}

function shadeNote(shade) {
  if (window.AuraPreferences.lang === "ru") return shade.note || "";
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
  cartButton.setAttribute("aria-label", tr(`Корзина: ${count} товаров`, `Cart: ${count} items`));
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
      <div class="cart-item-copy"><strong>${product.name}</strong><small>${locale.brand}${variant ? `<br>${tr("Оттенок", "Shade")}: ${variant}` : ""}</small><span>${formattedPrice(product.price)}</span></div>
      <div class="quantity-control" aria-label="${tr("Количество", "Quantity")} ${product.name}${variant ? `, ${tr("оттенок", "shade")} ${variant}` : ""}">
        <button type="button" data-cart-action="decrease" data-cart-key="${key}" aria-label="${tr("Уменьшить количество", "Decrease quantity")}">−</button>
        <span>${quantity}</span>
        <button type="button" data-cart-action="increase" data-cart-key="${key}" aria-label="${tr("Увеличить количество", "Increase quantity")}">+</button>
      </div>`;
    cartItems.append(row);
  });

  const total = entries.reduce((sum, {productId, quantity}) => sum + products[productId].price * quantity, 0);

  cartTotals.replaceChildren();
  if (total) cartTotals.append(createTotal(tr("Итого", "Total"), formattedPrice(total)));
}

function createTotal(label, value) {
  const row = document.createElement("div");
  row.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
  return row;
}

function renderShadeOptions(product, preferredVariant = null) {
  const selectable = product.variants || [];
  const displayOnly = product.displayShades || [];
  const shades = selectable.length ? selectable : displayOnly;
  shadeOptions.replaceChildren();
  shadeArea.hidden = shades.length === 0;
  if (!shades.length) return;

  shadeTitle.textContent = selectable.length ? tr("Выберите оттенок", "Choose a shade") : tr("Цвета палетки", "Palette shades");
  shadeOptions.setAttribute("role", selectable.length ? "radiogroup" : "list");
  const preferredIndex = selectable.findIndex((shade) => shade.name === preferredVariant);
  const selectedIndex = preferredIndex >= 0 ? preferredIndex : 0;
  activeVariant = selectable.length ? selectable[selectedIndex].name : null;
  selectedShade.textContent = selectable.length ? `${selectable[selectedIndex].name} — ${shadeNote(selectable[selectedIndex])}` : tr("12 настоящих оттенков", "12 authentic shades");

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
  const image = document.querySelector("#dialog-product-image");
  image.src = product.image;
  image.alt = `${locale.brand} ${product.name}`;
  document.querySelector("#dialog-product-brand").textContent = locale.brand;
  document.querySelector("#product-dialog-title").textContent = product.name;
  document.querySelector("#dialog-product-description").textContent = locale.description;
  document.querySelector("#dialog-product-price").textContent = formattedPrice(product.price);
  productIngredients.textContent = locale.ingredients;
  dialogAddButton.disabled = !Number.isFinite(product.price);
  dialogAddButton.textContent = Number.isFinite(product.price) ? tr("Добавить в корзину", "Add to cart") : tr("Сначала уточним цену", "Ask for the price first");
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
  document.title = tr("Товары — Aura Beauty", "Products — Aura Beauty");
  document.querySelectorAll(".product-card").forEach((card) => {
    const productId = card.dataset.productId;
    const product = products[productId];
    const locale = localProduct(productId);
    card.querySelector(".product-kind").textContent = locale.brand;
    card.querySelector(".product-note").textContent = locale.note;
    card.querySelector(".price").textContent = formattedPrice(product.price);
    card.setAttribute("aria-label", tr(`Подробнее о ${product.name}`, `View details for ${product.name}`));
    card.querySelector('[data-action="details"]').textContent = tr("Подробнее", "Details");
    const purchase = card.querySelector('[data-action="add"], [data-action="choose"]');
    if (purchase.dataset.action === "add") purchase.textContent = tr("В корзину", "Add to cart");
    else if (productId === "clinique") purchase.textContent = tr("Посмотреть оттенки", "View shades");
    else if (productId === "nars") purchase.textContent = tr("Посмотреть тона", "View shades");
    else purchase.textContent = tr("Выбрать оттенок", "Choose shade");
  });
}

document.querySelectorAll(".product-card").forEach((card) => {
  card.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]");
    if (action?.dataset.action === "add") {
      event.stopPropagation();
      addToCart(card.dataset.productId, null);
      const original = action.textContent;
      action.textContent = tr("Добавлено ✓", "Added ✓");
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
    formError.textContent = tr("Укажите имя.", "Enter your name.");
    document.querySelector("#customer-name").focus();
    return;
  }
  if (!email && !phone) {
    formError.textContent = tr("Укажите email или номер телефона.", "Enter an email address or phone number.");
    emailInput.focus();
    return;
  }
  if (email && !emailInput.validity.valid) {
    formError.textContent = tr("Проверьте адрес электронной почты.", "Check the email address.");
    emailInput.focus();
    return;
  }

  const entries = getCartEntries();
  const orderId = `AB-${Date.now().toString().slice(-8)}`;
  const order = {
    id: orderId,
    createdAt: new Date().toISOString(),
    customer: {name, email, phone, comment: document.querySelector("#customer-comment").value.trim()},
    currency: window.AuraPreferences.currency,
    items: entries.map(({productId, variant, quantity}) => ({id: productId, name: products[productId].name, variant, quantity, price: formattedPrice(products[productId].price)}))
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
  orderSuccessText.textContent = tr(
    `Номер ${orderId}. Контакт для подтверждения: ${contact}. Заказ сохранён на этом устройстве; автоматическая отправка будет подключена следующим этапом.`,
    `Order ${orderId}. Confirmation contact: ${contact}. The order is saved on this device; automatic delivery will be connected in a later step.`
  );
});

const consultantFlows = {
  skincare: {
    question: {ru: "Как бы вы описали кожу сейчас?", en: "How would you describe your skin right now?"},
    options: [
      {label: {ru: "Сухая или обезвоженная", en: "Dry or dehydrated"}, ids: ["laneige", "cosrx"]},
      {label: {ru: "Жирная или комбинированная", en: "Oily or combination"}, ids: ["ordinary", "cosrx"]},
      {label: {ru: "Тусклая, хочется сияния", en: "Dull, needs radiance"}, ids: ["lucin", "laneige"]},
      {label: {ru: "Чувствительная", en: "Sensitive"}, ids: ["cosrx", "laneige"]}
    ]
  },
  makeup: {
    question: {ru: "Что хотите подобрать для макияжа?", en: "What would you like for your makeup routine?"},
    options: [
      {label: {ru: "Румяна", en: "Blush"}, ids: ["rare", "rareBrush"]},
      {label: {ru: "Сияние", en: "Glow"}, ids: ["fenty", "beautyblender"]},
      {label: {ru: "Губы", en: "Lips"}, ids: ["clinique", "charlotte"]},
      {label: {ru: "Тон и консилер", en: "Base and concealer"}, ids: ["nars", "beautyblender"]},
      {label: {ru: "Тени", en: "Eyeshadow"}, ids: ["urban", "rareBrush"]}
    ]
  },
  tools: {
    question: {ru: "Какой инструмент нужен?", en: "Which tool do you need?"},
    options: [
      {label: {ru: "Для тона и консилера", en: "For foundation and concealer"}, ids: ["beautyblender", "nars"]},
      {label: {ru: "Для румян", en: "For blush"}, ids: ["rareBrush", "rare"]}
    ]
  }
};

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

function showConsultantOptions(options, onSelect) {
  consultantOptions.replaceChildren();
  options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = localizedLabel(option.label);
    button.addEventListener("click", () => onSelect(option));
    consultantOptions.append(button);
  });
}

function showConsultantResults(recommendations, intro = tr("Подобрала два подходящих варианта. Откройте карточку, чтобы посмотреть состав, применение и цену.", "I found two suitable options. Open a card to see ingredients, directions and price.")) {
  consultantOptions.replaceChildren();
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
  consultantRestart.hidden = false;
  consultantChat.scrollTop = consultantChat.scrollHeight;
}

function answerConsultantQuestion(question) {
  const text = question.toLocaleLowerCase();
  const asksForLips = /(помад|губ|lip|оттен)/.test(text);
  const isLight = /(светл|бледн|fair|light)/.test(text);
  const isMedium = /(средн|оливк|medium|olive)/.test(text);
  const isDeep = /(смугл|т[её]мн|deep|dark)/.test(text);

  if (asksForLips && isLight) {
    showConsultantResults([
      {id: "clinique", variant: "Pink Honey", reason: {ru: "мягкий прозрачный розовый для светлого тона кожи", en: "a soft sheer pink for fair skin"}},
      {id: "charlotte", variant: "Pillow Talk Original", reason: {ru: "спокойный нюдово-розовый для повседневного макияжа", en: "an easy nude pink for everyday wear"}}
    ], tr("Для светлой кожи я бы начала с мягких розовых оттенков. Они выглядят естественно и их легко наслаивать.", "For fair skin, I would start with soft pink shades. They look natural and are easy to build."));
    return;
  }
  if (asksForLips && isMedium) {
    showConsultantResults([
      {id: "clinique", variant: "Nude Honey", reason: {ru: "тёплый прозрачный нюд", en: "a warm sheer nude"}},
      {id: "charlotte", variant: "Pillow Talk Medium", reason: {ru: "выразительный тёплый розово-ягодный оттенок", en: "a richer warm berry pink"}}
    ], tr("Для среднего или оливкового тона кожи подойдут более тёплые нюдовые и розово-ягодные оттенки.", "Medium or olive skin tones often suit warmer nudes and berry pinks."));
    return;
  }
  if (asksForLips && isDeep) {
    showConsultantResults([
      {id: "clinique", variant: "Black Honey", reason: {ru: "полупрозрачный ягодно-коричневый цвет", en: "a sheer berry-brown tint"}},
      {id: "charlotte", variant: "Walk of No Shame", reason: {ru: "глубокий ягодно-розовый оттенок", en: "a deep berry-pink shade"}}
    ], tr("Для смуглой или тёмной кожи предлагаю насыщенные ягодные оттенки, которые сохраняют глубину цвета.", "For deep skin tones, try richer berry shades that keep their depth."));
    return;
  }
  if (/(сух|обезвож|увлаж|dry|dehydrat|moistur)/.test(text)) {
    showConsultantResults(["laneige", "cosrx"], tr("Для сухости и обезвоженности начните с увлажняющей эссенции и ночной маски.", "For dryness or dehydration, start with a hydrating essence and an overnight mask."));
    return;
  }
  if (/(жирн|комбинир|пор|ниацинамид|oily|combination|pore|niacinamide)/.test(text)) {
    showConsultantResults(["ordinary", "cosrx"], tr("Для жирной или комбинированной кожи предлагаю лёгкие формулы без тяжёлого финиша.", "For oily or combination skin, try lightweight formulas without a heavy finish."));
    return;
  }
  if (/(чувств|раздраж|покрасн|sensitive|irritat|redness)/.test(text)) {
    showConsultantResults(["cosrx", "laneige"], tr("Для чувствительной кожи выбирайте мягкое увлажнение и обязательно проверяйте новый продукт на небольшом участке.", "For sensitive skin, choose gentle hydration and always patch-test a new product."));
    return;
  }
  if (/(кист|спонж|растуш|brush|sponge|blend)/.test(text)) {
    showConsultantResults(["beautyblender", "rareBrush"], tr("Для ровной растушёвки собрала спонж для тона и кисть для жидких или кремовых румян.", "For even blending, here is a base sponge and a brush for liquid or cream blush."));
    return;
  }
  if (asksForLips) {
    addConsultantMessage(tr("Чтобы точнее выбрать помаду, напишите, какой у вас тон кожи: светлый, средний/оливковый или смуглый/тёмный.", "To narrow down lipstick shades, tell me whether your skin tone is fair, medium/olive or deep."));
    consultantOptions.replaceChildren();
    consultantQuestionInput.focus();
    return;
  }
  addConsultantMessage(tr("Я лучше всего отвечаю на вопросы о типе кожи, уходе, оттенках помады, кистях и спонжах. Например: «У меня светлая кожа — какая помада подойдёт?»", "I can help with skin types, skincare, lipstick shades, brushes and sponges. For example: “I have fair skin—which lipstick shade suits me?”"));
  consultantOptions.replaceChildren();
  consultantQuestionInput.focus();
}

function startConsultant() {
  consultantChat.replaceChildren();
  consultantRestart.hidden = true;
  consultantQuestionInput.value = "";
  addConsultantMessage(tr("Здравствуйте! Я помогу собрать понятный набор из товаров Aura Beauty. Что вы хотите подобрать?", "Hello! I can help you build a simple Aura Beauty routine. What are you looking for?"));
  showConsultantOptions([
    {label: {ru: "Уход за кожей", en: "Skincare"}, flow: "skincare"},
    {label: {ru: "Макияж", en: "Makeup"}, flow: "makeup"},
    {label: {ru: "Кисти и спонжи", en: "Brushes and sponges"}, flow: "tools"}
  ], (choice) => {
    addConsultantMessage(localizedLabel(choice.label), "user");
    const flow = consultantFlows[choice.flow];
    addConsultantMessage(localizedLabel(flow.question));
    showConsultantOptions(flow.options, (answer) => {
      addConsultantMessage(localizedLabel(answer.label), "user");
      showConsultantResults(answer.ids);
    });
  });
}

consultantLauncher.addEventListener("click", () => {
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
consultantRestart.addEventListener("click", startConsultant);
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
renderCart();
