-- Migration 004 : Infrastructure Déploiements Clients, SuperAdmin HQ & CRM Commercial

-- 1. Table des déploiements et infrastructures clients (SuperAdmin HQ)
CREATE TABLE IF NOT EXISTS client_deployments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE NOT NULL,
    custom_domain VARCHAR(255),
    infra_status VARCHAR(50) DEFAULT 'active', -- 'active', 'provisioning', 'maintenance', 'suspended'
    plan_tier VARCHAR(50) DEFAULT 'pro', -- 'essentiel', 'pro', 'multi_sites'
    vertical_preset VARCHAR(50) DEFAULT 'bistro', -- 'cafe_bar', 'bistro', 'gastro', 'fast_casual'
    subscription_status VARCHAR(50) DEFAULT 'trial', -- 'trial', 'active', 'renewing', 'overdue', 'cancelled'
    trial_ends_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '14 days'),
    subscription_renews_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP + INTERVAL '1 month'),
    monthly_fee_cents INTEGER DEFAULT 12900,
    enabled_modules JSONB DEFAULT '["qr_ordering", "cash_collection", "kds_single", "table_plan", "course_management", "allergy_alerts", "temporal_alerts", "stock_bom_auto_86", "waste_tracking", "waiter_assignment"]'::jsonb,
    database_url VARCHAR(500),
    api_key VARCHAR(255) DEFAULT ('cb_live_' || md5(random()::text)),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour les recherches de déploiement
CREATE INDEX IF NOT EXISTS idx_deployments_subdomain ON client_deployments(subdomain);
CREATE INDEX IF NOT EXISTS idx_deployments_status ON client_deployments(subscription_status);

-- 2. Table des prospects commerciaux et enrichissement Lead Intelligence (CRM Commercial)
CREATE TABLE IF NOT EXISTS crm_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_name VARCHAR(255) NOT NULL,
    activity_type VARCHAR(100) NOT NULL, -- 'cafe_bar', 'bistro', 'gastro', 'fast_casual', 'pizzeria', 'brasserie'
    city VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    postal_code VARCHAR(20),
    lat NUMERIC(10,6),
    lng NUMERIC(10,6),
    estimated_revenue_eur INTEGER, -- CA estimé en euros
    estimated_covers INTEGER, -- Nombre de places assises estimées
    footfall_level VARCHAR(50) DEFAULT 'moyen', -- 'eleve', 'moyen', 'faible'
    current_pos_solution VARCHAR(100) DEFAULT 'aucune', -- 'aucune', 'caisse_seule', 'menu_pdf_statique', 'concurrent'
    web_rating NUMERIC(3,1) DEFAULT 4.2,
    web_reviews_count INTEGER DEFAULT 120,
    customer_complaints TEXT,
    sales_pitch_hook TEXT,
    lead_status VARCHAR(50) DEFAULT 'nouveau', -- 'nouveau', 'a_contacter', 'rdv_demo', 'essai_lance', 'converti', 'perdu'
    hubspot_synced BOOLEAN DEFAULT FALSE,
    hubspot_deal_id VARCHAR(100),
    assigned_rep VARCHAR(255) DEFAULT 'commercial@ciao-byebye.fr',
    contact_name VARCHAR(100),
    contact_phone VARCHAR(50),
    contact_email VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour la recherche géographique et statut
CREATE INDEX IF NOT EXISTS idx_crm_leads_city ON crm_leads(city);
CREATE INDEX IF NOT EXISTS idx_crm_leads_status ON crm_leads(lead_status);
CREATE INDEX IF NOT EXISTS idx_crm_leads_activity ON crm_leads(activity_type);

-- 3. Données initiales de test pour Déploiements Clients (SuperAdmin HQ)
INSERT INTO client_deployments (restaurant_name, subdomain, custom_domain, infra_status, plan_tier, vertical_preset, subscription_status, trial_ends_at, monthly_fee_cents, contact_email, contact_phone) VALUES
('L''Atelier Chris (Paris 11)', 'atelier-chris', 'commande.atelier-chris.fr', 'active', 'pro', 'bistro', 'active', NULL, 12900, 'chef@atelier-chris.fr', '01 43 55 12 34'),
('Naga Street Food (Lyon 2)', 'naga-lyon', 'qr.naga-streetfood.fr', 'active', 'pro', 'fast_casual', 'trial', (CURRENT_TIMESTAMP + INTERVAL '10 days'), 12900, 'contact@naga-streetfood.fr', '04 78 92 45 10'),
('Brasserie Leffe République (Lille)', 'leffe-lille', 'menu.leffe-republique.fr', 'active', 'multi_sites', 'bistro', 'active', NULL, 24900, 'direction@leffe-lille.fr', '03 20 14 88 90'),
('Le Barock Lounge & Cocktail (Bordeaux)', 'barock-bdx', NULL, 'active', 'essentiel', 'cafe_bar', 'trial', (CURRENT_TIMESTAMP + INTERVAL '5 days'), 4900, 'julien@barock-bdx.fr', '05 56 79 33 21'),
('Le Bel Canto Gastronomique (Paris 4)', 'belcanto-paris', 'reservation.belcanto.fr', 'active', 'multi_sites', 'gastro', 'active', NULL, 24900, 'contact@belcanto.fr', '01 42 78 30 18')
ON CONFLICT (subdomain) DO NOTHING;

