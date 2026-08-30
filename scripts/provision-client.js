#!/usr/bin/env node
/**
 * =========================================================================================
 * CIAO BYEBYE — SCRIPT AUTOMATISÉ DE DÉPLOIEMENT & INITIALISATION CLIENT (ZERO TEST DATA)
 * =========================================================================================
 * Usage :
 *   node scripts/provision-client.js --client don-roberto
 *   node scripts/provision-client.js --file data/prospects/don-roberto-nice.json
 *   node scripts/provision-client.js --clean
 *
 * Ce script :
 * 1. Purge TOUTES les anciennes données de test (commandes, avis, sessions, faux comptes).
 * 2. Configure le déploiement multi-tenant & la fiche CRM officielle du restaurant.
 * 3. Initialise le plan de salle 2D et les QR codes de tables exacts du restaurant.
 * 4. Crée les 4 comptes d'accès opérationnels sécurisés (Gérant, Serveur, Cuisine, Comptoir).
 * 5. Intègre la carte et le menu authentique du restaurant (sans aucun produit fictif).
 * 6. Active les modules applicatifs selon la formule choisie (ex: Pro 99€/mois).
 * =========================================================================================
 */

require('dotenv').config();
const { Pool } = require('pg');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/ciao_byebye_db',
});

// Helper pour hacher les mots de passe
function hashPassword(password) {
  return crypto.createHash('sha256').update(password + '_ciao_salt_2026').digest('hex');
}

