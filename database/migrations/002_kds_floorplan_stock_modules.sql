-- Migration 002: Plan de Tables 2D, KDS Avancé (Sièges, Suites, Allergies), Stocks BOM & Feature Toggles

-- 1. Évolution de la table des tables
ALTER TABLE tables 
  ADD COLUMN IF NOT EXISTS name VARCHAR(50),
  ADD COLUMN IF NOT EXISTS zone VARCHAR(50) DEFAULT 'salle', -- 'salle', 'terrasse', 'mezzanine', 'bar'
  ADD COLUMN IF NOT EXISTS shape VARCHAR(20) DEFAULT 'square', -- 'square', 'round', 'rect', 'high_top', 'bar_seat'
  ADD COLUMN IF NOT EXISTS min_covers INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS max_covers INTEGER DEFAULT 4,
  ADD COLUMN IF NOT EXISTS nominal_covers INTEGER DEFAULT 4,
  ADD COLUMN IF NOT EXISTS actual_covers INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS pos_x INTEGER DEFAULT 100,
  ADD COLUMN IF NOT EXISTS pos_y INTEGER DEFAULT 100,
  ADD COLUMN IF NOT EXISTS width INTEGER DEFAULT 100,
  ADD COLUMN IF NOT EXISTS height INTEGER DEFAULT 100,
  ADD COLUMN IF NOT EXISTS service_status VARCHAR(50) DEFAULT 'libre', -- 'libre', 'reservee', 'commande_prise', 'en_attente_envoi', 'en_preparation', 'servie', 'addition_demandee'
  ADD COLUMN IF NOT EXISTS cleaning_status VARCHAR(50) DEFAULT 'propre', -- 'propre', 'a_debarrasser', 'a_desinfecter'
  ADD COLUMN IF NOT EXISTS merged_parent_id UUID REFERENCES tables(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS service_started_at TIMESTAMP WITH TIME ZONE,
  ADD COLUMN IF NOT EXISTS last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

-- Index pour les tables
CREATE INDEX IF NOT EXISTS idx_tables_zone ON tables(zone);
CREATE INDEX IF NOT EXISTS idx_tables_service_status ON tables(service_status);

-- 2. Évolution de la table order_items
ALTER TABLE order_items
  ADD COLUMN IF NOT EXISTS seat_number INTEGER DEFAULT 1,
  ADD COLUMN IF NOT EXISTS course_step VARCHAR(50) DEFAULT 'plat', -- 'boisson', 'entree', 'plat', 'dessert'
  ADD COLUMN IF NOT EXISTS course_status VARCHAR(50) DEFAULT 'fire', -- 'hold', 'fire', 'ready', 'served'
  ADD COLUMN IF NOT EXISTS station VARCHAR(50) DEFAULT 'chaud', -- 'chaud', 'froid', 'bar', 'passe'
  ADD COLUMN IF NOT EXISTS modifiers JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS allergies JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS cooking_pref VARCHAR(50),
  ADD COLUMN IF NOT EXISTS allergy_acknowledged BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS bumped_at TIMESTAMP WITH TIME ZONE;

-- 3. Table des modules et offres d'abonnement (Feature Toggles)
CREATE TABLE IF NOT EXISTS restaurant_modules (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    tier VARCHAR(50) NOT NULL, -- 'starter', 'standard', 'pro'
    is_enabled BOOLEAN DEFAULT TRUE,
    category VARCHAR(50) DEFAULT 'general',
    settings JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Table des ingrédients pour l'inventaire
CREATE TABLE IF NOT EXISTS ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) DEFAULT 'autre', -- 'viande', 'legume', 'produit_laitier', 'epicerie', 'boisson', 'consommable'
    unit VARCHAR(20) NOT NULL, -- 'g', 'cl', 'piece'
    current_stock NUMERIC(10, 2) NOT NULL DEFAULT 0,
    min_threshold NUMERIC(10, 2) NOT NULL DEFAULT 10,
    is_86 BOOLEAN DEFAULT FALSE,
    cost_per_unit_cents INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Table des fiches techniques (BOM - Bill of Materials)
CREATE TABLE IF NOT EXISTS product_ingredients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE RESTRICT,
    quantity NUMERIC(10, 2) NOT NULL,
    is_removable BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_product_ingredient UNIQUE (product_id, ingredient_id)
);

