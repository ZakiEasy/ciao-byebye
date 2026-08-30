-- Migration 006 : Système de Fidélité Paramétrable, Récompenses & Historique Membres

-- 1. Table des paramètres du programme de fidélité
CREATE TABLE IF NOT EXISTS loyalty_program_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_name VARCHAR(100) NOT NULL DEFAULT 'Club Privilège Fidélité',
    is_enabled BOOLEAN DEFAULT TRUE,
    points_per_eur NUMERIC(10,2) DEFAULT 1.0, -- 1.0 = 1 point par euro dépensé
    welcome_bonus_points INTEGER DEFAULT 25, -- Points offerts dès l'adhésion
    min_points_to_redeem INTEGER DEFAULT 50, -- Seuil minimal pour utiliser une récompense
    tier_vip_threshold INTEGER DEFAULT 300, -- Seuil pour statut VIP (x1.5 points)
    terms_and_conditions TEXT DEFAULT 'Cumulez des points à chaque commande et échangez-les contre des cadeaux gourmands et des remises exclusives.',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertion des paramètres par défaut
INSERT INTO loyalty_program_settings (program_name, is_enabled, points_per_eur, welcome_bonus_points, min_points_to_redeem, tier_vip_threshold)
VALUES ('Club Privilège Fidélité', TRUE, 1.0, 25, 50, 300)
ON CONFLICT DO NOTHING;

-- 2. Table des offres & récompenses paramétrables
CREATE TABLE IF NOT EXISTS loyalty_rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    points_cost INTEGER NOT NULL CHECK (points_cost > 0),
    reward_type VARCHAR(50) NOT NULL DEFAULT 'percent_discount', -- 'percent_discount', 'fixed_discount', 'free_item', 'free_drink'
    discount_value NUMERIC(10,2) DEFAULT 0, -- Valeur en % (ex: 10 pour 10%) ou en EUR (ex: 5.00 pour 5€)
    product_id UUID REFERENCES products(id) ON DELETE SET NULL,
    icon VARCHAR(50) DEFAULT 'fa-gift',
    badge_color VARCHAR(50) DEFAULT '#f59e0b',
    is_active BOOLEAN DEFAULT TRUE,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour les récompenses
CREATE INDEX IF NOT EXISTS idx_loyalty_rewards_active ON loyalty_rewards(is_active);
CREATE INDEX IF NOT EXISTS idx_loyalty_rewards_points ON loyalty_rewards(points_cost);

-- 3. Table des clients membres du programme de fidélité
CREATE TABLE IF NOT EXISTS loyalty_customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255),
    full_name VARCHAR(100),
    current_points INTEGER NOT NULL DEFAULT 0 CHECK (current_points >= 0),
    lifetime_points INTEGER NOT NULL DEFAULT 0,
    total_spent_cents INTEGER NOT NULL DEFAULT 0,
    visits_count INTEGER NOT NULL DEFAULT 0,
    vip_status BOOLEAN DEFAULT FALSE,
    last_visit_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour la recherche client ultra-rapide
CREATE INDEX IF NOT EXISTS idx_loyalty_customers_phone ON loyalty_customers(phone);
CREATE INDEX IF NOT EXISTS idx_loyalty_customers_email ON loyalty_customers(email);

-- 4. Table du journal des transactions de points (Audit & Traçabilité)
CREATE TABLE IF NOT EXISTS loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES loyalty_customers(id) ON DELETE CASCADE,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    points_change INTEGER NOT NULL, -- Positif pour gain, négatif pour consommation
    reason VARCHAR(50) NOT NULL, -- 'order_earned', 'reward_redeemed', 'welcome_bonus', 'manual_adjustment', 'promo_bonus'
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_loyalty_transactions_customer ON loyalty_transactions(customer_id);

-- 5. Table de suivi des récompenses consommées (Redemptions)
CREATE TABLE IF NOT EXISTS loyalty_redemptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES loyalty_customers(id) ON DELETE CASCADE,
    reward_id UUID NOT NULL REFERENCES loyalty_rewards(id) ON DELETE RESTRICT,
    order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
    points_spent INTEGER NOT NULL,
    discount_applied_cents INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'applied', -- 'applied', 'cancelled', 'refunded'
    redeemed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_loyalty_redemptions_customer ON loyalty_redemptions(customer_id);

-- 6. Évolution de la table orders pour traçabilité fidélité
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS loyalty_customer_id UUID REFERENCES loyalty_customers(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS loyalty_points_earned INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS loyalty_reward_id UUID REFERENCES loyalty_rewards(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS loyalty_discount_cents INTEGER DEFAULT 0;

-- 7. Données initiales (Seeding) des Récompenses
INSERT INTO loyalty_rewards (title, description, points_cost, reward_type, discount_value, icon, badge_color, is_active) VALUES
('Espresso ou Boisson Chaude Offerte', 'Un café bio ou thé artisanal offert pour accompagner votre repas.', 50, 'free_drink', 2.50, 'fa-mug-hot', '#38bdf8', TRUE),
('Dessert Signature Maison Offert', 'Un dessert gourmand au choix (Teuk-a-Lok Mangue, Tiramisu ou Moelleux).', 100, 'free_item', 6.50, 'fa-cake-candles', '#ec4899', TRUE),
('Réduction 10% sur l''Addition', '10% de remise immédiate sur l''ensemble de votre commande du jour.', 150, 'percent_discount', 10.0, 'fa-percent', '#f59e0b', TRUE),
('Plat Signature ou Lok-Lak Offert', 'Un plat phare au choix offert (Lok-Lak Bœuf, Lot-Tcha ou Burger Signature).', 220, 'free_item', 14.90, 'fa-utensils', '#10b981', TRUE),
('Bon d''Achat Remise Immédiate 15€', '15,00 € de déduction directe sur l''addition pour nos membres VIP.', 300, 'fixed_discount', 15.00, 'fa-gift', '#8b5cf6', TRUE)
ON CONFLICT DO NOTHING;

-- 8. Données initiales (Seeding) de Clients Fidélité de Démonstration
INSERT INTO loyalty_customers (phone, email, full_name, current_points, lifetime_points, total_spent_cents, visits_count, vip_status) VALUES
('0612345678', 'thomas.dubois@email.fr', 'Thomas Dubois', 145, 220, 18500, 6, FALSE),
('0698765432', 'claire.martin@gmail.com', 'Claire Martin', 320, 480, 41200, 12, TRUE),
('0788990011', 'karim.b@outlook.com', 'Karim Benali', 85, 110, 9400, 3, FALSE),
('0655443322', 'sarah.v@yahoo.fr', 'Sarah Valette', 210, 310, 26700, 8, FALSE)
ON CONFLICT (phone) DO NOTHING;
