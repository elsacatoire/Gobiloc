## create flats

-- Création de la table flat_shares si elle n'existe pas déjà
CREATE TABLE IF NOT EXISTS flat_shares (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL
);

-- Insertion de 3 colocations
INSERT INTO flat_shares (name, description) VALUES
('Coloc1 3pax', 'description coloc1'),
('Coloc2 1pax', 'description coloc2 un peu longue pour tester l'affichage, peut-être ça va sortir du cadre ou non, est-ce que on a bien géré le responsive ? C'est la vraie question en définitive. 42.'),
('Coloc3 vide dont le nom est long', 'description coloc3');

-- Création de la table users si elle n'existe pas déjà
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    flat_share_id INT,
    FOREIGN KEY (flat_share_id) REFERENCES flat_shares(id)
);

-- Insertion de 6 utilisateurs
INSERT INTO users (name, email, password, flat_share_id) VALUES
('1Alice Dupont', 'alice1.dupont@example.com', 'motdepasse1', 1),
('2Bob Martin', 'bob2.martin@example.com', 'motdepasse2', 1),
('3Charlie Durand', 'charlie3.durand@example.com', 'motdepasse3', 1),
('4Diane Petit', 'diane4.petit@example.com', 'motdepasse4', 2),
('5Eve Moreau n-a-pas-de-coloc, 'eve5.moreau@example.com', 'motdepasse5', NULL),
('6Frank Leblanc', 'frank6.leblanc@example.com', 'motdepasse6', NULL);

-- A ce stade il existe 3 colocs:
-- une a 3 users, 1 en a qu'un seul et une n'en a pas.