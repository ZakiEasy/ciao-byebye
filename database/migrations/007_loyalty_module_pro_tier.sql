-- Migration 007 : Intégration du module Fidélité & Récompenses dans les Tiers d'Abonnement (Réservé à l'Offre Pro 99€ et Multi-Sites)

INSERT INTO restaurant_modules (id, name, description, tier, is_enabled, category, settings)
VALUES (
  'loyalty_program',
  'Programme de Fidélité & Récompenses',
  'Adhésion mobile 1-clic, accumulation de points (1€ = 1 pt), catalogue d''offres de récompenses paramétrables et statuts VIP.',
  'pro',
  TRUE,
  'marketing',
  '{"min_tier": "pro", "price_eur_ht": 99, "allow_custom_rewards": true, "vip_multiplier": 1.5}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  tier = 'pro',
  category = EXCLUDED.category,
  settings = EXCLUDED.settings;