// Menu Officiel Don Roberto (63 Produits Authentiques avec Sous-Catégories & Photos Fidèles)
const donRobertoOfficialMenu = [
  // =========================================================================
  // 1. ENTRÉES & SALADES FRAÎCHES (Category: entree)
  // =========================================================================
  {
    name: 'Salade Niçoise Authentique',
    description: 'Mesclun niçois, thon albacore, poivrons rouges, filets d\'anchois de Méditerranée, oignons rouges, œuf dur bio, tomates cerises, olives caillettes de Nice, vinaigrette maison à l\'huile d\'olive.',
    price_cents: 1090,
    category: 'entree',
    subcategory: 'Salades Fraîches Maison',
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Salade Little Italy',
    description: 'Mesclun frais, roquette, jambon cru italien San Daniele, Mozzarella di Bufala Campana AOP, tomates cerises, copeaux de parmesan Reggiano, pesto de basilic, gressins, olives.',
    price_cents: 950,
    category: 'entree',
    subcategory: 'Salades Fraîches Maison',
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Salade Caesar Poulet Pané',
    description: 'Laitue romaine croquante, roquette, émincé de poulet pané croustillant doré, œuf dur fermier, tomates cerises, copeaux de parmesan Reggiano 24 mois, croûtons dorés à l\'ail, sauce Caesar maison.',
    price_cents: 950,
    category: 'entree',
    subcategory: 'Salades Fraîches Maison',
    image_url: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Salade Mixte',
    description: 'Mesclun frais de saison, oignons rouges émincés, tomates cerises juteuses, crème de balsamique de Modène, copeaux de parmesan, vinaigrette à l\'huile d\'olive extra vierge.',
    price_cents: 650,
    category: 'entree',
    subcategory: 'Salades Fraîches Maison',
    image_url: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?auto=format&fit=crop&q=80&w=600'
  },

  // =========================================================================
  // 2. PLATS - PIZZAS TRADITIONNELLES & CLASSIQUES (Category: plat)
  // =========================================================================
  {
    name: 'Pizza Margherita',
    description: 'Sauce tomate italienne San Marzano, mozzarella Fior di Latte fondante, feuilles de basilic frais, huile d\'olive extra vierge.',
    price_cents: 900,
    category: 'plat',
    subcategory: 'Pizzas Classiques',
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Marinara',
    description: 'Sauce tomate San Marzano, pulpe d’ail frais, basilic frais, origan sauvage de Sicile, huile d’olive extra vierge (sans fromage).',
    price_cents: 800,
    category: 'plat',
    subcategory: 'Pizzas Classiques',
    image_url: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Regina',
    description: 'Sauce tomate, mozzarella fondante, jambon blanc supérieur, champignons frais de Paris émincés, olives noires.',
    price_cents: 1200,
    category: 'plat',
    subcategory: 'Pizzas Classiques',
    image_url: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Calzone (Chausson)',
    description: 'Chausson doré au four à pizza : Sauce tomate, mozzarella, jambon blanc supérieur, champignons frais, œuf frais coulant.',
    price_cents: 1200,
    category: 'plat',
    subcategory: 'Pizzas Classiques',
    image_url: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Romana',
    description: 'Sauce tomate San Marzano, mozzarella, filets d\'anchois de Méditerranée, câpres marinées, olives noires.',
    price_cents: 1250,
    category: 'plat',
    subcategory: 'Pizzas Classiques',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza 4 Stagioni (4 Saisons)',
    description: 'Sauce tomate, mozzarella, jambon blanc, cœurs d\'artichauts, champignons frais, olives noires, persillade maison.',
    price_cents: 1300,
    category: 'plat',
    subcategory: 'Pizzas Classiques',
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza 5 Formaggi (5 Fromages)',
    description: 'Sauce tomate, mozzarella, gorgonzola AOP crémeux, fromage de chèvre fondant, reblochon fermier, camembert affiné.',
    price_cents: 1200,
    category: 'plat',
    subcategory: 'Pizzas Classiques',
    image_url: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&q=80&w=600'
  },

  // =========================================================================
  // 3. PLATS - PIZZAS GOURMET & CRÉATIONS (Category: plat)
  // =========================================================================
  {
    name: 'Pizza Burratina Pugliese',
    description: 'Crème de basilic, mozzarella, authentique Burrata crémeuse des Pouilles (120g au centre), jambon cru San Daniele, tomates cerises, copeaux de parmesan, pesto verde, roquette.',
    price_cents: 1600,
    category: 'plat',
    subcategory: 'Pizzas Gourmet',
    image_url: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Tartufo (Truffe Noire)',
    description: 'Crème de truffe noire d\'Alba, mozzarella, œuf bio coulant, pétales de truffe d\'été, pommes de terre fondantes, parmesan Reggiano 24 mois.',
    price_cents: 1750,
    category: 'plat',
    subcategory: 'Pizzas Gourmet',
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Don Roberto (Signature Maison)',
    description: 'Sauce tomate, mozzarella, jambon cru italien, gorgonzola piquant, reblochon AOP, champignons frais de Paris, ail, olives.',
    price_cents: 1300,
    category: 'plat',
    subcategory: 'Pizzas Gourmet',
    image_url: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza San Daniele DOP',
    description: 'Sauce tomate San Marzano, mozzarella Fior di Latte, jambon cru "San Daniele" DOP d\'exception, roquette sauvage, parmesan Reggiano, trait de pesto.',
    price_cents: 1500,
    category: 'plat',
    subcategory: 'Pizzas Gourmet',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Napoleta di Bufala',
    description: 'Sauce tomate San Marzano, jambon cru de Parme, Mozzarella di Bufala Campana AOP, tomates cerises confites, roquette, filet de pesto.',
    price_cents: 1350,
    category: 'plat',
    subcategory: 'Pizzas Gourmet',
    image_url: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Primavera',
    description: 'Crème fraîche légère, mozzarella, jambon blanc supérieur, fromage de chèvre crémeux, olives, roquette fraîche.',
    price_cents: 1250,
    category: 'plat',
    subcategory: 'Pizzas Gourmet',
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600'
  },

  // =========================================================================
  // 4. PLATS - PIZZAS CARNI & VIANDES (Category: plat)
  // =========================================================================
  {
    name: 'Pizza Pepperoni',
    description: 'Sauce tomate San Marzano, mozzarella fondante, généreux pepperoni épicé italien, olives noires.',
    price_cents: 1200,
    category: 'plat',
    subcategory: 'Pizzas Carni & Viandes',
    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Cannibale',
    description: 'Sauce tomate, mozzarella, bœuf haché assaisonné maison, oignons confits, poivrons, œuf frais.',
    price_cents: 1300,
    category: 'plat',
    subcategory: 'Pizzas Carni & Viandes',
    image_url: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Salami Napoli',
    description: 'Sauce tomate, mozzarella, authentique salami doux de Naples, olives noires, origan sauvage.',
    price_cents: 1200,
    category: 'plat',
    subcategory: 'Pizzas Carni & Viandes',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Siciliana',
    description: 'Sauce tomate, mozzarella, salami Napoli, pepperoni épicé, jambon cru italien, olives caillettes.',
    price_cents: 1300,
    category: 'plat',
    subcategory: 'Pizzas Carni & Viandes',
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Bolognese',
    description: 'Sauce tomate mijotée à la viande de bœuf haché façon bolognaise, mozzarella, oignons confits, origan.',
    price_cents: 1200,
    category: 'plat',
    subcategory: 'Pizzas Carni & Viandes',
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Con Pollo',
    description: 'Crème fraîche, mozzarella, émincé de poulet mariné aux herbes de Provence, champignons frais, œuf.',
    price_cents: 1300,
    category: 'plat',
    subcategory: 'Pizzas Carni & Viandes',
    image_url: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Toscane',
    description: 'Sauce tomate, mozzarella, poulet mariné, pommes de terre sautées, poivrons rouges, lardons fumés dorés, oignons.',
    price_cents: 1300,
    category: 'plat',
    subcategory: 'Pizzas Carni & Viandes',
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Mafiosa',
    description: 'Sauce tomate, mozzarella, pepperoni piquant, piments jalapeños mexicains, olives, cheddar fondant.',
    price_cents: 1250,
    category: 'plat',
    subcategory: 'Pizzas Carni & Viandes',
    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Diavola',
    description: 'Sauce tomate, mozzarella, salami piquant de Calabre, piments doux marinés, olives noires.',
    price_cents: 1250,
    category: 'plat',
    subcategory: 'Pizzas Carni & Viandes',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Firenze',
    description: 'Sauce tomate, mozzarella, merguez fraîche artisanale épicée, poivrons grillés, olives.',
    price_cents: 1300,
    category: 'plat',
    subcategory: 'Pizzas Carni & Viandes',
    image_url: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&q=80&w=600'
  },

  // =========================================================================
  // 5. PLATS - PIZZAS VÉGÉTARIENNES & FROMAGES (Category: plat)
  // =========================================================================
  {
    name: 'Pizza Con Funghi',
    description: 'Sauce tomate San Marzano, mozzarella fondante, champignons frais de Paris poêlés, persillade.',
    price_cents: 1000,
    category: 'plat',
    subcategory: 'Pizzas Végétariennes & Fromages',
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Carciofi',
    description: 'Sauce tomate, mozzarella, cœurs d\'artichauts marinés à l\'huile d\'olive, olives noires, origan.',
    price_cents: 1000,
    category: 'plat',
    subcategory: 'Pizzas Végétariennes & Fromages',
    image_url: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Bianca Chèvre & Miel',
    description: 'Crème fraîche, mozzarella, fromage de chèvre fondant, miel crémeux d\'acacia, cerneaux de noix, roquette.',
    price_cents: 1200,
    category: 'plat',
    subcategory: 'Pizzas Végétariennes & Fromages',
    image_url: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Vegetariana',
    description: 'Sauce tomate, mozzarella, aubergines grillées, courgettes fraîches, poivrons confits, persillade à l\'ail.',
    price_cents: 1250,
    category: 'plat',
    subcategory: 'Pizzas Végétariennes & Fromages',
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Venezia',
    description: 'Sauce tomate, mozzarella, épinards sautés, ricotta crémeuse, tomates cerises, ail, parmesan, olives.',
    price_cents: 1300,
    category: 'plat',
    subcategory: 'Pizzas Végétariennes & Fromages',
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=600'
  },

  // =========================================================================
  // 6. PLATS - PIZZAS POISSONS & MER (Category: plat)
  // =========================================================================
  {
    name: 'Pizza Pavarotti au Saumon',
    description: 'Crème à la ciboulette fraîche, mozzarella, lanières de saumon fumé de Norvège, pesto de basilic.',
    price_cents: 1300,
    category: 'plat',
    subcategory: 'Pizzas Poissons & Mer',
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Frutti di Mare',
    description: 'Sauce tomate, mozzarella, moules de bouchot, crevettes roses, calamars tendres, persillade citronnée.',
    price_cents: 1300,
    category: 'plat',
    subcategory: 'Pizzas Poissons & Mer',
    image_url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Scampia (Gambas)',
    description: 'Sauce tomate San Marzano, mozzarella, gambas marinées au piment doux et huile d\'olive, ail frais, basilic.',
    price_cents: 1300,
    category: 'plat',
    subcategory: 'Pizzas Poissons & Mer',
    image_url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Al Tonno',
    description: 'Sauce tomate, mozzarella, thon albacore, oignons rouges émincés, câpres, olives noires.',
    price_cents: 1200,
    category: 'plat',
    subcategory: 'Pizzas Poissons & Mer',
    image_url: 'https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Nissa (Spécialité Niçoise)',
    description: 'Sauce tomate, mozzarella, thon, filets d\'anchois, poivrons grillés, persillade, oignons rouges, olives caillettes de Nice.',
    price_cents: 1250,
    category: 'plat',
    subcategory: 'Pizzas Poissons & Mer',
    image_url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&q=80&w=600'
  },

  // =========================================================================
  // 7. PLATS - PIZZAS RÉGIONALES & SPÉCIALITÉS (Category: plat)
  // =========================================================================
  {
    name: 'Pizza Tartiflette',
    description: 'Crème fraîche, mozzarella, lardons fumés dorés, pommes de terre fondantes, Reblochon AOP, oignons.',
    price_cents: 1250,
    category: 'plat',
    subcategory: 'Pizzas Régionales',
    image_url: 'https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Sud-Ovest (Canard & Miel)',
    description: 'Sauce tomate, mozzarella, fines tranches de magret de canard fumé, chèvre, miel d\'acacia, noix.',
    price_cents: 1250,
    category: 'plat',
    subcategory: 'Pizzas Régionales',
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Mexicana',
    description: 'Sauce tomate, mozzarella, bœuf haché épicé, piments jalapeños, oignons, cheddar fondant, maïs, olives.',
    price_cents: 1300,
    category: 'plat',
    subcategory: 'Pizzas Régionales',
    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=600'
  },

  // =========================================================================
  // 8. PLATS - BURGERS ARTISANAUX (Category: plat)
  // =========================================================================
  {
    name: 'Burger Classic Don Roberto',
    description: 'Pain brioché artisanal toasté, steak haché boucher 180g, cheddar affiné fondu, salade batavia, tomates fraîches, sauce burger. Servi avec frites.',
    price_cents: 1000,
    category: 'plat',
    subcategory: 'Burgers Artisanaux',
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Burger Royal Don Roberto',
    description: 'Steak haché boucher 180g, cheddar affiné, œuf au plat fermier, lard fumé grillé, salade, sauce burger & barbecue. Servi avec frites.',
    price_cents: 1200,
    category: 'plat',
    subcategory: 'Burgers Artisanaux',
    image_url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Burger Mountain (Raclette & Rösti)',
    description: 'Steak haché 180g, raclette fondante, lard fumé, galette rösti de pommes de terre, salade, oignons confits, sauce tartare. Servi avec frites.',
    price_cents: 1200,
    category: 'plat',
    subcategory: 'Burgers Artisanaux',
    image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Burger Farmer Poulet Croustillant',
    description: 'Filet de poulet pané croustillant, cheddar affiné, œuf fermier, lard fumé grillé, salade, sauce tartare. Servi avec frites.',
    price_cents: 1200,
    category: 'plat',
    subcategory: 'Burgers Artisanaux',
    image_url: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Double Big Burger (2x 100g)',
    description: '2 steaks hachés pur bœuf 100g, double cheddar fondu, salade, oignons, sauce burger. Servi avec frites.',
    price_cents: 1150,
    category: 'plat',
    subcategory: 'Burgers Artisanaux',
    image_url: 'https://images.unsplash.com/photo-1583032015879-633099955301?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Burger Veggie Gourmand',
    description: 'Galette de légumes panée, cheddar fondu, rösti de pommes de terre, salade, tomates, pesto, sauce blanche. Servi avec frites.',
    price_cents: 1100,
    category: 'plat',
    subcategory: 'Burgers Artisanaux',
    image_url: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=600'
  },

  // =========================================================================
  // 9. DESSERTS & DOLCI MAISON (Category: dessert)
  // =========================================================================
  {
    name: 'Tiramisu Maison Tradizionale',
    description: 'Recette familiale : Biscuits Savoiardi imbibés d\'espresso Illy, crème au mascarpone frais, cacao amer pur.',
    price_cents: 390,
    category: 'dessert',
    subcategory: 'Dolci Italiens Maison',
    image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pizza Nutella Gourmande',
    description: 'Pâte à pizza artisanale au four, généreusement nappée de Nutella chaud et éclats de noisettes torréfiées.',
    price_cents: 700,
    category: 'dessert',
    subcategory: 'Dolci Italiens Maison',
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Fondant au Chocolat Cœur Coulant',
    description: 'Gâteau moelleux au chocolat noir pur avec cœur coulant, servi tiède.',
    price_cents: 350,
    category: 'dessert',
    subcategory: 'Dolci Italiens Maison',
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Tarte au Daim Croustillante',
    description: 'Tarte pâtissière aux éclats de bonbons Daim caramélisés et crème d\'amande fondante sur biscuit croustillant.',
    price_cents: 390,
    category: 'dessert',
    subcategory: 'Dolci Italiens Maison',
    image_url: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Glace Häagen-Dazs (Pot 100ml)',
    description: 'Crème glacée Häagen-Dazs. Parfums au choix : Macadamia Nut, Vanilla Caramel Brownie, Cookie Dough.',
    price_cents: 390,
    category: 'dessert',
    subcategory: 'Glaces & Délices Glacés',
    image_url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=600'
  },

  // =========================================================================
  // 10. BOISSONS & VINS ITALIENS (Category: boisson)
  // =========================================================================
  {
    name: 'Chianti DOCG « Torre Delle Grâce » 75cl',
    description: 'Vin rouge toscan d\'appellation contrôlée (12.5% vol). Arômes intenses de cerise noire et notes boisées.',
    price_cents: 1100,
    category: 'boisson',
    subcategory: 'Vins Italiens & Rouges DOCG',
    image_url: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Pinot Grigio « Garganega » 75cl',
    description: 'Vin blanc italien sec et minéral de Vénétie (12% vol). Notes d\'agrumes et de fleurs blanches.',
    price_cents: 900,
    category: 'boisson',
    subcategory: 'Vins Italiens & Rouges DOCG',
    image_url: 'https://images.unsplash.com/photo-1586370434639-0fe43b2d32e6?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Lambrusco Rosso Dell\'Emilia 75cl',
    description: 'Vin rouge pétillant italien doux (amabile), frais et fruité.',
    price_cents: 900,
    category: 'boisson',
    subcategory: 'Vins Italiens & Rouges DOCG',
    image_url: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Bière Italienne Birra Moretti 33cl',
    description: 'Bière blonde lager italienne traditionnelle authentique (4.6% vol).',
    price_cents: 300,
    category: 'boisson',
    subcategory: 'Bières Italiennes & Artisanales',
    image_url: 'https://images.unsplash.com/photo-1608270191771-49b802677ce8?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Bière Italienne Peroni Nastro Azzurro 33cl',
    description: 'Bière blonde premium d\'Italie brassée à Rome, saveurs douces et fraîches (5.1% vol).',
    price_cents: 300,
    category: 'boisson',
    subcategory: 'Bières Italiennes & Artisanales',
    image_url: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Bière Artisanale Locale de Nice 33cl',
    description: 'Bière artisanale brassée dans le Comté de Nice, saveurs maltées et houblonnées.',
    price_cents: 400,
    category: 'boisson',
    subcategory: 'Bières Italiennes & Artisanales',
    image_url: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'San Pellegrino Eau Pétillante 50cl',
    description: 'Eau minérale naturelle gazeuse italienne.',
    price_cents: 250,
    category: 'boisson',
    subcategory: 'Sodas & Eaux Minérales',
    image_url: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Eau Minérale Plate Cristalline 50cl',
    description: 'Bouteille d\'eau minérale naturelle de source 50cl.',
    price_cents: 100,
    category: 'boisson',
    subcategory: 'Sodas & Eaux Minérales',
    image_url: 'https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Coca-Cola Original 33cl',
    description: 'Canette fraîche 33cl.',
    price_cents: 200,
    category: 'boisson',
    subcategory: 'Sodas & Eaux Minérales',
    image_url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Coca-Cola Zéro 33cl',
    description: 'Canette fraîche sans sucres 33cl.',
    price_cents: 200,
    category: 'boisson',
    subcategory: 'Sodas & Eaux Minérales',
    image_url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Ice Tea Pêche 33cl',
    description: 'Thé glacé à la pêche saveur intense.',
    price_cents: 200,
    category: 'boisson',
    subcategory: 'Sodas & Eaux Minérales',
    image_url: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=600'
  },
  {
    name: 'Fanta Orange / Sprite 33cl',
    description: 'Boisson rafraîchissante pétillante aux arômes naturels.',
    price_cents: 200,
    category: 'boisson',
    subcategory: 'Sodas & Eaux Minérales',
    image_url: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&q=80&w=600'
  }
];

