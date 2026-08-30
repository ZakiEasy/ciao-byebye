// Script de peuplement du Menu Officiel Complet Don Roberto Nice (50+ Produits Authentiques)
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ciao_byebye_db',
});

const fullDonRobertoMenu = [
  // ==========================================
  // 1. PIZZAS CLASSIQUES & TRADITIONNELLES
  // ==========================================
  {
    name: 'Pizza Margherita',
    description: 'Sauce tomate italienne San Marzano, mozzarella Fior di Latte, basilic frais, filet d\'huile d\'olive extra vierge.',
    price_cents: 900,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Marinara',
    description: 'Sauce tomate San Marzano, pulpe d’ail frais, basilic, origan sauvage, huile d’olive extra vierge (sans fromage).',
    price_cents: 800,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Regina',
    description: 'Sauce tomate, mozzarella fondante, jambon blanc supérieur, champignons frais de Paris émincés, olives noires.',
    price_cents: 1200,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Calzone (Chausson)',
    description: 'Chausson doré au four à pierre : Sauce tomate, mozzarella, jambon blanc supérieur, champignons frais, œuf frais coulant.',
    price_cents: 1200,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Romana',
    description: 'Sauce tomate San Marzano, mozzarella, filets d\'anchois de Méditerranée, câpres marinées, olives noires.',
    price_cents: 1250,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza 4 Stagioni (4 Saisons)',
    description: 'Sauce tomate, mozzarella, jambon blanc, cœurs d\'artichauts, champignons de Paris, olives, persillade maison.',
    price_cents: 1300,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza 5 Formaggi (5 Fromages)',
    description: 'Sauce tomate, mozzarella, gorgonzola crémeux AOP, fromage de chèvre, reblochon fermier, camembert affiné.',
    price_cents: 1200,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&q=80&w=600'
  },

  // ==========================================
  // 2. PIZZAS GOURMET & CRÉATIONS MAISON
  // ==========================================
  {
    name: 'Pizza Burratina Pugliese',
    description: 'Crème de basilic frais, mozzarella, boule de Burrata crémeuse des Pouilles (120g), jambon cru affiné, tomates cerises, copeaux de parmesan, pesto Genovese, roquette.',
    price_cents: 1600,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Tartufo (Truffe Noire)',
    description: 'Crème de truffe noire d\'Alba, mozzarella, œuf coulant bio, pétales de truffe noire d\'été, fines tranches de pommes de terre, parmesan 24 mois.',
    price_cents: 1750,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Don Roberto (Signature Maison)',
    description: 'Sauce tomate, mozzarella, jambon cru italien, gorgonzola piquant, reblochon AOP, champignons frais, pointe d\'ail, olives.',
    price_cents: 1300,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza San Daniele DOP',
    description: 'Sauce tomate San Marzano, mozzarella Fior di Latte, véritable jambon cru "San Daniele" DOP, roquette fraîche, parmesan Reggiano, pesto.',
    price_cents: 1500,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Napoleta di Bufala',
    description: 'Sauce tomate, jambon cru de Parme, Mozzarella di Bufala Campana AOP, tomates cerises confites, roquette, filet de pesto.',
    price_cents: 1350,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Primavera',
    description: 'Crème fraîche légère, mozzarella, jambon blanc supérieur, fromage de chèvre crémeux, olives noires, lit de roquette.',
    price_cents: 1250,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600'
  },

  // ==========================================
  // 3. PIZZAS CARNI (VIANDES & ÉPICES)
  // ==========================================
  {
    name: 'Pizza Pepperoni',
    description: 'Sauce tomate San Marzano, mozzarella fondante, généreuses tranches de pepperoni épicé italien, olives noires.',
    price_cents: 1200,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Cannibale',
    description: 'Sauce tomate, mozzarella, bœuf haché assaisonné maison, oignons émincés, poivrons marinés, œuf frais.',
    price_cents: 1300,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Salami Napoli',
    description: 'Sauce tomate, mozzarella, authentique salami doux de Naples, olives noires, origan.',
    price_cents: 1200,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Siciliana',
    description: 'Sauce tomate, mozzarella, salami Napoli, pepperoni épicé, jambon cru italien, olives noires de Nice.',
    price_cents: 1300,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Bolognese',
    description: 'Sauce tomate mijotée à la viande de bœuf haché, mozzarella, oignons confits, origan.',
    price_cents: 1200,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Con Pollo',
    description: 'Crème fraîche, mozzarella, émincé de poulet mariné aux herbes de Provence, champignons frais, œuf.',
    price_cents: 1300,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Toscane',
    description: 'Sauce tomate, mozzarella, poulet mariné, pommes de terre sautées, poivrons rouges, lardons fumés, oignons.',
    price_cents: 1300,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Mafiosa',
    description: 'Sauce tomate, mozzarella, pepperoni piquant, piments jalapeños mexicains, olives, cheddar fondant.',
    price_cents: 1250,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Diavola',
    description: 'Sauce tomate, mozzarella, salami piquant de Calabre, piments doux marinés, olives noires.',
    price_cents: 1250,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Firenze',
    description: 'Sauce tomate, mozzarella, merguez fraîche artisanale épicée, poivrons grillés, olives.',
    price_cents: 1300,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=600'
  },

  // ==========================================
  // 4. PIZZAS VEGETARIANI & FROMAGÈRES
  // ==========================================
  {
    name: 'Pizza Con Funghi',
    description: 'Sauce tomate San Marzano, mozzarella fondante, champignons frais de Paris poêlés, persillade maison.',
    price_cents: 1000,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Carciofi',
    description: 'Sauce tomate, mozzarella, cœurs d\'artichauts marinés à l\'huile d\'olive, olives noires, origan.',
    price_cents: 1000,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Bianca Chèvre & Miel',
    description: 'Crème fraîche, mozzarella, fromage de chèvre fondant, miel crémeux d\'acacia, cerneaux de noix, lit de roquette.',
    price_cents: 1200,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Vegetariana',
    description: 'Sauce tomate, mozzarella, aubergines grillées, courgettes fraîches, poivrons confits, persillade à l\'ail.',
    price_cents: 1250,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Venezia',
    description: 'Sauce tomate, mozzarella, épinards sautés, ricotta crémeuse, tomates cerises, pointe d\'ail, parmesan, olives.',
    price_cents: 1300,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=600'
  },

  // ==========================================
  // 5. PIZZAS PESCATORE (PRODUITS DE LA MER)
  // ==========================================
  {
    name: 'Pizza Pavarotti au Saumon',
    description: 'Crème fraîche à la ciboulette fraîche, mozzarella, lanières de saumon fumé de Norvège, pesto de basilic.',
    price_cents: 1300,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Frutti di Mare',
    description: 'Sauce tomate, mozzarella, moules de bouchot, crevettes roses, calamars tendres, persillade citronnée à l\'ail.',
    price_cents: 1300,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Scampia (Gambas)',
    description: 'Sauce tomate San Marzano, mozzarella, gambas marinées au piment doux et huile d\'olive, ail frais, basilic.',
    price_cents: 1300,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Al Tonno',
    description: 'Sauce tomate, mozzarella, thon albacore, oignons rouges émincés, câpres, olives noires.',
    price_cents: 1200,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Nissa (Spécialité Niçoise)',
    description: 'Sauce tomate, mozzarella, thon, filets d\'anchois, poivrons grillés, persillade maison, oignons rouges, olives caillettes de Nice.',
    price_cents: 1250,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=600'
  },

  // ==========================================
  // 6. SPÉCIALITÉS RÉGIONALES & GOURMANDES
  // ==========================================
  {
    name: 'Pizza Tartiflette',
    description: 'Crème fraîche, mozzarella, lardons fumés dorés, pommes de terre fondantes, Reblochon AOP crémeux, oignons.',
    price_cents: 1250,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Sud-Ovest (Canard & Miel)',
    description: 'Sauce tomate, mozzarella, fines tranches de magret de canard fumé, fromage de chèvre, miel d\'acacia, éclats de noix.',
    price_cents: 1250,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Mexicana',
    description: 'Sauce tomate, mozzarella, bœuf haché épicé, piments jalapeños, oignons, cheddar fondant, maïs doux, olives.',
    price_cents: 1300,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600'
  },

  // ==========================================
  // 7. SALADES FRAÎCHES MAISON
  // ==========================================
  {
    name: 'Salade Niçoise Authentique',
    description: 'Mesclun niçois, thon albacore, poivrons rouges, filets d\'anchois, oignons rouges, œuf dur bio, tomates cerises, persillade, olives caillettes de Nice, vinaigrette maison à l\'huile d\'olive.',
    price_cents: 1090,
    category: 'entree',
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Salade Little Italy',
    description: 'Mesclun, roquette, jambon cru italien affiné, Mozzarella di Bufala Campana AOP, tomates cerises, copeaux de parmesan, pesto Genovese, gressins croustillants, olives.',
    price_cents: 950,
    category: 'entree',
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Salade Caesar Poulet Pané',
    description: 'Laitue romaine, roquette, croustillant de filet de poulet pané maison, œuf dur, tomates cerises, copeaux de Parmigiano Reggiano, croûtons dorés, sauce Caesar maison.',
    price_cents: 950,
    category: 'entree',
    image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Salade Mixte',
    description: 'Mesclun frais, oignons rouges émincés, tomates cerises, réduction de crème de balsamique de Modène, copeaux de parmesan, vinaigrette maison.',
    price_cents: 650,
    category: 'entree',
    image_url: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=600'
  },

  // ==========================================
  // 8. BURGERS ARTISANAUX DON ROBERTO
  // ==========================================
  {
    name: 'Burger Classic Don Roberto',
    description: 'Pain brioché artisanal toasté, steak pur bœuf haché boucher 180g, cheddar affiné fondu, salade batavia, tomates fraîches, sauce burger maison. Servi avec frites.',
    price_cents: 1000,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Burger Royal Don Roberto',
    description: 'Steak haché boucher 180g, cheddar affiné, œuf au plat fermier, lard fumé grillé croustillant, salade, sauce burger & barbecue.',
    price_cents: 1200,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Burger Mountain (Raclette & Rösti)',
    description: 'Steak haché boucher 180g, généreux fromage à raclette fondant, lard fumé, galette rösti de pommes de terre dorée, salade, oignons confits, sauce tartare maison.',
    price_cents: 1200,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Burger Farmer Poulet Croustillant',
    description: 'Filet de poulet pané croustillant, cheddar affiné, œuf fermier, lard fumé grillé, salade fraîche, sauce tartare maison.',
    price_cents: 1200,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Double Big Burger (2x 100g)',
    description: '2 steaks hachés pur bœuf 100g, double tranche de cheddar fondu, salade, oignons, sauce burger maison.',
    price_cents: 1150,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1583032015879-633099955301?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Burger Veggie Gourmand',
    description: 'Galette de légumes panée croustillante, cheddar fondu, rösti de pommes de terre, salade, tomates, pesto, sauce blanche.',
    price_cents: 1100,
    category: 'plat',
    image_url: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=600'
  },

  // ==========================================
  // 9. DESSERTS / DOLCI MAISON
  // ==========================================
  {
    name: 'Tiramisu Maison Tradizionale',
    description: 'Recette familiale italienne : Biscuits Savoiardi imbibés d\'espresso Illy, crème onctueuse au mascarpone frais, cacao amer pur.',
    price_cents: 390,
    category: 'dessert',
    image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Nutella Gourmande',
    description: 'Pâte à pizza artisanale cuite au four à pierre, généreusement nappée de Nutella chaud et éclats de noisettes torréfiées.',
    price_cents: 700,
    category: 'dessert',
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Fondant au Chocolat Cœur Coulant',
    description: 'Gâteau moelleux au chocolat noir pur cacao avec son cœur coulant et fondant, servi tiède.',
    price_cents: 350,
    category: 'dessert',
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Tarte au Daim Croustillante',
    description: 'Tarte pâtissière aux éclats de bonbons Daim caramélisés et crème d\'amande fondante.',
    price_cents: 390,
    category: 'dessert',
    image_url: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Glace Häagen-Dazs (Pot 100ml)',
    description: 'Crème glacée premium Häagen-Dazs. Parfums au choix : Macadamia Nut Brittle, Vanilla Caramel Brownie, Cookie Dough.',
    price_cents: 390,
    category: 'dessert',
    image_url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=600'
  },

  // ==========================================
  // 10. BOISSONS & VINS ITALIENS
  // ==========================================
  {
    name: 'Chianti DOCG « Torre Delle Grazie » 75cl',
    description: 'Vin rouge toscan d\'appellation d\'origine contrôlée (12.5% vol). Arômes intenses de cerise noire et notes boisées.',
    price_cents: 1100,
    category: 'boisson',
    image_url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pinot Grigio « Garganega » 75cl',
    description: 'Vin blanc italien sec et minéral de Vénétie (12% vol). Idéal en accompagnement des pizzas et salades.',
    price_cents: 900,
    category: 'boisson',
    image_url: 'https://images.unsplash.com/photo-1558001373-7b93ee48ffa0?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Lambrusco Rosso Dell\'Emilia 75cl',
    description: 'Vin rouge pétillant italien doux (amabile), frais et fruité.',
    price_cents: 900,
    category: 'boisson',
    image_url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Bière Italienne Birra Moretti 33cl',
    description: 'Bière blonde lager italienne traditionnelle authentique, légère et désaltérante.',
    price_cents: 300,
    category: 'boisson',
    image_url: 'https://images.unsplash.com/photo-1608270191771-49b802677ce8?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Bière Italienne Peroni Nastro Azzurro 33cl',
    description: 'La bière blonde premium d\'Italie brassée à Rome, saveurs douces et fraîches.',
    price_cents: 300,
    category: 'boisson',
    image_url: 'https://images.unsplash.com/photo-1608270192770-355b4129b002?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Bière Artisanale Locale de Nice 33cl',
    description: 'Bière artisanale brassée dans le Comté de Nice, notes aromatiques et houblon frais.',
    price_cents: 400,
    category: 'boisson',
    image_url: 'https://images.unsplash.com/photo-1600718374662-0483d2b9da44?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'San Pellegrino Eau Pétillante 50cl',
    description: 'Eau minérale naturelle gazeuse italienne.',
    price_cents: 250,
    category: 'boisson',
    image_url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Eau Minérale Plate Cristalline 50cl',
    description: 'Bouteille d\'eau minérale naturelle de source 50cl.',
    price_cents: 100,
    category: 'boisson',
    image_url: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Coca-Cola Original 33cl',
    description: 'Canette fraîche 33cl.',
    price_cents: 200,
    category: 'boisson',
    image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Coca-Cola Zéro 33cl',
    description: 'Canette fraîche sans sucres 33cl.',
    price_cents: 200,
    category: 'boisson',
    image_url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Ice Tea Pêche 33cl',
    description: 'Thé glacé à la pêche saveur intense.',
    price_cents: 200,
    category: 'boisson',
    image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Fanta Orange / Sprite 33cl',
    description: 'Boisson rafraîchissante aux agrumes.',
    price_cents: 200,
    category: 'boisson',
    image_url: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&q=80&w=600'
  }
];

