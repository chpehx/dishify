// =========================================================================
// Dishify — AI Menu Studio (Static Web App for GitHub Pages)
// =========================================================================

const COURSE_META = {
  salads: { ru: "Салаты",              kz: "Салаттар",                 en: "Salads" },
  snacks: { ru: "Закуски и хлеб",      kz: "Тіскебасарлар мен нан",    en: "Starters & Bread" },
  soups:  { ru: "Супы",                kz: "Сорпалар",                 en: "Soups" },
  mains:  { ru: "Горячие блюда",       kz: "Ыстық тағамдар",           en: "Main Courses" },
  bakery: { ru: "Пицца и выпечка",     kz: "Пицца және нан өнімдері",  en: "Pizza & Bakery" },
  drinks: { ru: "Десерты и напитки",   kz: "Десерттер мен сусындар",   en: "Desserts & Drinks" }
};

const CUISINE_META = {
  italian:   { ru: "Итальянская кухня",       kz: "Италиян асханасы",         en: "Italian Cuisine" },
  snacks:    { ru: "Закуски и гарниры",       kz: "Тіскебасарлар",            en: "Snacks & Sides" },
  kazakh:    { ru: "Казахская кухня",         kz: "Қазақ тағамдары",          en: "Kazakh Cuisine" },
  uyghur:    { ru: "Уйгурская кухня",         kz: "Ұйғыр тағамдары",          en: "Uyghur Cuisine" },
  uzbek:     { ru: "Узбекская кухня",         kz: "Өзбек тағамдары",          en: "Uzbek Cuisine" },
  dungan:    { ru: "Дунганская кухня",        kz: "Дүнген тағамдары",         en: "Dungan Cuisine" },
  korean:    { ru: "Корейская (корё-сарам)",  kz: "Корей тағамдары",          en: "Korean (Koryo-saram)" },
  caucasian: { ru: "Кавказская кухня",        kz: "Кавказ тағамдары",         en: "Caucasian Cuisine" },
  turkish:   { ru: "Турецкая кухня",          kz: "Түрік тағамдары",          en: "Turkish Cuisine" },
  european:  { ru: "Европейская и домашняя",  kz: "Еуропалық тағамдар",       en: "European & Home Style" },
  asian:     { ru: "Паназиатская и Японская", kz: "Азия және жапон асханасы", en: "Pan-Asian & Japanese" },
  street:    { ru: "Алматинский стритфуд",    kz: "Алматы стритфуды",         en: "Almaty Street Food" },
  drinks:    { ru: "Напитки и десерты",       kz: "Сусындар мен десерттер",   en: "Drinks & Desserts" }
};

// High-res CORS-friendly Unsplash food images
const IMAGE_POOL = {
  pizza:     "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&h=300&fit=crop&auto=format",
  pepperoni: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=300&fit=crop&auto=format",
  pasta:     "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=300&h=300&fit=crop&auto=format",
  salad:     "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop&auto=format",
  caesar:    "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300&h=300&fit=crop&auto=format",
  fries:     "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300&h=300&fit=crop&auto=format",
  bread:     "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop&auto=format",
  bruschetta:"https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=300&h=300&fit=crop&auto=format",
  soup:      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=300&h=300&fit=crop&auto=format",
  ramen:     "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=300&h=300&fit=crop&auto=format",
  plov:      "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=300&h=300&fit=crop&auto=format",
  meat:      "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop&auto=format",
  kebab:     "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=300&fit=crop&auto=format",
  dumplings: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=300&h=300&fit=crop&auto=format",
  sushi:     "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=300&fit=crop&auto=format",
  noodles:   "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&h=300&fit=crop&auto=format",
  coffee:    "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=300&fit=crop&auto=format",
  lemonade:  "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300&h=300&fit=crop&auto=format",
  dessert:   "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=300&fit=crop&auto=format"
};

