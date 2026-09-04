-- Migration 008 : Système de Requêtes Support & Traitement des Incidents

CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_number VARCHAR(20) UNIQUE NOT NULL,
  restaurant_id VARCHAR(100) DEFAULT 'don-roberto',
  created_by_role VARCHAR(50) DEFAULT 'gerant',
  created_by_name VARCHAR(100) DEFAULT 'Don Roberto Staff',
  category VARCHAR(50) NOT NULL DEFAULT 'autre', -- 'bug', 'materiel_imprimante', 'carte_menu', 'paiement_stripe', 'autre'
  priority VARCHAR(20) NOT NULL DEFAULT 'normale', -- 'basse', 'normale', 'haute', 'urgente'
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  table_number VARCHAR(20),
  order_id UUID,
  status VARCHAR(30) NOT NULL DEFAULT 'ouvert', -- 'ouvert', 'en_cours', 'resolu', 'ferme'
  admin_response TEXT,
  assigned_to VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS ticket_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_role VARCHAR(50) NOT NULL,
  sender_name VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON support_tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_restaurant ON support_tickets(restaurant_id);
