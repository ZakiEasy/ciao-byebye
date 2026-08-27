-- Migration 005 : Création du compte SuperAdmin Global

INSERT INTO staff_users (email, role, assigned_tables) VALUES
('superadmin@ciao-byebye.fr', 'superadmin', '{"01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "14", "15"}')
ON CONFLICT (email) DO UPDATE SET 
    role = 'superadmin',
    assigned_tables = '{"01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "14", "15"}';