const DISH_CATALOG = [
  // Итальянская кухня
  {
    id: "it1", cuisine: "italian", course: "bakery", selected: true, price: 3400, img: "pizza",
    kbju: "640 ккал • Б 26г / Ж 24г / У 78г",
    ru: { name: "Пицца Маргарита", desc: "Классика из дровяной печи: соус из томатов Сан-Марцано, моцарелла и свежий базилик." },
    kz: { name: "Маргарита пиццасы", desc: "Тас пештен шыққан классика: томат тұздығы, моцарелла ірімшігі және райхан." },
    en: { name: "Pizza Margherita", desc: "Wood-fired thin crust with San Marzano tomato sauce, fresh mozzarella, and basil." }
  },
  {
    id: "it2", cuisine: "italian", course: "bakery", selected: false, price: 3900, img: "pepperoni",
    kbju: "720 ккал • Б 30г / Ж 32г / У 76г",
    ru: { name: "Пицца Пепперони", desc: "Хрустящее тесто, пикантная салями пепперони, тягучая моцарелла и орегано." },
    kz: { name: "Пепперони пиццасы", desc: "Қытырлақ қамыр, ащы пепперони шұжығы және моцарелла ірімшігі." },
    en: { name: "Pepperoni Pizza", desc: "Crispy crust topped with spicy pepperoni salami, melted mozzarella, and oregano." }
  },
  {
    id: "it3", cuisine: "italian", course: "bakery", selected: false, price: 4100, img: "pizza",
    kbju: "760 ккал • Б 32г / Ж 38г / У 72г",
    ru: { name: "Пицца Четыре сыра (Quattro Formaggi)", desc: "Моцарелла, горгонзола, выдержанный пармезан и эмменталь на сливочной основе." },
    kz: { name: "Төрт ірімшік пиццасы", desc: "Моцарелла, горгонзола, пармезан және эмменталь кілегейлі негізде." },
    en: { name: "Quattro Formaggi Pizza", desc: "Rich white-sauce pizza with mozzarella, gorgonzola, aged parmesan, and emmental." }
  },
  {
    id: "it4", cuisine: "italian", course: "mains", selected: true, price: 3600, img: "pasta",
    kbju: "590 ккал • Б 24г / Ж 28г / У 60г",
    ru: { name: "Паста Карбонара", desc: "Спагетти аль денте с хрустящей говяжьей грудинкой, желтком, перцем и пармезаном." },
    kz: { name: "Карбонара пастасы", desc: "Аль денте спагетти, қытырлақ төс еті, жұмыртқа сарысы және пармезан." },
    en: { name: "Spaghetti Carbonara", desc: "Al dente spaghetti tossed with crispy cured beef, egg yolk cream, and parmesan." }
  },
  {
    id: "it5", cuisine: "italian", course: "mains", selected: false, price: 3500, img: "pasta",
    kbju: "560 ккал • Б 26г / Ж 22г / У 62г",
    ru: { name: "Паста Болоньезе", desc: "Томлёное мясное рагу в томатном соусе с травами и свежей пастой тальятелле." },
    kz: { name: "Болоньезе пастасы", desc: "Томат тұздығында бұқтырылған ет рагуы мен балғын паста." },
    en: { name: "Tagliatelle Bolognese", desc: "Slow-simmered beef and tomato ragu served over fresh tagliatelle ribbons." }
  },
  {
    id: "it6", cuisine: "italian", course: "salads", selected: true, price: 3300, img: "salad",
    kbju: "320 ккал • Б 16г / Ж 24г / У 10г",
    ru: { name: "Салат с бурратой и томатами", desc: "Нежный сливочный сыр буррата со сладкими томатами черри, рукколой и соусом песто." },
    kz: { name: "Буррата мен қызанақ салаты", desc: "Кілегейлі буррата ірімшігі, тәтті черри қызанағы және песто тұздығы." },
    en: { name: "Burrata & Heirloom Tomato Salad", desc: "Creamy burrata cheese with sweet cherry tomatoes, arugula, and basil pesto." }
  },
  {
    id: "it7", cuisine: "italian", course: "drinks", selected: true, price: 2400, img: "dessert",
    kbju: "380 ккал • Б 7г / Ж 24г / У 34г",
    ru: { name: "Тирамису классический", desc: "Воздушный крем маскарпоне, бисквит савоярди, пропитанный эспрессо, и какао." },
    kz: { name: "Дәстүрлі Тирамису", desc: "Маскарпоне кремі, эспрессоға малынған савоярди және какао." },
    en: { name: "Classic Tiramisu", desc: "Velvety mascarpone cream layered with espresso-soaked ladyfingers and cocoa." }
  },

  // Закуски, хлеб и гарниры
  {
    id: "sn1", cuisine: "snacks", course: "snacks", selected: true, price: 1200, img: "fries",
    kbju: "360 ккал • Б 4г / Ж 17г / У 46г",
    ru: { name: "Картофель фри хрустящий", desc: "Золотистая соломка фри с морской солью, подаётся с кетчупом и сырным соусом." },
    kz: { name: "Қытырлақ фри картобы", desc: "Теңіз тұзы себілген алтын фри картобы, кетчуп және ірімшік тұздығымен." },
    en: { name: "Crispy French Fries", desc: "Golden sea-salted shoestring fries served with ketchup and warm cheese dip." }
  },
  {
    id: "sn2", cuisine: "snacks", course: "snacks", selected: false, price: 1650, img: "fries",
    kbju: "340 ккал • Б 3г / Ж 15г / У 48г",
    ru: { name: "Батат фри с трюфельным айоли", desc: "Сладкий хрустящий батат с ароматным трюфельным соусом и тёртым пармезаном." },
    kz: { name: "Трюфель айолиімен батат фри", desc: "Пармезан және трюфель тұздығымен қытырлақ тәтті батат." },
    en: { name: "Sweet Potato Fries", desc: "Crispy sweet potato fries dusted with parmesan and served with truffle aioli." }
  },
  {
    id: "sn3", cuisine: "snacks", course: "snacks", selected: true, price: 1100, img: "bread",
    kbju: "290 ккал • Б 8г / Ж 10г / У 42г",
    ru: { name: "Хлебная корзина и чесночное масло", desc: "Тёплая чиабатта, итальянская фокачча с розмарином и взбитое сливочно-чесночное масло." },
    kz: { name: "Нан себеті мен сарымсақ майы", desc: "Жылы чиабатта, фокачча және сарымсақты сары май." },
    en: { name: "Artisan Bread Basket", desc: "Warm rosemary focaccia and crusty ciabatta served with whipped garlic butter." }
  },
  {
    id: "sn4", cuisine: "snacks", course: "snacks", selected: false, price: 1950, img: "bruschetta",
    kbju: "280 ккал • Б 7г / Ж 12г / У 35г",
    ru: { name: "Брускетты с томатами и базиликом (3 шт)", desc: "Подсушенный багет с рублеными томатами, оливковым маслом, чесноком и бальзамиком." },
    kz: { name: "Қызанақ пен райхан қосылған брускетта", desc: "Зәйтүн майы мен қызанақ қосылған қытырлақ багет." },
    en: { name: "Tomato & Basil Bruschetta (3 pcs)", desc: "Toasted rustic bread topped with marinated diced tomatoes, garlic, and basil." }
  },
  {
    id: "sn5", cuisine: "snacks", course: "snacks", selected: false, price: 1850, img: "fries",
    kbju: "410 ккал • Б 18г / Ж 24г / У 30г",
    ru: { name: "Сырные палочки Моцарелла", desc: "Тянущийся сыр моцарелла в хрустящей панировке с брусничным или ягодным соусом." },
    kz: { name: "Моцарелла ірімшік таяқшалары", desc: "Қытырлақ қабықтағы еріген моцарелла, жидек тұздығымен." },
    en: { name: "Mozzarella Cheese Sticks", desc: "Golden breaded mozzarella sticks served with sweet-tart berry dipping sauce." }
  },

  // Казахская кухня
  {
    id: "kz1", cuisine: "kazakh", course: "mains", selected: true, price: 4500, img: "meat",
    kbju: "580 ккал • Б 32г / Ж 28г / У 48г",
    ru: { name: "Бешбармак (Ет)", desc: "Отварная конина и казы на тонком тесте жайма с луковым туздыком и пиалой сорпы." },
    kz: { name: "Дәстүрлі бесбармақ", desc: "Қазы мен жылқы еті, үй жаймасы, тұздық және ыстық сорпамен." },
    en: { name: "Classic Beshbarmak", desc: "Boiled horse meat & kazy over hand-rolled pasta sheets with onion tuzdyk and broth." }
  },
  {
    id: "kz2", cuisine: "kazakh", course: "salads", selected: false, price: 3200, img: "meat",
    kbju: "440 ккал • Б 24г / Ж 36г / У 2г",
    ru: { name: "Казы, карта и шужук (холодная нарезка)", desc: "Национальные деликатесы из конины в нарезке со свежей зеленью." },
    kz: { name: "Қазы, қарта және шұжық", desc: "Жылқы етінен жасалған ұлттық деликатестер жиынтығы." },
    en: { name: "Kazy, Karta & Shuzhuk Platter", desc: "Traditional cured horse meat delicacies served sliced as a cold starter." }
  },
  {
    id: "kz3", cuisine: "kazakh", course: "mains", selected: false, price: 3400, img: "meat",
    kbju: "490 ккал • Б 26г / Ж 30г / У 28г",
    ru: { name: "Куырдак по-домашнему", desc: "Обжаренные в казане нежные субпродукты и мякоть баранины с картофелем и луком." },
    kz: { name: "Үй қуырдағы", desc: "Қазанда қуырылған жас қой еті, бауыр және алтын картоп." },
    en: { name: "Homemade Kuyrdak", desc: "Skillet-fried tender lamb and offal with golden potatoes and caramelized onions." }
  },
  {
    id: "kz4", cuisine: "kazakh", course: "bakery", selected: false, price: 1100, img: "bread",
    kbju: "320 ккал • Б 7г / Ж 14г / У 42г",
    ru: { name: "Баурсаки и шелпек со сметаной", desc: "Пышные румяные баурсаки и тонкие лепёшки, подаются со сливочным каймаком." },
    kz: { name: "Бауырсақ пен шелпек", desc: "Ыстық бауырсақтар мен қаймақ." },
    en: { name: "Baursaks & Shelpek", desc: "Warm airy fried dough puffs and crispy flatbread served with kaymak cream." }
  },
  {
    id: "kz5", cuisine: "kazakh", course: "soups", selected: false, price: 1600, img: "soup",
    kbju: "260 ккал • Б 12г / Ж 10г / У 30г",
    ru: { name: "Наурыз-коже", desc: "Традиционный сытный суп из семи компонентов с кониной, злаками и айраном." },
    kz: { name: "Наурыз көже", desc: "Жеті түрлі дәмнен жасалған дәстүрлі көктемгі көже." },
    en: { name: "Nauryz-Kozhe", desc: "Traditional seven-ingredient hearty grain and meat broth with fermented milk." }
  },

  // Уйгурская кухня
  {
    id: "uy1", cuisine: "uyghur", course: "mains", selected: false, price: 2600, img: "noodles",
    kbju: "480 ккал • Б 22г / Ж 18г / У 56г",
    ru: { name: "Лагман (гуйру / суйру / цомян)", desc: "Вручную вытянутая лапша с пряным мясным саем из перца, сельдерея, редьки и джусая." },
    kz: { name: "Лағман (гүйру / суйру / цомян)", desc: "Қолдан созылған кеспе және көкөніс-етті дәмді сай." },
    en: { name: "Uyghur Lagman", desc: "Hand-pulled noodles with stir-fried beef, peppers, celery, radish, and garlic chives." }
  },
  {
    id: "uy2", cuisine: "uyghur", course: "bakery", selected: false, price: 2400, img: "dumplings",
    kbju: "460 ккал • Б 20г / Ж 22г / У 44г",
    ru: { name: "Манты с рубленым мясом и джусаем", desc: "Крупные сочные паровые манты с приправой лазджан и сметаной." },
    kz: { name: "Жұсай мен ет қосылған мәнті", desc: "Буға пісірілген ірі шырынды мәнті, лазджанмен." },
    en: { name: "Steamed Manty", desc: "Large juicy steamed dumplings with hand-chopped beef, garlic chives, and chili paste." }
  },
  {
    id: "uy3", cuisine: "uyghur", course: "mains", selected: false, price: 4800, img: "kebab",
    kbju: "640 ккал • Б 36г / Ж 28г / У 58г",
    ru: { name: "Дапанджи (на компанию)", desc: "Тушёная курица с картофелем, перцем и пряностями в остром соусе на широкой лапше." },
    kz: { name: "Дапанджи", desc: "Жалпақ кеспе үстіндегі ащы тұздықта бұқтырылған тауық еті." },
    en: { name: "Dapanji Big Plate Chicken", desc: "Spicy braised chicken with potatoes and bell peppers over wide hand-pulled noodles." }
  },

  // Узбекская кухня
  {
    id: "uz1", cuisine: "uzbek", course: "mains", selected: false, price: 2900, img: "plov",
    kbju: "620 ккал • Б 24г / Ж 29г / У 64г",
    ru: { name: "Плов (ташкентский / чайханский)", desc: "Рис лазер с говядиной, жёлтой морковью, нутом, изюмом, казы и салатом ачичук." },
    kz: { name: "Ташкент / Шайхана палауы", desc: "Лазер күріші, сиыр еті, сары сәбіз, ноқат және ачичук салатымен." },
    en: { name: "Tashkent / Chaykhana Plov", desc: "Fragrant rice slow-cooked with beef, yellow carrots, chickpeas, kazy, and tomato salad." }
  },
  {
    id: "uz2", cuisine: "uzbek", course: "bakery", selected: false, price: 1300, img: "bread",
    kbju: "390 ккал • Б 14г / Ж 20г / У 38г",
    ru: { name: "Тандырная самса", desc: "Румяная выпечка из тандыра с сочным рубленым мясом, луком и зирой." },
    kz: { name: "Тандыр самсасы", desc: "Зире қосылған шырынды етті ыстық самса." },
    en: { name: "Tandoor Samsa", desc: "Golden sesame pastry filled with juicy hand-chopped beef and cumin." }
  },
  {
    id: "uz3", cuisine: "uzbek", course: "soups", selected: false, price: 2300, img: "soup",
    kbju: "340 ккал • Б 20г / Ж 18г / У 22г",
    ru: { name: "Шурпа или мастава", desc: "Наваристый бульон с бараниной и овощами или густой рисовый суп с катыком." },
    kz: { name: "Шорпа немесе мастава", desc: "Қой етінен қайнатылған дәмді сорпа немесе қатықты күріш көжесі." },
    en: { name: "Shurpa or Mastava Soup", desc: "Rich lamb & vegetable broth or hearty spiced rice soup served with yogurt." }
  },

  // Дунганская и Корейская
  {
    id: "du1", cuisine: "dungan", course: "salads", selected: false, price: 1800, img: "noodles",
    kbju: "310 ккал • Б 10г / Ж 9г / У 46г",
    ru: { name: "Ашлянфу каракольское", desc: "Холодная пшеничная и крахмальная лапша с омлетом и острым томатно-уксусным соусом." },
    kz: { name: "Ашлянфу", desc: "Ащы-қышқыл тұздықтағы суық кеспе мен омлет." },
    en: { name: "Ashlyanfu Cold Noodles", desc: "Chilled wheat and starch noodles with omelette strips in spicy tangy tomato broth." }
  },
  {
    id: "ko1", cuisine: "korean", course: "soups", selected: false, price: 2400, img: "ramen",
    kbju: "360 ккал • Б 18г / Ж 10г / У 48г",
    ru: { name: "Кукси (холодный / горячий)", desc: "Тонкая лапша в пряном бульоне мури с салатами из огурцов, капусты и мясом." },
    kz: { name: "Кукси", desc: "Көкөніс салаты мен ет қосылған дәмді мури сорпасындағы кеспе." },
    en: { name: "Kuksi Noodle Soup", desc: "Thin wheat noodles in tangy spiced broth topped with salads, beef, and egg ribbons." }
  },
  {
    id: "ko2", cuisine: "korean", course: "salads", selected: false, price: 2100, img: "salad",
    kbju: "220 ккал • Б 22г / Ж 11г / У 7г",
    ru: { name: "Хе из судака", desc: "Ломтики свежей рыбы, маринованные в уксусе с луком, кинзой и красным перцем." },
    kz: { name: "Көксерке хесі", desc: "Сірке суы мен дәмдеуіштерде маринадталған балғын балық тілімдері." },
    en: { name: "Korean-Style Fish Hoe", desc: "Vinegar-cured fresh pike-perch slices tossed with onions, coriander, and chili." }
  },
  {
    id: "ko4", cuisine: "korean", course: "salads", selected: false, price: 1350, img: "salad",
    kbju: "160 ккал • Б 3г / Ж 8г / У 19г",
    ru: { name: "Морковча, чимчи и панчаны", desc: "Пряная морковь по-корейски, острая капуста чимчи, баклажаны и соевая спаржа." },
    kz: { name: "Панчан жиынтығы (чимчи, сәбіз)", desc: "Корей салаты: сәбіз, чимчи, баклажан және спаржа." },
    en: { name: "Banchan Trio", desc: "Assorted spicy pickled carrots, kimchi cabbage, spiced eggplant, and soy bean curd." }
  },

  // Кавказская и Турецкая
  {
    id: "ca1", cuisine: "caucasian", course: "mains", selected: false, price: 2800, img: "dumplings",
    kbju: "460 ккал • Б 23г / Ж 20г / У 46г",
    ru: { name: "Хинкали с рубленым мясом (5 шт)", desc: "Упругие мешочки с сочной говядиной, кинзой и ароматным бульоном внутри." },
    kz: { name: "Хинкали (5 дана)", desc: "Кинза және хош иісті сорпасы бар шырынды хинкали." },
    en: { name: "Georgian Khinkali (5 pcs)", desc: "Hand-pleated dumplings filled with spiced minced beef, cilantro, and rich broth." }
  },
  {
    id: "ca2", cuisine: "caucasian", course: "bakery", selected: false, price: 2700, img: "bread",
    kbju: "590 ккал • Б 24г / Ж 30г / У 54г",
    ru: { name: "Хачапури по-аджарски", desc: "Румяная лодочка с тягучим расплавленным сулугуни, сливочным маслом и желтком." },
    kz: { name: "Аджар хачапуриі", desc: "Еріген сулугуни ірімшігі мен жұмыртқа сарысы бар қайықша." },
    en: { name: "Adjarian Khachapuri", desc: "Boat-shaped bread filled with bubbling sulguni cheese, butter, and egg yolk." }
  },
  {
    id: "ca3", cuisine: "caucasian", course: "mains", selected: false, price: 3600, img: "kebab",
    kbju: "450 ккал • Б 32г / Ж 28г / У 14г",
    ru: { name: "Шашлык из баранины и люля-кебаб", desc: "Сочное мясо на углях, подаётся на лаваше с маринованным луком и сацебели." },
    kz: { name: "Қой етінен кәуап және люля", desc: "Шоқта піскен ет, лаваш пен сацебели тұздығымен." },
    en: { name: "Charcoal Shashlik & Lula Kebab", desc: "Smoky grilled lamb skewers served on lavash with pickled onions and satsebeli." }
  },
  {
    id: "tu2", cuisine: "turkish", course: "bakery", selected: false, price: 2600, img: "pizza",
    kbju: "480 ккал • Б 21г / Ж 19г / У 52г",
    ru: { name: "Турецкое пиде и лахмаджун", desc: "Хрустящая выпечка из дровяной печи с сыром кашар, фаршем и зеленью." },
    kz: { name: "Пиде және лахмаджун", desc: "Тас пеште піскен ірімшік пен ет қосылған түрік наны." },
    en: { name: "Turkish Pide & Lahmacun", desc: "Stone-oven flatbread boats with melted cheese or crisp minced-meat topping." }
  },
  {
    id: "tu3", cuisine: "turkish", course: "soups", selected: false, price: 1750, img: "soup",
    kbju: "240 ккал • Б 11г / Ж 7г / У 33г",
    ru: { name: "Мерджимек чорбасы", desc: "Бархатистый крем-суп из красной чечевицы с мятой, паприкой и долькой лимона." },
    kz: { name: "Мерджимек жасымық сорпасы", desc: "Лимон мен жалбыз қосылған нәзік жасымық крем-сорпасы." },
    en: { name: "Mercimek Red Lentil Soup", desc: "Velvety Turkish red lentil cream soup served with mint, paprika oil, and lemon." }
  },

  // Европейская, Паназиатская, Стритфуд
  {
    id: "eu1", cuisine: "european", course: "soups", selected: false, price: 2100, img: "soup",
    kbju: "320 ккал • Б 15г / Ж 14г / У 32г",
    ru: { name: "Борщ с чесночными пампушками", desc: "Наваристый свекольный борщ с говядиной, сметаной, зеленью и тёплыми пампушками." },
    kz: { name: "Сарымсақты пампушкамен борщ", desc: "Қаймақ пен көк шөп қосылған дәстүрлі борщ." },
    en: { name: "Beef Borscht & Garlic Rolls", desc: "Rich beetroot and beef soup served with sour cream and warm garlic buns." }
  },
  {
    id: "eu2", cuisine: "european", course: "salads", selected: true, price: 2650, img: "caesar",
    kbju: "340 ккал • Б 22г / Ж 21г / У 16г",
    ru: { name: "Салат Цезарь с курицей-гриль", desc: "Хрустящий салат ромен, филе на гриле, перепелиные яйца, пармезан и соус Цезарь." },
    kz: { name: "Тауық етімен Цезарь салаты", desc: "Гриль тауық еті, ромен жапырағы, пармезан және Цезарь тұздығы." },
    en: { name: "Grilled Chicken Caesar Salad", desc: "Crisp romaine lettuce, chargrilled chicken, parmesan flakes, and classic dressing." }
  },
  {
    id: "as1", cuisine: "asian", course: "soups", selected: true, price: 3600, img: "ramen",
    kbju: "380 ккал • Б 24г / Ж 16г / У 34г",
    ru: { name: "Том Ям с тигровыми креветками", desc: "Остро-кислый тайский суп на кокосовом молоке с лемонграссом, грибами и рисом." },
    kz: { name: "Тигр асшаянымен Том Ям", desc: "Кокос сүті мен лемонграсс қосылған тай сорпасы." },
    en: { name: "Tom Yum with Tiger Prawns", desc: "Spicy-sour Thai coconut soup with lemongrass, mushrooms, and jasmine rice." }
  },
  {
    id: "as2", cuisine: "asian", course: "mains", selected: false, price: 3200, img: "sushi",
    kbju: "430 ккал • Б 19г / Ж 18г / У 46г",
    ru: { name: "Ролл Филадельфия классик (8 шт)", desc: "Свежий норвежский лосось, сливочный сыр, спелый авокадо и хрустящий огурец." },
    kz: { name: "Классикалық Филадельфия роллы", desc: "Балғын албырт, кілегейлі ірімшік және авокадо." },
    en: { name: "Classic Philadelphia Roll", desc: "Fresh Norwegian salmon, cream cheese, ripe avocado, and crisp cucumber." }
  },
  {
    id: "st1", cuisine: "street", course: "bakery", selected: false, price: 1950, img: "kebab",
    kbju: "540 ккал • Б 26г / Ж 24г / У 52г",
    ru: { name: "Алматинский донер в лаваше", desc: "Сочное мясо с вертела, картофель фри, свежие овощи, белый чесночный и красный соусы." },
    kz: { name: "Алматы дөнері", desc: "Қытырлақ картоп фри, балғын көкөністер және фирмалық тұздықпен дөнер." },
    en: { name: "Signature Almaty Doner", desc: "Spit-roasted beef or chicken wrapped in lavash with crispy fries and twin sauces." }
  },

  // Напитки и десерты
  {
    id: "dr1", cuisine: "drinks", course: "drinks", selected: true, price: 1450, img: "coffee",
    kbju: "160 ккал • Б 4г / Ж 6г / У 22г",
    ru: { name: "Айс-латте солёная карамель", desc: "Двойной эспрессо 100% арабики, холодное молоко и карамель с морской солью." },
    kz: { name: "Тұзды карамельді айс-латте", desc: "Салқын сүт, эспрессо және теңіз тұзы қосылған карамель." },
    en: { name: "Iced Salted Caramel Latte", desc: "Double 100% Arabica espresso over chilled milk with sea salt caramel." }
  },
  {
    id: "dr2", cuisine: "drinks", course: "drinks", selected: true, price: 1650, img: "lemonade",
    kbju: "190 ккал • Б 2г / Ж 1г / У 42г",
    ru: { name: "Лимонад манго-маракуйя (450 мл)", desc: "Освежающий авторский лимонад из натурального тропического пюре и мяты." },
    kz: { name: "Манго-маракуйя лимонады", desc: "Тропикалық жеміс езбесі мен жалбыздан сергітетін сусын." },
    en: { name: "Mango Passionfruit Lemonade", desc: "Sparkling craft refresher blended with tropical fruit puree and fresh mint." }
  }
];