-- 6. Table des journaux d'inventaire et pertes (Waste Management)
CREATE TABLE IF NOT EXISTS inventory_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ingredient_id UUID NOT NULL REFERENCES ingredients(id) ON DELETE CASCADE,
    quantity_change NUMERIC(10, 2) NOT NULL,
    reason VARCHAR(100) NOT NULL, -- 'order_deduction', 'bump_deduction', 'waste_error', 'waste_allergy', 'waste_spoilage', 'restock', 'manual_adjustment'
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    staff_email VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Données initiales des tables de salle (Zones & Capacités)
UPDATE tables SET 
  name = 'Table ' || number,
  zone = CASE 
    WHEN number IN ('01', '02') THEN 'salle'
    WHEN number IN ('03', '04') THEN 'terrasse'
    WHEN number = '05' THEN 'mezzanine'
    ELSE 'salle'
  END,
  shape = CASE 
    WHEN number = '01' THEN 'square'
    WHEN number = '02' THEN 'round'
    WHEN number = '03' THEN 'rect'
    WHEN number = '04' THEN 'high_top'
    WHEN number = '05' THEN 'square'
    ELSE 'square'
  END,
  min_covers = CASE WHEN number = '03' THEN 2 WHEN number = '04' THEN 1 ELSE 2 END,
  max_covers = CASE WHEN number = '03' THEN 6 WHEN number = '04' THEN 2 ELSE 4 END,
  nominal_covers = CASE WHEN number = '03' THEN 6 WHEN number = '04' THEN 2 ELSE 4 END,
  pos_x = CASE WHEN number = '01' THEN 60 WHEN number = '02' THEN 220 WHEN number = '03' THEN 380 WHEN number = '04' THEN 580 WHEN number = '05' THEN 740 ELSE 100 END,
  pos_y = CASE WHEN number = '01' THEN 60 WHEN number = '02' THEN 60 WHEN number = '03' THEN 60 WHEN number = '04' THEN 60 WHEN number = '05' THEN 60 ELSE 100 END,
  width = CASE WHEN number = '03' THEN 140 ELSE 100 END,
  height = 100
WHERE number IN ('01', '02', '03', '04', '05');

-- Insertion de tables additionnelles pour enrichir le plan (Bar, Terrasse, Mezzanine)
INSERT INTO tables (number, name, qr_code_token, zone, shape, min_covers, max_covers, nominal_covers, pos_x, pos_y, width, height, status, service_status) VALUES
('06', 'Table 06', 'token_table_06', 'salle', 'round', 2, 4, 4, 60, 200, 100, 100, 'libre', 'libre'),
('07', 'Table 07', 'token_table_07', 'salle', 'rect', 4, 8, 8, 220, 200, 150, 100, 'libre', 'libre'),
('08', 'Table 08 (Terrasse)', 'token_table_08', 'terrasse', 'square', 2, 4, 4, 420, 200, 100, 100, 'libre', 'libre'),
('B1', 'Comptoir Bar 1', 'token_bar_01', 'bar', 'bar_seat', 1, 1, 1, 600, 200, 70, 70, 'libre', 'libre'),
('B2', 'Comptoir Bar 2', 'token_bar_02', 'bar', 'bar_seat', 1, 1, 1, 690, 200, 70, 70, 'libre', 'libre')
ON CONFLICT (qr_code_token) DO NOTHING;