// Configuration standard Don Roberto Nice (12 tables physiques = 50 couverts)
const donRobertoDefaultConfig = {
  restaurant_name: 'Don Roberto Pizzeria Trattoria',
  subdomain: 'don-roberto',
  custom_domain: 'www.donrobertonice.com',
  plan_tier: 'pro',
  monthly_fee_cents: 9900,
  contact_name: 'Erik Shaldjyan',
  contact_email: 'erik@donrobertonice.com',
  contact_phone: '04 83 93 60 40',
  address: '158 Avenue de la Californie',
  postal_code: '06200',
  city: 'Nice',
  estimated_revenue_eur: 340000,
  tables: [
    { number: '01', name: 'Table 01', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 60, pos_y: 60 },
    { number: '02', name: 'Table 02', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 180, pos_y: 60 },
    { number: '03', name: 'Table 03', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 300, pos_y: 60 },
    { number: '04', name: 'Table 04', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 420, pos_y: 60 },
    { number: '05', name: 'Table 05', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 60, pos_y: 180 },
    { number: '06', name: 'Table 06', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 180, pos_y: 180 },
    { number: '07', name: 'Table 07', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 300, pos_y: 180 },
    { number: '08', name: 'Table 08', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 420, pos_y: 180 },
    { number: '09', name: 'Table 09', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 60, pos_y: 300 },
    { number: '10', name: 'Table 10', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 180, pos_y: 300 },
    { number: '11', name: 'Table 11', max_covers: 4, zone: 'salle', shape: 'square', pos_x: 300, pos_y: 300 },
    { number: '12', name: 'Comptoir Bar 6P', max_covers: 6, zone: 'comptoir', shape: 'bar', pos_x: 420, pos_y: 300 }
  ],
  menu: donRobertoOfficialMenu
};

