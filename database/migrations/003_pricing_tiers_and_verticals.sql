-- Migration 003 : Alignement des Offres Initiales (Essentiel, Pro, Chaînes & Multi-sites) et Verticales Métiers

-- 1. Mise à jour de la table des modules avec les 3 Tiers d'Abonnement Core
INSERT INTO restaurant_modules (id, name, description, tier, is_enabled, category, settings) VALUES
-- TIER ESSENTIEL (Starter - 49€/m)
('qr_ordering', 'Commande & Paiement QR Code', 'Scan QR Code sur table, affichage de la carte interactive et paiement en ligne.', 'essentiel', TRUE, 'salle', '{"allow_guest_order": true}'::jsonb),
('cash_collection', 'Encaissement Espèces & Caisse', 'Prise en charge du règlement en espèces et validation manuelle en caisse.', 'essentiel', TRUE, 'service', '{"cash_validation": true}'::jsonb),
('kds_single', 'KDS Monoposte Cuisine', 'Affichage des commandes en temps réel sur 1 écran cuisine avec signal sonore.', 'essentiel', TRUE, 'cuisine', '{"sound_alert": true}'::jsonb),

-- TIER PRO (129€/m)
('table_plan', 'Plan de Tables 2D Interactif', 'Plan de salle interactif avec formes physiques, zones (salle, terrasse, bar), fusions et dissociations.', 'pro', TRUE, 'salle', '{"allow_split_join": true, "enable_hygiene_tracking": true}'::jsonb),
('course_management', 'Gestion des Suites & Réclame', 'Gestion séquentielle des plats (Entrées en direct, Plats en HOLD, bouton Réclame suite).', 'pro', TRUE, 'cuisine', '{"auto_fire_drinks": true}'::jsonb),
('allergy_alerts', 'Alertes Allergies Haute Priorité', 'Signalement visuel rouge clignotant des allergènes et acquittement obligatoire par la cuisine.', 'pro', TRUE, 'cuisine', '{"require_ack": true}'::jsonb),
('temporal_alerts', 'Alertes Temporisation > 20 min', 'Alerte visuelle clignotante pour les tables en attente prolongée sans activité.', 'pro', TRUE, 'service', '{"max_wait_minutes": 20}'::jsonb),
('stock_bom_auto_86', 'Stocks Dynamiques BOM & Mode 86', 'Décompte temps réel selon fiches techniques et bascule automatique en rupture 86.', 'pro', TRUE, 'stock', '{"deduct_trigger": "order", "alert_threshold": 5}'::jsonb),
('waste_tracking', 'Suivi des Pertes & Gaspillage', 'Déclaration et traçabilité des pertes cuisine (erreurs de cuisson, casse, DLC, allergies).', 'pro', TRUE, 'stock', '{"require_reason": true}'::jsonb),
('waiter_assignment', 'Affectation des Rangs Serveurs', 'Répartition des tables par serveur, filtrage personnalisé et appel serveur instantané.', 'pro', TRUE, 'service', '{"allow_waiter_call": true}'::jsonb),

-- TIER CHAÎNES & MULTI-SITES (249€/m)
('multi_kds_routing', 'Routage Multi-Postes KDS', 'Éclatement automatique des commandes vers les postes Chaud, Froid, Bar et Passe Expo.', 'multi_sites', TRUE, 'cuisine', '{"stations": ["chaud", "froid", "bar", "passe"]}'::jsonb),
('seat_ordering', 'Numérotation des Sièges', 'Attribution de chaque plat au numéro de siège précis du convive.', 'multi_sites', TRUE, 'service', '{"enforce_seat_number": false}'::jsonb),
('multi_site_sync', 'Gestion Multi-Établissements', 'Pilotage multi-sites, centralisation des cartes, recettes et analyses consolidées.', 'multi_sites', TRUE, 'general', '{"cross_store_menu": true}'::jsonb)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  tier = EXCLUDED.tier,
  is_enabled = EXCLUDED.is_enabled,
  category = EXCLUDED.category,
  settings = EXCLUDED.settings;

-- Nettoyer les anciens Tiers s'il reste des valeurs historiques
UPDATE restaurant_modules SET tier = 'essentiel' WHERE tier = 'starter';
UPDATE restaurant_modules SET tier = 'pro' WHERE tier = 'standard';
UPDATE restaurant_modules SET tier = 'multi_sites' WHERE tier = 'pro' AND id IN ('multi_kds_routing', 'seat_ordering', 'multi_site_sync');