// State
let activeTab = "prompt";
let activeCuisine = "all";
let activeGrouping = "course"; // "course" | "cuisine"
let activeLayout = "auto";     // "auto" | "1col" | "2col"
let activeStyle = "emerald-split";
let uploadedPhotoBase64 = null;
let uploadedPhotoMime = null;
let lastGeneratedMenu = null;

// DOM Elements
const builderListEl = document.getElementById("builderList");
const selectedCountEl = document.getElementById("selectedCount");
const venueNameInput = document.getElementById("venueNameInput");
const venueSubtitleInput = document.getElementById("venueSubtitleInput");
const aiPromptInput = document.getElementById("aiPromptInput");
const rawTextInput = document.getElementById("rawTextInput");
const showDetailsToggle = document.getElementById("showDetailsToggle");
const showImagesToggle = document.getElementById("showImagesToggle");
const generateBtn = document.getElementById("generateBtn");
const menuSheet = document.getElementById("menuSheet");
const menuContent = document.getElementById("menuContent");
const previewStatus = document.getElementById("previewStatus");

// API Modal Elements
const apiModal = document.getElementById("apiModal");
const openApiModalBtn = document.getElementById("openApiModalBtn");
const closeApiModalBtn = document.getElementById("closeApiModalBtn");
const apiKeyInput = document.getElementById("apiKeyInput");
const saveApiKeyBtn = document.getElementById("saveApiKeyBtn");
const clearApiKeyBtn = document.getElementById("clearApiKeyBtn");
const apiStatusDot = document.getElementById("apiStatusDot");
const apiStatusText = document.getElementById("apiStatusText");