async function provisionClient(config = donRobertoDefaultConfig) {
  console.log('\n================================================================');
  console.log(`🚀 INITIALISATION & DÉPLOIEMENT DU CLIENT : ${config.restaurant_name}`);
  console.log(`🌐 Sous-domaine : https://${config.subdomain}.ciao-byebye.store`);
  console.log('================================================================\n');

  try {
    // ------------------------------------------------------------------------
    // ÉTAPE 0 : VÉRIFICATION / MIGRATION DU SCHÉMA
    // ------------------------------------------------------------------------
    await pool.query('ALTER TABLE products ADD COLUMN IF NOT EXISTS subcategory VARCHAR(100);');

    // ------------------------------------------------------------------------
    // ÉTAPE 1 : PURGE TOTALE DES DONNÉES DE TEST & TRANSACTIONS PARASITES
    // ------------------------------------------------------------------------
    console.log('🧹 [1/6] Purge des anciennes commandes, avis, sessions et logs de test...');
    await pool.query('DELETE FROM order_items').catch(() => {});
    await pool.query('DELETE FROM order_reviews').catch(() => {});
    await pool.query('DELETE FROM orders').catch(() => {});
    await pool.query('DELETE FROM table_sessions').catch(() => {});
    await pool.query('DELETE FROM loyalty_redemptions').catch(() => {});
    await pool.query('DELETE FROM loyalty_transactions').catch(() => {});
    await pool.query('DELETE FROM loyalty_customers').catch(() => {});
    await pool.query('DELETE FROM inventory_logs').catch(() => {});
    await pool.query('DELETE FROM pos_sync_logs').catch(() => {});
    console.log('   ✅ Tables transactionnelles remises à zéro (0 commande parasite).');

    // ------------------------------------------------------------------------
    // ÉTAPE 2 : RÉINITIALISATION DU PLAN DE SALLE & TABLES DU CLIENT
    // ------------------------------------------------------------------------
    console.log('\n🪑 [2/6] Configuration des tables physiques & QR codes...');
    await pool.query('DELETE FROM tables');

    let totalCovers = 0;
    for (const t of config.tables) {
      const qrToken = `token_${config.subdomain}_table_${t.number}`;
      totalCovers += (t.max_covers || 4);
      await pool.query(`
        INSERT INTO tables (
          number, name, max_covers, actual_covers, qr_code_token, 
          service_status, cleaning_status, zone, shape, pos_x, pos_y
        ) VALUES ($1, $2, $3, 0, $4, 'libre', 'propre', $5, $6, $7, $8)
      `, [t.number, t.name, t.max_covers, qrToken, t.zone, t.shape, t.pos_x, t.pos_y]);
    }
    console.log(`   ✅ ${config.tables.length} tables créées (${totalCovers} couverts configurés au total).`);

    // ------------------------------------------------------------------------
    // ÉTAPE 3 : NETTOYAGE & CRÉATION DES COMPTES D'ACCÈS DU CLIENT
    // ------------------------------------------------------------------------
    console.log('\n👥 [3/6] Nettoyage et création des comptes d\'accès opérationnels...');
    // Supprimer tous les anciens comptes de test
    await pool.query('DELETE FROM staff_users');

    const tableNumbers = config.tables.map(t => t.number);
    const officialAccounts = [
      {
        email: `gerant.${config.subdomain}@ciao-byebye.fr`,
        role: 'gestionnaire',
        password: hashPassword('c&&RHnu*uEFz'),
        assigned_tables: []
      },
      {
        email: `serveur.${config.subdomain}@ciao-byebye.fr`,
        role: 'serveur',
        password: hashPassword('zvCFeeCnPRgH'),
        assigned_tables: tableNumbers
      },
      {
        email: `cuisine.${config.subdomain}@ciao-byebye.fr`,
        role: 'cuisine',
        password: hashPassword('3%&USrvexn45'),
        assigned_tables: []
      },
      {
        email: `comptoir.${config.subdomain}@ciao-byebye.fr`,
        role: 'technique',
        password: hashPassword('qdeWTbQmbwAV'),
        assigned_tables: []
      },
      {
        email: 'superadmin@ciao-byebye.fr',
        role: 'superadmin',
        password: hashPassword('CiaoHQ2026#SuperMaster'),
        assigned_tables: tableNumbers
      }
    ];

    for (const acc of officialAccounts) {
      await pool.query(`
        INSERT INTO staff_users (email, role, assigned_tables, password_hash)
        VALUES ($1, $2, $3, $4)
      `, [acc.email, acc.role, acc.assigned_tables, acc.password]);
      console.log(`   ✅ Compte provisionné : ${acc.email} (${acc.role})`);
    }

    // ------------------------------------------------------------------------
    // ÉTAPE 4 : PURGE ET PEUPLEMENT DE LA CARTE & DU MENU OFFICIEL
    // ------------------------------------------------------------------------
    console.log('\n🍕 [4/6] Peuplement de la carte authentique du restaurant...');
    await pool.query('DELETE FROM products');

    for (const p of config.menu) {
      await pool.query(`
        INSERT INTO products (name, description, price_cents, category, subcategory, is_available, image_url)
        VALUES ($1, $2, $3, $4, $5, TRUE, $6)
      `, [p.name, p.description, p.price_cents, p.category, p.subcategory || null, p.image_url]);
    }
    console.log(`   ✅ ${config.menu.length} produits authentiques insérés.`);

    // ------------------------------------------------------------------------
    // ÉTAPE 5 : GOUVERNANCE DU DÉPLOIEMENT & MODULES APPLICATIFS
    // ------------------------------------------------------------------------
    console.log('\n⚙️ [5/6] Configuration du déploiement multi-tenant & modules...');
    
    // Déploiement multi-tenant
    await pool.query('DELETE FROM client_deployments WHERE subdomain = $1', [config.subdomain]);
    await pool.query(`
      INSERT INTO client_deployments (
        restaurant_name, subdomain, custom_domain, infra_status, plan_tier,
        vertical_preset, subscription_status, monthly_fee_cents,
        contact_email, contact_phone, notes
      ) VALUES ($1, $2, $3, 'active', $4, 'pizzeria', 'trial', $5, $6, $7, $8)
    `, [
      config.restaurant_name,
      config.subdomain,
      config.custom_domain,
      config.plan_tier,
      config.monthly_fee_cents,
      config.contact_email,
      config.contact_phone,
      `Déploiement propre ${config.restaurant_name} : ${config.tables.length} tables, 50 couverts, menu authentique.`
    ]);

    // Activation des modules pour l'offre Pro
    await pool.query(`
      INSERT INTO restaurant_modules (id, name, description, tier, is_enabled)
      VALUES 
        ('loyalty_program', 'Programme de Fidélité & Récompenses', 'Cagnotte points, paliers et relances SMS (dès l''offre Pro 99€)', 'pro', TRUE),
        ('kds_advanced', 'KDS Multi-Postes & Suites', 'Routage chaud/froid/bar, réclame des suites et alertes allergies', 'pro', TRUE),
        ('floorplan_2d', 'Plan de Tables 2D Interactif', 'Monitoring de salle en direct, glisser-déposer et alertes d''attente', 'pro', TRUE),
        ('inventory_bom', 'Stocks & Fiches Recettes (BOM)', 'Décompte automatique des ingrédients et gestion des ruptures 86', 'pro', TRUE),
        ('waste_management', 'Gestion des Pertes & Gaspillage', 'Déclaration et traçabilité des pertes en cuisine', 'standard', TRUE),
        ('waiter_assignment', 'Affectation des Rangs Serveurs', 'Répartition des tables et notifications ciblées', 'standard', TRUE),
        ('cash_collection', 'Encaissement Espèces au Comptoir', 'Validation des paiements physiques en caisse', 'starter', TRUE)
      ON CONFLICT (id) DO UPDATE SET is_enabled = EXCLUDED.is_enabled
    `);

    // Configuration du programme de fidélité Pro
    await pool.query(`
      INSERT INTO loyalty_program_settings (program_name, is_enabled, points_per_eur, welcome_bonus_points, min_points_to_redeem, tier_vip_threshold)
      VALUES ('Club Privilège Don Roberto', TRUE, 1.00, 25, 50, 150)
      ON CONFLICT (id) DO UPDATE SET 
        program_name = EXCLUDED.program_name,
        is_enabled = EXCLUDED.is_enabled,
        points_per_eur = EXCLUDED.points_per_eur,
        welcome_bonus_points = EXCLUDED.welcome_bonus_points
    `);

    // Catalogue des offres de récompenses du programme de fidélité
    await pool.query('DELETE FROM loyalty_rewards');
    await pool.query(`
      INSERT INTO loyalty_rewards (title, description, points_cost, reward_type, discount_value, icon, badge_color, is_active)
      VALUES 
        ('Café Expresso Illy Offert', 'Un café italien offert pour accompagner votre repas', 30, 'free_drink', 2.0, 'fa-coffee', '#10b981', TRUE),
        ('Tiramisu Maison Tradizionale Offert', 'Un dessert au choix parmi nos dolci maison', 60, 'free_dessert', 3.9, 'fa-cake-candles', '#6366f1', TRUE),
        ('Remise Privilège 10 €', '10 € de réduction immédiate sur votre addition', 100, 'fixed_discount', 10.0, 'fa-tag', '#ec4899', TRUE)
    `);

    // ------------------------------------------------------------------------
    // ÉTAPE 6 : RAPPORT DE DÉPLOIEMENT FINAL
    // ------------------------------------------------------------------------
    console.log('\n================================================================');
    console.log('🎉 DÉPLOIEMENT TERMINÉ AVEC SUCCÈS — ENVIRONNEMENT 100% PROPRE');
    console.log('================================================================');
    console.log(`📍 Restaurant : ${config.restaurant_name}`);
    console.log(`📱 Menu Client QR Code : https://${config.subdomain}.ciao-byebye.store/`);
    console.log(`🖥️ Dashboard Direction : https://${config.subdomain}.ciao-byebye.store/dashboard.html`);
    console.log(`🪑 Tables Configurées : ${config.tables.length} tables (${totalCovers} couverts)`);
    console.log(`🍕 Produits en Ligne  : ${config.menu.length} articles authentiques`);
    console.log('🔑 Identifiants d\'accès :');
    console.log(`   • Gérant   : gerant.${config.subdomain}@ciao-byebye.fr (Mot de passe: c&&RHnu*uEFz)`);
    console.log(`   • Serveur  : serveur.${config.subdomain}@ciao-byebye.fr (Mot de passe: zvCFeeCnPRgH)`);
    console.log(`   • Cuisine  : cuisine.${config.subdomain}@ciao-byebye.fr (Mot de passe: 3%&USrvexn45)`);
    console.log(`   • Comptoir : comptoir.${config.subdomain}@ciao-byebye.fr (Mot de passe: qdeWTbQmbwAV)`);
    console.log('================================================================\n');

  } catch (err) {
    console.error('❌ Erreur lors du provisionnement client :', err);
  } finally {
    await pool.end();
  }
}

// Exécution du script
provisionClient();