-- 4. Données initiales de test pour Prospection Commerciale (CRM Leads)
INSERT INTO crm_leads (business_name, activity_type, city, address, postal_code, lat, lng, estimated_revenue_eur, estimated_covers, footfall_level, current_pos_solution, web_rating, web_reviews_count, customer_complaints, sales_pitch_hook, lead_status, contact_name, contact_phone, contact_email) VALUES
('Bistrot des Halles', 'bistro', 'Paris', '14 Rue Baltard, 75001 Paris', '75001', 48.8627, 2.3458, 620000, 85, 'eleve', 'caisse_seule', 4.1, 410, 'Avis Google récurrents : "40 min d''attente pour régler", "serveurs introuvables au déjeuner"', 'Proposer le paiement direct QR code à table pour réduire de 80% le temps d''encaissement et décharger les serveurs aux heures de pointe.', 'a_contacter', 'Marc Vasseur', '01 42 33 90 12', 'direction@bistrotdeshalles-paris.fr'),
('Le Comptoir du Marais', 'cafe_bar', 'Paris', '38 Rue de Bretagne, 75003 Paris', '75003', 48.8631, 2.3619, 380000, 45, 'eleve', 'menu_pdf_statique', 4.4, 290, 'Plaintes : "Menu PDF difficile à lire sur smartphone", "obligation d''aller au comptoir pour chaque verre"', 'Mettre en place la commande et le réapprovisionnement direct de boissons sur table avec l''auto-fire bar (+22% de consommation en terrasse).', 'rdv_demo', 'Sarah Benali', '01 48 87 65 43', 'sarah@comptoirdumarais.fr'),
('Trattoria Bella Vista', 'pizzeria', 'Lyon', '22 Rue Mercière, 69002 Lyon', '69002', 45.7621, 4.8335, 780000, 110, 'eleve', 'caisse_seule', 4.3, 560, 'Plaintes : "Erreurs sur les garnitures", "suppléments oubliés sur l''addition"', 'Automatiser la prise de commande avec modificateurs précis (SANS/EXTRA) et décompte stock BOM instantané.', 'nouveau', 'Luigi Morini', '04 72 40 11 22', 'luigi@bellavista-lyon.it'),
('Brasserie du Port', 'brasserie', 'Marseille', '8 Quai du Port, 13002 Marseille', '13002', 43.2965, 5.3698, 950000, 160, 'eleve', 'concurrent', 3.9, 830, 'Plaintes : "Service très lent le week-end", "tickets de caisse illisibles"', 'Solution KDS multi-postes (Chaud, Froid, Bar, Passe) pour coordonner la terrasse géante de 120 couverts.', 'a_contacter', 'Alexandre Puget', '04 91 90 44 55', 'alex@brasserieduport-marseille.fr'),
('Le Gourmet Étoilé', 'gastro', 'Bordeaux', '5 Place de la Bourse, 33000 Bordeaux', '33000', 44.8415, -0.5701, 1200000, 60, 'moyen', 'caisse_seule', 4.8, 310, 'Plaintes : "Temps entre les plats parfois un peu long"', 'Intégrer le Course Management KDS avec suites HOLD/FIRE et numérotation par siège pour un service ultra-millimétré.', 'essai_lance', 'Chef Laurent Dubreuil', '05 56 44 20 00', 'direction@gourmet-bordeaux.fr'),
('Street Wok & Bowls', 'fast_casual', 'Paris', '52 Rue Saint-Denis, 75001 Paris', '75001', 48.8610, 2.3490, 490000, 35, 'eleve', 'aucune', 4.5, 180, 'Plaintes : "File d''attente sur le trottoir", "ruptures de stock non annoncées à l''entrée"', 'Déployer la commande QR avec mode 86 automatique pour éviter les ruptures et supprimer la file d''attente.', 'nouveau', 'Thierry Nguyen', '01 40 26 77 88', 'thierry@streetwok-paris.com')
ON CONFLICT DO NOTHING;