// =========================================================================
// INITIALIZATION
// =========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initPromptChips();
  initCuisineFilters();
  initGroupingAndLayout();
  initStyleSelector();
  initPhotoUpload();
  initCustomDishAdder();
  initApiModal();
  initExports();

  renderBuilderList();
  updateApiIndicator();

  // Default prompt & initial render
  aiPromptInput.value = "Итальянская траттория и городское бистро: салаты с бурратой и Цезарь, хрустящий хлеб и картофель фри, пицца Маргарита, паста Карбонара, бешбармак, том ям, тирамису и лимонад";
  runGeneration(true);
});

// =========================================================================
// TABS & PROMPT CHIPS
// =========================================================================
function initTabs() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      activeTab = btn.dataset.tab;
      document.getElementById(`tab-${activeTab}`).classList.add("active");
    });
  });

  document.getElementById("fillSampleTextBtn").addEventListener("click", () => {
    rawTextInput.value = [
      "Салат с бурратой и томатами - 3300",
      "Картофель фри хрустящий - 1200",
      "Хлебная корзина с чесночным маслом - 1100",
      "Пицца Маргарита - 3400",
      "Паста Карбонара - 3600",
      "Тирамису классический - 2400"
    ].join("\n");
  });
}

function initPromptChips() {
  document.querySelectorAll(".chip-btn").forEach((chip) => {
    chip.addEventListener("click", () => {
      aiPromptInput.value = chip.dataset.prompt;
      runGeneration(false);
    });
  });
}