async function seedCleanDonRobertoMenu() {
  console.log('--- Nettoyage et Peuplement du Menu Officiel Don Roberto Nice (50+ items) ---');
  try {
    // 1. Suppression des anciens produits de test
    console.log('1. Nettoyage des anciens produits de test...');
    await pool.query('DELETE FROM order_items').catch(() => {});
    await pool.query('DELETE FROM products').catch(() => {});
    console.log('✅ Table products réinitialisée.');

    // 2. Insertion des 55 produits officiels
    console.log(`2. Insertion de ${fullDonRobertoMenu.length} produits authentiques Don Roberto...`);
    for (const p of fullDonRobertoMenu) {
      await pool.query(`
        INSERT INTO products (name, description, price_cents, category, is_available, image_url)
        VALUES ($1, $2, $3, $4, TRUE, $5)
      `, [p.name, p.description, p.price_cents, p.category, p.image_url]);
    }
    console.log(`✅ ${fullDonRobertoMenu.length} produits insérés avec succès !`);

    // 3. Affichage du récapitulatif par catégorie
    const countRes = await pool.query(`
      SELECT category, COUNT(*) as count, MIN(price_cents) as min_price, MAX(price_cents) as max_price
      FROM products 
      GROUP BY category 
      ORDER BY count DESC
    `);
    console.log('\n--- Récapitulatif de la Carte Don Roberto ---');
    console.table(countRes.rows);

  } catch (err) {
    console.error('❌ Erreur lors du seeding du menu Don Roberto :', err);
  } finally {
    await pool.end();
  }
}

seedCleanDonRobertoMenu();
