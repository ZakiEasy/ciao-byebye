-- Schéma de base de données PostgreSQL pour la solution de commande sur table

-- Activer l'extension uuid-ossp pour la génération d'UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tables physiques du restaurant
CREATE TABLE IF NOT EXISTS tables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    number VARCHAR(10) NOT NULL,
    qr_code_token VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'libre', -- 'libre', 'occupee', 'en_attente_nettoyage'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Sessions de table (regroupe les commandes d'une même table ou d'un même groupe de clients)
CREATE TABLE IF NOT EXISTS table_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_id UUID NOT NULL REFERENCES tables(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'active', -- 'active', 'completee', 'annulee'
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP WITH TIME ZONE
);

-- 3. Commandes individuelles payées au sein d'une session
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID NOT NULL REFERENCES table_sessions(id) ON DELETE CASCADE,
    client_name VARCHAR(255), -- Nom du client associé à cette commande spécifique
    payment_intent_id VARCHAR(255) UNIQUE, -- ID de transaction fourni par la passerelle (Stripe, etc.)
    payment_status VARCHAR(50) DEFAULT 'en_attente', -- 'en_attente', 'paye', 'echoue', 'rembourse'
    total_amount_cents INTEGER NOT NULL, -- Stockage en centimes (ex. 1500 pour 15.00 €)
    order_status VARCHAR(50) DEFAULT 'recu', -- 'recu', 'en_preparation', 'pret', 'servi', 'annule'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Produits / Menu du restaurant
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    price_cents INTEGER NOT NULL,
    category VARCHAR(100) NOT NULL, -- 'entree', 'plat', 'dessert', 'boisson'
    image_url VARCHAR(2048),
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Lignes de commandes (liaison entre commande et produits)
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price_cents INTEGER NOT NULL, -- Prix du produit au moment de l'achat
    customization_notes TEXT, -- Allergies, cuisson, suppléments
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour optimiser les performances des requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_tables_qr_token ON tables(qr_code_token);
CREATE INDEX IF NOT EXISTS idx_table_sessions_status ON table_sessions(status);
CREATE INDEX IF NOT EXISTS idx_orders_session_id ON orders(session_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(order_status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- 6. Insertion de données de démonstration (Seeding)
-- Insertion des tables physiques
INSERT INTO tables (number, qr_code_token, status) VALUES 
('01', 'token_table_01', 'libre'),
('02', 'token_table_02', 'libre'),
('03', 'token_table_03', 'libre'),
('04', 'token_table_04', 'libre'),
('05', 'token_table_05', 'libre')
ON CONFLICT (qr_code_token) DO NOTHING;

-- Insertion des produits du menu
INSERT INTO products (name, description, price_cents, category, image_url) VALUES
('Moscow Mule Premium', 'Vodka artisanale, bière de gingembre bio, jus de citron vert frais, menthe fraîche.', 1250, 'boisson', 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=400'),
('IPA Locale "La Barbaque"', 'Bière blonde IPA artisanale locale, notes intenses d''agrumes et amertume fraîche.', 750, 'boisson', 'https://images.unsplash.com/photo-1600718374662-0483d2b9da44?auto=format&fit=crop&q=80&w=400'),
('Planche de Charcuteries fines', 'Sélection de charcuteries ibériques, cornichons, pain au levain et beurre demi-sel.', 1600, 'entree', 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80&w=400'),
('Burger Signature L''Atelier', 'Bœuf charolais, cheddar affiné de 18 mois, oignons caramélisés, sauce secrète, frites fraîches.', 1850, 'plat', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400')
ON CONFLICT (name) DO NOTHING;