function initCuisineFilters() {
  document.querySelectorAll("#cuisineFilters .pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.querySelectorAll("#cuisineFilters .pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      activeCuisine = pill.dataset.cuisine;
      renderBuilderList();
    });
  });

  document.getElementById("selectPresetBtn").addEventListener("click", () => {
    const popular = ["it1", "it4", "it6", "sn1", "sn3", "kz1", "uy1", "uz1", "as1", "dr1", "dr2", "it7"];
    DISH_CATALOG.forEach((d) => { d.selected = popular.includes(d.id); });
    renderBuilderList();
    runGeneration(true);
  });

  document.getElementById("clearSelectionBtn").addEventListener("click", () => {
    DISH_CATALOG.forEach((d) => { d.selected = false; });
    renderBuilderList();
  });
}

function renderBuilderList() {
  builderListEl.innerHTML = "";
  const filtered = DISH_CATALOG.filter((d) => activeCuisine === "all" || d.cuisine === activeCuisine);

  filtered.forEach((dish) => {
    const row = document.createElement("div");
    row.className = `builder-item ${dish.selected ? "selected" : ""}`;

    const left = document.createElement("label");
    left.className = "builder-item-left";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = dish.selected;
    cb.addEventListener("change", () => {
      dish.selected = cb.checked;
      row.classList.toggle("selected", dish.selected);
      updateSelectedCount();
    });

    const textWrap = document.createElement("div");
    textWrap.style.minWidth = "0";
    const nameEl = document.createElement("div");
    nameEl.className = "builder-item-name";
    nameEl.textContent = dish.ru.name;
    const catEl = document.createElement("div");
    catEl.className = "builder-item-cat";
    const cName = CUISINE_META[dish.cuisine]?.ru || "Авторская";
    const secName = COURSE_META[dish.course]?.ru || "";
    catEl.textContent = `${cName} • ${secName}`;

    textWrap.appendChild(nameEl);
    textWrap.appendChild(catEl);
    left.appendChild(cb);
    left.appendChild(textWrap);

    const priceIn = document.createElement("input");
    priceIn.type = "number";
    priceIn.className = "builder-price-input";
    priceIn.value = dish.price;
    priceIn.addEventListener("input", () => {
      dish.price = parseInt(priceIn.value, 10) || 0;
    });

    row.appendChild(left);
    row.appendChild(priceIn);
    builderListEl.appendChild(row);
  });

  updateSelectedCount();
}

function updateSelectedCount() {
  selectedCountEl.textContent = DISH_CATALOG.filter((d) => d.selected).length;
}

function initCustomDishAdder() {
  document.getElementById("addCustomDishBtn").addEventListener("click", () => {
    const nameInput = document.getElementById("customDishName");
    const priceInput = document.getElementById("customDishPrice");
    const courseSelect = document.getElementById("customDishCourse");

    const name = nameInput.value.trim();
    const price = parseInt(priceInput.value, 10) || 2200;
    const course = courseSelect.value;
    if (!name) return;

    const newDish = {
      id: "custom_" + Date.now(),
      cuisine: activeCuisine === "all" ? "italian" : activeCuisine,
      course,
      selected: true,
      price,
      img: guessImageTag(name, course),
      kbju: "350 ккал • Б 16г / Ж 14г / У 36г",
      isCustom: true,
      ru: { name, desc: "Авторское блюдо от шеф-повара из отборных свежих ингредиентов." },
      kz: { name, desc: "Шеф-аспаздың арнайы рецептімен дайындалған тағам." },
      en: { name, desc: "Chef's signature dish crafted from fresh quality ingredients." }
    };

    DISH_CATALOG.unshift(newDish);
    nameInput.value = "";
    priceInput.value = "";
    renderBuilderList();
  });
}

// =========================================================================
// GROUPING, LAYOUT & STYLES
// =========================================================================
function initGroupingAndLayout() {
  document.querySelectorAll("#groupingSwitch .seg-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#groupingSwitch .seg-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeGrouping = btn.dataset.group;
      if (lastGeneratedMenu) renderMenuSheet(lastGeneratedMenu);
    });
  });

  document.querySelectorAll("#layoutSwitch .seg-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#layoutSwitch .seg-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeLayout = btn.dataset.layout;
      if (lastGeneratedMenu) renderMenuSheet(lastGeneratedMenu);
    });
  });

  document.querySelectorAll('input[name="lang"]').forEach((cb) => {
    cb.addEventListener("change", () => {
      if (lastGeneratedMenu) {
        lastGeneratedMenu.langs = getSelectedLanguages();
        renderMenuSheet(lastGeneratedMenu);
      }
    });
  });
}