-- 8. Insertion des Modules (Feature Toggles & Packages)
INSERT INTO restaurant_modules (id, name, description, tier, is_enabled, category, settings) VALUES
('table_plan', 'Plan de Tables 2D Interactif', 'Éditeur visuel de salle, zones, formes de tables, fusion/split et statuts temps réel.', 'standard', TRUE, 'salle', '{"allow_split_join": true, "enable_hygiene_tracking": true}'::jsonb),
('seat_ordering', 'Numérotation des Sièges', 'Attribution de chaque plat commandé à un numéro de siège précis.', 'pro', TRUE, 'service', '{"enforce_seat_number": false}'::jsonb),
('course_management', 'Gestion des Suites & Réclame', 'Filtrage séquentiel KDS (Entrées directes FIRE, Plats en HOLD, Réclame suite).', 'standard', TRUE, 'cuisine', '{"auto_fire_drinks": true}'::jsonb),
('multi_kds_routing', 'Routage Multi-Postes KDS', 'Éclatement automatique des commandes vers les postes Chaud, Froid, Bar et Passe Expo.', 'pro', TRUE, 'cuisine', '{"stations": ["chaud", "froid", "bar", "passe"]}'::jsonb),
('allergy_alerts', 'Alertes Allergies Haute Priorité', 'Affichage prioritaire rouge clignotant des allergènes et acquittement obligatoire.', 'standard', TRUE, 'securite', '{"require_ack": true}'::jsonb),
('stock_bom_auto_86', 'Stocks Dynamiques BOM & Mode 86', 'Décompte temps réel selon fiches techniques et blocage automatique en rupture 86.', 'pro', TRUE, 'stock', '{"deduct_trigger": "order", "alert_threshold": 5}'::jsonb),
('waste_tracking', 'Suivi des Pertes Cuisine', 'Déclaration et traçabilité des pertes (erreurs de cuisson, allergies, avaries).', 'pro', TRUE, 'stock', '{"require_reason": true}'::jsonb),
('temporal_alerts', 'Alertes Temporisation > 20 min', 'Détection et signalement visuel des tables en attente prolongée.', 'standard', TRUE, 'service', '{"max_wait_minutes": 20}'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  tier = EXCLUDED.tier,
  is_enabled = EXCLUDED.is_enabled,
  category = EXCLUDED.category,
  settings = EXCLUDED.settings;

-- 9. Insertion des Ingrédients de Base
INSERT INTO ingredients (name, category, unit, current_stock, min_threshold, is_86, cost_per_unit_cents) VALUES
('Steak Bœuf Haché Charolais 180g', 'viande', 'piece', 45, 10, FALSE, 250),
('Pain Burger Artisanal Brioché', 'epicerie', 'piece', 60, 15, FALSE, 60),
('Cheddar Affiné 18 mois', 'produit_laitier', 'g', 2500, 500, FALSE, 2),
('Frites Fraîches Maison', 'legume', 'g', 15000, 2000, FALSE, 1),
('Vodka Artisanale', 'boisson', 'cl', 450, 100, FALSE, 15),
('Ginger Beer Bio', 'boisson', 'cl', 1200, 200, FALSE, 8),
('Citron Vert Frais', 'legume', 'piece', 80, 20, FALSE, 35),
('Menthe Fraîche Bio', 'legume', 'g', 600, 100, FALSE, 3),
('Bière Blonde IPA La Barbaque', 'boisson', 'cl', 3000, 500, FALSE, 5),
('Sélection Charcuterie Ibérique', 'viande', 'g', 3500, 600, FALSE, 4),
('Pain Levain Artisanal', 'epicerie', 'g', 5000, 1000, FALSE, 1),
('Beurre Demi-sel AOP', 'produit_laitier', 'g', 1200, 200, FALSE, 2),
('Bœuf Mariné Lok-Lak', 'viande', 'g', 4000, 800, FALSE, 3),
('Riz Jasmin Parfumé', 'epicerie', 'g', 8000, 1500, FALSE, 1),
('Salade Mesclun Fraîche', 'legume', 'g', 3000, 500, FALSE, 2),
('Oignons Caramélisés Maison', 'legume', 'g', 2000, 400, FALSE, 1)
ON CONFLICT (name) DO NOTHING;

-- 10. Liaison des Fiches Techniques (BOM) pour les plats du menu
DO $$
DECLARE
  v_burger_id UUID;
  v_mule_id UUID;
  v_ipa_id UUID;
  v_planche_id UUID;
  
  v_steak_id UUID;
  v_bun_id UUID;
  v_cheddar_id UUID;
  v_frites_id UUID;
  v_oignons_id UUID;
  
  v_vodka_id UUID;
  v_ginger_id UUID;
  v_citron_id UUID;
  v_menthe_id UUID;
  v_ipa_ing_id UUID;
  
  v_charcuterie_id UUID;
  v_pain_id UUID;
  v_beurre_id UUID;
BEGIN
  -- IDs des produits
  SELECT id INTO v_burger_id FROM products WHERE name ILIKE '%Burger Signature%' LIMIT 1;
  SELECT id INTO v_mule_id FROM products WHERE name ILIKE '%Moscow Mule%' LIMIT 1;
  SELECT id INTO v_ipa_id FROM products WHERE name ILIKE '%IPA Locale%' LIMIT 1;
  SELECT id INTO v_planche_id FROM products WHERE name ILIKE '%Planche de Charcuteries%' LIMIT 1;

  -- IDs des ingrédients
  SELECT id INTO v_steak_id FROM ingredients WHERE name ILIKE 'Steak Bœuf%' LIMIT 1;
  SELECT id INTO v_bun_id FROM ingredients WHERE name ILIKE 'Pain Burger%' LIMIT 1;
  SELECT id INTO v_cheddar_id FROM ingredients WHERE name ILIKE 'Cheddar%' LIMIT 1;
  SELECT id INTO v_frites_id FROM ingredients WHERE name ILIKE 'Frites%' LIMIT 1;
  SELECT id INTO v_oignons_id FROM ingredients WHERE name ILIKE 'Oignons%' LIMIT 1;
  
  SELECT id INTO v_vodka_id FROM ingredients WHERE name ILIKE 'Vodka%' LIMIT 1;
  SELECT id INTO v_ginger_id FROM ingredients WHERE name ILIKE 'Ginger Beer%' LIMIT 1;
  SELECT id INTO v_citron_id FROM ingredients WHERE name ILIKE 'Citron%' LIMIT 1;
  SELECT id INTO v_menthe_id FROM ingredients WHERE name ILIKE 'Menthe%' LIMIT 1;
  SELECT id INTO v_ipa_ing_id FROM ingredients WHERE name ILIKE 'Bière Blonde IPA%' LIMIT 1;
  
  SELECT id INTO v_charcuterie_id FROM ingredients WHERE name ILIKE 'Sélection Charcuterie%' LIMIT 1;
  SELECT id INTO v_pain_id FROM ingredients WHERE name ILIKE 'Pain Levain%' LIMIT 1;
  SELECT id INTO v_beurre_id FROM ingredients WHERE name ILIKE 'Beurre Demi-sel%' LIMIT 1;

  -- Fiche Technique Burger
  IF v_burger_id IS NOT NULL THEN
    IF v_steak_id IS NOT NULL THEN INSERT INTO product_ingredients (product_id, ingredient_id, quantity, is_removable) VALUES (v_burger_id, v_steak_id, 1, FALSE) ON CONFLICT (product_id, ingredient_id) DO NOTHING; END IF;
    IF v_bun_id IS NOT NULL THEN INSERT INTO product_ingredients (product_id, ingredient_id, quantity, is_removable) VALUES (v_burger_id, v_bun_id, 1, FALSE) ON CONFLICT (product_id, ingredient_id) DO NOTHING; END IF;
    IF v_cheddar_id IS NOT NULL THEN INSERT INTO product_ingredients (product_id, ingredient_id, quantity, is_removable) VALUES (v_burger_id, v_cheddar_id, 40, TRUE) ON CONFLICT (product_id, ingredient_id) DO NOTHING; END IF;
    IF v_frites_id IS NOT NULL THEN INSERT INTO product_ingredients (product_id, ingredient_id, quantity, is_removable) VALUES (v_burger_id, v_frites_id, 200, TRUE) ON CONFLICT (product_id, ingredient_id) DO NOTHING; END IF;
    IF v_oignons_id IS NOT NULL THEN INSERT INTO product_ingredients (product_id, ingredient_id, quantity, is_removable) VALUES (v_burger_id, v_oignons_id, 30, TRUE) ON CONFLICT (product_id, ingredient_id) DO NOTHING; END IF;
  END IF;

  -- Fiche Technique Moscow Mule
  IF v_mule_id IS NOT NULL THEN
    IF v_vodka_id IS NOT NULL THEN INSERT INTO product_ingredients (product_id, ingredient_id, quantity, is_removable) VALUES (v_mule_id, v_vodka_id, 5, FALSE) ON CONFLICT (product_id, ingredient_id) DO NOTHING; END IF;
    IF v_ginger_id IS NOT NULL THEN INSERT INTO product_ingredients (product_id, ingredient_id, quantity, is_removable) VALUES (v_mule_id, v_ginger_id, 15, FALSE) ON CONFLICT (product_id, ingredient_id) DO NOTHING; END IF;
    IF v_citron_id IS NOT NULL THEN INSERT INTO product_ingredients (product_id, ingredient_id, quantity, is_removable) VALUES (v_mule_id, v_citron_id, 0.5, TRUE) ON CONFLICT (product_id, ingredient_id) DO NOTHING; END IF;
    IF v_menthe_id IS NOT NULL THEN INSERT INTO product_ingredients (product_id, ingredient_id, quantity, is_removable) VALUES (v_mule_id, v_menthe_id, 5, TRUE) ON CONFLICT (product_id, ingredient_id) DO NOTHING; END IF;
  END IF;

  -- Fiche Technique IPA
  IF v_ipa_id IS NOT NULL AND v_ipa_ing_id IS NOT NULL THEN
    INSERT INTO product_ingredients (product_id, ingredient_id, quantity, is_removable) VALUES (v_ipa_id, v_ipa_ing_id, 33, FALSE) ON CONFLICT (product_id, ingredient_id) DO NOTHING;
  END IF;

  -- Fiche Technique Planche de Charcuteries
  IF v_planche_id IS NOT NULL THEN
    IF v_charcuterie_id IS NOT NULL THEN INSERT INTO product_ingredients (product_id, ingredient_id, quantity, is_removable) VALUES (v_planche_id, v_charcuterie_id, 200, FALSE) ON CONFLICT (product_id, ingredient_id) DO NOTHING; END IF;
    IF v_pain_id IS NOT NULL THEN INSERT INTO product_ingredients (product_id, ingredient_id, quantity, is_removable) VALUES (v_planche_id, v_pain_id, 100, TRUE) ON CONFLICT (product_id, ingredient_id) DO NOTHING; END IF;
    IF v_beurre_id IS NOT NULL THEN INSERT INTO product_ingredients (product_id, ingredient_id, quantity, is_removable) VALUES (v_planche_id, v_beurre_id, 20, TRUE) ON CONFLICT (product_id, ingredient_id) DO NOTHING; END IF;
  END IF;
END $$;