function initStyleSelector() {
  document.querySelectorAll(".style-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".style-card").forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      activeStyle = card.dataset.style;
      if (lastGeneratedMenu) renderMenuSheet(lastGeneratedMenu);
    });
  });

  showDetailsToggle.addEventListener("change", () => {
    if (lastGeneratedMenu) renderMenuSheet(lastGeneratedMenu);
  });

  showImagesToggle.addEventListener("change", () => {
    if (lastGeneratedMenu) renderMenuSheet(lastGeneratedMenu);
  });

  venueNameInput.addEventListener("input", () => {
    if (lastGeneratedMenu) renderMenuSheet(lastGeneratedMenu);
  });

  venueSubtitleInput.addEventListener("input", () => {
    if (lastGeneratedMenu) renderMenuSheet(lastGeneratedMenu);
  });
}

function getSelectedLanguages() {
  const checked = Array.from(document.querySelectorAll('input[name="lang"]:checked')).map((el) => el.value);
  return checked.length > 0 ? checked : ["ru"];
}

// =========================================================================
// PHOTO UPLOAD
// =========================================================================
function initPhotoUpload() {
  const photoInput = document.getElementById("photoInput");
  const photoPreview = document.getElementById("photoPreview");
  const uploadPlaceholder = document.getElementById("uploadPlaceholder");

  photoInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      photoPreview.src = dataUrl;
      photoPreview.classList.remove("hidden");
      uploadPlaceholder.classList.add("hidden");
      uploadedPhotoMime = file.type || "image/jpeg";
      uploadedPhotoBase64 = dataUrl.split(",")[1];
    };
    reader.readAsDataURL(file);
  });
}

// =========================================================================
// API KEY MODAL
// =========================================================================
function initApiModal() {
  openApiModalBtn.addEventListener("click", () => {
    apiKeyInput.value = localStorage.getItem("dishify_gemini_key") || "";
    apiModal.classList.remove("hidden");
  });

  closeApiModalBtn.addEventListener("click", () => apiModal.classList.add("hidden"));

  saveApiKeyBtn.addEventListener("click", () => {
    const val = apiKeyInput.value.trim();
    if (val) localStorage.setItem("dishify_gemini_key", val);
    else localStorage.removeItem("dishify_gemini_key");
    updateApiIndicator();
    apiModal.classList.add("hidden");
  });

  clearApiKeyBtn.addEventListener("click", () => {
    localStorage.removeItem("dishify_gemini_key");
    apiKeyInput.value = "";
    updateApiIndicator();
    apiModal.classList.add("hidden");
  });
}

function updateApiIndicator() {
  const key = localStorage.getItem("dishify_gemini_key");
  if (key) {
    apiStatusDot.classList.add("connected");
    apiStatusText.textContent = "ИИ: Gemini API подключен";
  } else {
    apiStatusDot.classList.remove("connected");
    apiStatusText.textContent = "ИИ: Встроенный движок";
  }
}

// =========================================================================
// GENERATION ENGINE (PROMPT + BUILDER + TEXT + PHOTO)
// =========================================================================
generateBtn.addEventListener("click", () => runGeneration(false));

async function runGeneration(isSilentInit = false) {
  const langs = getSelectedLanguages();
  const apiKey = localStorage.getItem("dishify_gemini_key");

  if (!isSilentInit) {
    generateBtn.disabled = true;
    generateBtn.textContent = apiKey ? "⏳ Gemini создаёт меню..." : "⏳ Генерируем меню...";
  }

  try {
    let dishes = [];

    if (activeTab === "prompt") {
      const promptText = aiPromptInput.value.trim();
      if (!promptText) {
        alert("Напишите промпт или выберите готовый пример ниже.");
        return;
      }
      if (apiKey && !isSilentInit) {
        dishes = (await callGeminiPrompt(apiKey, promptText)) || generateFromPromptLocally(promptText);
      } else {
        dishes = generateFromPromptLocally(promptText);
      }
    } else if (activeTab === "builder") {
      dishes = DISH_CATALOG.filter((d) => d.selected).map((d) => ({ ...d }));
      if (dishes.length === 0) dishes = DISH_CATALOG.slice(0, 8).map((d) => ({ ...d }));

      const customDishes = dishes.filter((d) => d.isCustom);
      if (apiKey && customDishes.length > 0 && !isSilentInit) {
        const textList = customDishes.map((d) => `${d.ru.name} - ${d.price}`).join("\n");
        const aiEnriched = await callGeminiText(apiKey, textList);
        if (aiEnriched && aiEnriched.length > 0) {
          dishes = [...aiEnriched, ...dishes.filter((d) => !d.isCustom)];
        }
      }
    } else if (activeTab === "text") {
      const raw = rawTextInput.value.trim();
      if (!raw) {
        alert("Введите хотя бы одно блюдо или нажмите «Вставить готовый пример».");
        return;
      }
      if (apiKey) {
        dishes = (await callGeminiText(apiKey, raw)) || parseRawTextLocally(raw);
      } else {
        dishes = parseRawTextLocally(raw);
      }
    } else if (activeTab === "photo") {
      if (apiKey && uploadedPhotoBase64) {
        dishes = (await callGeminiVision(apiKey, uploadedPhotoBase64, uploadedPhotoMime)) || getDemoPhotoDishes();
      } else {
        dishes = getDemoPhotoDishes();
      }
    }

    lastGeneratedMenu = { dishes, langs };
    renderMenuSheet(lastGeneratedMenu);
    previewStatus.textContent = `Готово • ${dishes.length} позиций • ${langs.map((l) => l.toUpperCase()).join(" / ")}`;
  } catch (err) {
    console.error("Generation error:", err);
    const fallback = DISH_CATALOG.filter((d) => d.selected);
    lastGeneratedMenu = { dishes: fallback, langs };
    renderMenuSheet(lastGeneratedMenu);
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "✨ Сгенерировать меню с ИИ";
  }
}

function generateFromPromptLocally(prompt) {
  const p = prompt.toLowerCase();
  const picked = new Set();

  const matchBy = (fn) => {
    DISH_CATALOG.filter(fn).forEach((d) => picked.add(d));
  };

  if (/итал|пицц|паст|траттор|маргарит|карбонар|тирамису|буррат/.test(p)) {
    matchBy((d) => d.cuisine === "italian");
  }
  if (/закуск|хлеб|фри|батат|брускет|сырн|снек/.test(p)) {
    matchBy((d) => d.cuisine === "snacks");
  }
  if (/казах|беш|казы|баурсак|степн|куырдак/.test(p)) {
    matchBy((d) => d.cuisine === "kazakh");
  }
  if (/узбек|плов|самс|шурп/.test(p)) {
    matchBy((d) => d.cuisine === "uzbek");
  }
  if (/уйгур|лагман|мант|дапандж/.test(p)) {
    matchBy((d) => d.cuisine === "uyghur");
  }
  if (/корей|кукси|хе|морковч|кимчи|дунган|ашлянфу/.test(p)) {
    matchBy((d) => d.cuisine === "korean" || d.cuisine === "dungan");
  }
  if (/кавказ|грузин|хинкал|хачапур|шашлык/.test(p)) {
    matchBy((d) => d.cuisine === "caucasian");
  }
  if (/турец|кебаб|пиде|мерджимек/.test(p)) {
    matchBy((d) => d.cuisine === "turkish");
  }
  if (/ази|япон|том ям|рамен|суши|ролл|вок/.test(p)) {
    matchBy((d) => d.cuisine === "asian");
  }
  if (/стритфуд|бургер|донер|чебурек/.test(p)) {
    matchBy((d) => d.cuisine === "street" || d.id === "sn1" || d.id === "sn5");
  }
  if (/салат|цезарь/.test(p)) {
    matchBy((d) => d.course === "salads");
  }
  if (/кофе|латте|лимонад|десерт|чай|напит/.test(p)) {
    matchBy((d) => d.course === "drinks");
  }

  let result = Array.from(picked);
  if (result.length < 4) {
    result = DISH_CATALOG.filter((d) => ["it6", "eu2", "sn1", "sn3", "it1", "it4", "kz1", "as1", "dr1", "dr2", "it7"].includes(d.id));
  }
  return result.slice(0, 14);
}

function parseRawTextLocally(raw) {
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  return lines.map((line, idx) => {
    const priceMatch = line.match(/(\d[\d\s]{1,6})\s*(?:₸|тг|kzt)?$/i);
    let price = 2400;
    let name = line;
    if (priceMatch) {
      price = parseInt(priceMatch[1].replace(/\s/g, ""), 10) || 2400;
      name = line.slice(0, priceMatch.index).replace(/[-–—:]+$/, "").trim();
    }

    const found = DISH_CATALOG.find((d) =>
      d.ru.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(d.ru.name.toLowerCase().split(" ")[0])
    );
    if (found && name.length > 3) return { ...found, price };

    const lower = name.toLowerCase();
    let course = "mains";
    if (/салат|хе|морковча|ашлянфу|буррат|цезарь/.test(lower)) course = "salads";
    else if (/фри|хлеб|корзин|гренк|брускет|закуск|сырные/.test(lower)) course = "snacks";
    else if (/суп|шурпа|мастава|борщ|том ям|харчо|кукси/.test(lower)) course = "soups";
    else if (/пицц|самса|баурсак|хачапури|пиде|донер|чебурек|манты/.test(lower)) course = "bakery";
    else if (/чай|кофе|латте|лимонад|кумыс|тирамису|чизкейк|десерт/.test(lower)) course = "drinks";

    return {
      id: "txt_" + idx,
      cuisine: "italian",
      course,
      price,
      img: guessImageTag(name, course),
      kbju: "380 ккал • Б 16г / Ж 15г / У 42г",
      ru: { name, desc: "Фирменная позиция заведения из отборных свежих ингредиентов." },
      kz: { name, desc: "Таңдаулы балғын өнімдерден дайындалған арнайы тағам." },
      en: { name, desc: "Signature house dish prepared with fresh quality ingredients." }
    };
  });
}

function guessImageTag(name, course) {
  const n = name.toLowerCase();
  if (/пицц|маргарит/.test(n)) return "pizza";
  if (/пепперони/.test(n)) return "pepperoni";
  if (/паст|спагетти|карбонар|феттуч|болоньез/.test(n)) return "pasta";
  if (/фри|батат|сырные/.test(n)) return "fries";
  if (/хлеб|чиабат|фокач|баурсак|хачапур/.test(n)) return "bread";
  if (/брускет/.test(n)) return "bruschetta";
  if (/цезарь/.test(n)) return "caesar";
  if (/салат|буррат|хе/.test(n)) return "salad";
  if (/том ям|рамен|кукси/.test(n)) return "ramen";
  if (/суп|борщ|шурп|харчо/.test(n)) return "soup";
  if (/плов/.test(n)) return "plov";
  if (/шашлык|кебаб|донер/.test(n)) return "kebab";
  if (/суши|ролл/.test(n)) return "sushi";
  if (/манты|хинкал/.test(n)) return "dumplings";
  if (/кофе|латте/.test(n)) return "coffee";
  if (/лимонад|чай/.test(n)) return "lemonade";
  if (/тирамису|чизкейк|пахлава|торт/.test(n)) return "dessert";
  if (course === "salads") return "salad";
  if (course === "snacks") return "fries";
  if (course === "soups") return "soup";
  if (course === "bakery") return "pizza";
  if (course === "drinks") return "lemonade";
  return "meat";
}

function getDemoPhotoDishes() {
  return DISH_CATALOG.filter((d) => ["it6", "sn1", "sn3", "it1", "it4", "kz1", "dr2"].includes(d.id));
}

// =========================================================================
// GOOGLE GEMINI REST API (OPTIONAL REAL AI)
// =========================================================================
async function callGeminiPrompt(apiKey, userPrompt) {
  const prompt = `Ты — креативный шеф-редактор меню Dishify.
На основе запроса пользователя составь полное, сбалансированное меню (8–12 блюд) с салатами, закусками/хлебом, супами, горячим, выпечкой и напитками/десертами, в точности подходящее под запрос:
"${userPrompt}"

Верни ТОЛЬКО валидный JSON-массив объектов без markdown-оберток.
Формат каждого объекта:
{
  "course": "salads" | "snacks" | "soups" | "mains" | "bakery" | "drinks",
  "cuisine": "italian" | "snacks" | "kazakh" | "uyghur" | "uzbek" | "dungan" | "korean" | "caucasian" | "turkish" | "european" | "asian" | "street" | "drinks",
  "img": "pizza" | "pepperoni" | "pasta" | "salad" | "caesar" | "fries" | "bread" | "bruschetta" | "soup" | "ramen" | "plov" | "meat" | "kebab" | "dumplings" | "sushi" | "noodles" | "coffee" | "lemonade" | "dessert",
  "price": 2800,
  "kbju": "420 ккал • Б 22г / Ж 18г / У 40г",
  "ru": { "name": "...", "desc": "Вкусное ресторанное описание до 12 слов" },
  "kz": { "name": "...", "desc": "Дәмді мейрамханалық сипаттама" },
  "en": { "name": "...", "desc": "Appetizing restaurant description" }
}`;

  return await fetchGeminiJSON(apiKey, [{ text: prompt }]);
}

async function callGeminiText(apiKey, rawText) {
  const prompt = `Преобразуй список блюд в JSON-массив меню Dishify:
${rawText}

Формат каждого объекта:
{
  "course": "salads" | "snacks" | "soups" | "mains" | "bakery" | "drinks",
  "cuisine": "italian" | "snacks" | "kazakh" | "uyghur" | "uzbek" | "dungan" | "korean" | "caucasian" | "turkish" | "european" | "asian" | "street" | "drinks",
  "img": "pizza" | "pasta" | "salad" | "fries" | "bread" | "soup" | "plov" | "meat" | "kebab" | "sushi" | "coffee" | "lemonade" | "dessert",
  "price": 2500,
  "kbju": "400 ккал • Б 20г / Ж 15г / У 40г",
  "ru": { "name": "...", "desc": "Короткое вкусное описание" },
  "kz": { "name": "...", "desc": "Қысқаша дәмді сипаттама" },
  "en": { "name": "...", "desc": "Short appetizing description" }
}
Верни ТОЛЬКО валидный JSON-массив.`;

  return await fetchGeminiJSON(apiKey, [{ text: prompt }]);
}

async function callGeminiVision(apiKey, base64Data, mimeType) {
  const prompt = `Распознай все блюда и цены с этой фотографии меню.
Верни ТОЛЬКО валидный JSON массив объектов без markdown:
{
  "course": "salads" | "snacks" | "soups" | "mains" | "bakery" | "drinks",
  "cuisine": "italian" | "snacks" | "kazakh" | "uyghur" | "uzbek" | "dungan" | "korean" | "caucasian" | "turkish" | "european" | "asian" | "street" | "drinks",
  "img": "pizza" | "pasta" | "salad" | "fries" | "bread" | "soup" | "plov" | "meat" | "kebab" | "sushi" | "coffee" | "lemonade" | "dessert",
  "price": 2500,
  "kbju": "400 ккал • Б 20г / Ж 15г / У 40г",
  "ru": { "name": "...", "desc": "Короткое вкусное описание" },
  "kz": { "name": "...", "desc": "Қысқаша дәмді сипаттама" },
  "en": { "name": "...", "desc": "Short appetizing description" }
}`;

  return await fetchGeminiJSON(apiKey, [
    { text: prompt },
    { inline_data: { mime_type: mimeType, data: base64Data } }
  ]);
}

async function fetchGeminiJSON(apiKey, parts) {
  const models = ["gemini-2.5-flash", "gemini-2.0-flash"];
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts }], generationConfig: { temperature: 0.5 } })
      });
      if (!res.ok) continue;
      const data = await res.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const cleaned = rawText.replace(/```json/gi, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(cleaned);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      console.warn(`Gemini model ${model} fallback:`, e);
    }
  }
  return null;
}

// =========================================================================
// MENU RENDERER
// =========================================================================
function renderMenuSheet({ dishes, langs }) {
  menuSheet.className = `menu-sheet theme-${activeStyle}`;

  const venueName = venueNameInput.value.trim() || "LA SCALA & BISTRO";
  const venueSub = venueSubtitleInput.value.trim();
  const showDetails = showDetailsToggle.checked;
  const showImages = showImagesToggle.checked;

  const metaDict = activeGrouping === "course" ? COURSE_META : CUISINE_META;
  const orderKeys = activeGrouping === "course"
    ? ["salads", "snacks", "soups", "mains", "bakery", "drinks"]
    : ["italian", "snacks", "kazakh", "uyghur", "uzbek", "dungan", "korean", "caucasian", "turkish", "european", "asian", "street", "drinks"];

  const groups = {};
  dishes.forEach((d) => {
    const key = activeGrouping === "course"
      ? (COURSE_META[d.course] ? d.course : "mains")
      : (CUISINE_META[d.cuisine] ? d.cuisine : "italian");
    if (!groups[key]) groups[key] = [];
    groups[key].push(d);
  });

  const primaryLang = langs[0];
  const secondaryLangs = langs.slice(1);

  const renderSectionHTML = (key) => {
    const items = groups[key];
    if (!items || items.length === 0) return "";
    const catTitle = langs.map((l) => metaDict[key][l]).join(" / ");
    return `
      <section class="menu-category">
        <h3 class="menu-category-title">${escapeHtml(catTitle)}</h3>
        <div class="menu-items-grid">
          ${items.map((item) => {
            const mainObj = item[primaryLang] || item.ru;
            const altNames = secondaryLangs.map((l) => item[l]?.name).filter((n) => n && n !== mainObj.name).join(" • ");
            const imgKey = item.img || guessImageTag(mainObj.name || "", item.course);
            const imgUrl = IMAGE_POOL[imgKey] || IMAGE_POOL.meat;
            return `
              <div class="menu-dish">
                ${showImages ? `<img class="menu-dish-thumb" src="${imgUrl}" crossorigin="anonymous" alt="${escapeHtml(mainObj.name)}" onerror="this.style.display='none'" />` : ""}
                <div class="menu-dish-info">
                  <div class="menu-dish-name">${escapeHtml(mainObj.name)}</div>
                  ${altNames ? `<div class="menu-dish-alt-lang">${escapeHtml(altNames)}</div>` : ""}
                  ${showDetails && mainObj.desc ? `<div class="menu-dish-desc">${escapeHtml(mainObj.desc)}</div>` : ""}
                  ${showDetails && item.kbju ? `<div class="menu-dish-kbju">${escapeHtml(item.kbju)}</div>` : ""}
                </div>
                <div class="menu-dish-price">${Number(item.price).toLocaleString("ru-RU")} ₸</div>
              </div>
            `;
          }).join("")}
        </div>
      </section>
    `;
  };

  if (activeStyle === "emerald-split" && activeLayout !== "1col") {
    const leftKeys = activeGrouping === "course"
      ? ["salads", "snacks", "drinks"]
      : ["italian", "snacks", "drinks"];
    const rightKeys = orderKeys.filter((k) => !leftKeys.includes(k));
    const heroImg = dishes[0]?.img ? (IMAGE_POOL[dishes[0].img] || IMAGE_POOL.pasta) : IMAGE_POOL.pasta;

    menuContent.innerHTML = `
      <div class="split-grid">
        <aside class="split-sidebar">
          <header class="menu-header">
            <div class="menu-venue">${escapeHtml(venueName)}</div>
            ${venueSub ? `<div class="menu-subtitle">${escapeHtml(venueSub)}</div>` : ""}
            <div class="menu-lang-badge">${langs.map((l) => l.toUpperCase()).join(" • ")}</div>
          </header>
          ${leftKeys.map(renderSectionHTML).join("")}
          ${showImages ? `<img class="split-hero-photo" src="${heroImg}" crossorigin="anonymous" alt="Dish" onerror="this.style.display='none'" />` : ""}
        </aside>
        <div class="split-main">
          <div class="menu-categories">
            ${rightKeys.map(renderSectionHTML).join("")}
          </div>
          <footer class="menu-footer">
            Создано в Dishify • AI Menu Studio
          </footer>
        </div>
      </div>
    `;
    return;
  }

  const useTwoCol = activeLayout === "2col" || (activeLayout === "auto" && ["swiss", "tokyo"].includes(activeStyle));
  menuContent.innerHTML = `
    <header class="menu-header">
      <div class="menu-venue">${escapeHtml(venueName)}</div>
      ${venueSub ? `<div class="menu-subtitle">${escapeHtml(venueSub)}</div>` : ""}
      <div class="menu-lang-badge">${langs.map((l) => l.toUpperCase()).join(" • ")}</div>
    </header>
    <div class="menu-categories ${useTwoCol ? "layout-2col" : ""}">
      ${orderKeys.map(renderSectionHTML).join("")}
    </div>
    <footer class="menu-footer">
      Создано в Dishify • AI Menu Studio
    </footer>
  `;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// =========================================================================
// PDF & PNG EXPORT
// =========================================================================
function initExports() {
  const pngBtn = document.getElementById("downloadPngBtn");
  const pdfBtn = document.getElementById("downloadPdfBtn");

  pngBtn.addEventListener("click", async () => {
    if (typeof html2canvas === "undefined") {
      alert("Библиотека рендеринга ещё загружается. Попробуйте через пару секунд.");
      return;
    }
    pngBtn.disabled = true;
    pngBtn.textContent = "⏳...";
    try {
      const canvas = await html2canvas(menuSheet, { scale: 2, useCORS: true });
      const link = document.createElement("a");
      const slug = (venueNameInput.value.trim() || "Dishify_Menu").replace(/\s+/g, "_");
      link.download = `${slug}_Menu.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } finally {
      pngBtn.disabled = false;
      pngBtn.textContent = "🖼️ Скачать PNG";
    }
  });

  pdfBtn.addEventListener("click", async () => {
    if (typeof html2canvas === "undefined" || typeof window.jspdf === "undefined") {
      window.print();
      return;
    }
    pdfBtn.disabled = true;
    pdfBtn.textContent = "⏳ Готовим PDF...";
    try {
      const canvas = await html2canvas(menuSheet, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/jpeg", 0.95);
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      const slug = (venueNameInput.value.trim() || "Dishify_Menu").replace(/\s+/g, "_");
      pdf.save(`${slug}_Menu.pdf`);
    } catch (e) {
      console.error(e);
      window.print();
    } finally {
      pdfBtn.disabled = false;
      pdfBtn.textContent = "📄 Скачать PDF";
    }
  });
}
