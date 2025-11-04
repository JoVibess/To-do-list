-- =
-- Jeu de données pour les tables `label`, `user` et `task`
-- =

-- 1 Réinitialisation
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE task;
TRUNCATE TABLE label;
TRUNCATE TABLE user;
SET FOREIGN_KEY_CHECKS = 1;

-- 2 Création de 3 utilisateurs
INSERT INTO user (id, email, password) VALUES
(1, 'alice@example.com', '$2b$10$ABCDEFGHIJKLMNOPQRSTUVWX1234567890abcdefghi'), -- fake hash
(2, 'bob@example.com', '$2b$10$ABCDEFGHIJKLMNOPQRSTUVWX1234567890abcdefghi'),
(3, 'charlie@example.com', '$2b$10$ABCDEFGHIJKLMNOPQRSTUVWX1234567890abcdefghi');

-- 3 Labels de base
INSERT INTO label (id, name, color) VALUES
(1, 'Travail', '#2196F3'),
(2, 'Urgent',  '#F44336'),
(3, 'Perso',   '#4CAF50');

-- 4 50 tâches avec user_id aléatoire (1, 2, ou 3)
INSERT INTO task (titre, description, datetime, done, label_id, user_id) VALUES
('Préparer le rapport mensuel', 'Compiler les ventes du mois et générer les graphiques.', '2025-11-05 09:00:00', 0, 1, 1),
('Acheter des fournitures', 'Papier, stylos, et cartouches d’encre.', '2025-11-06 10:00:00', 0, 3, 2),
('Réunion projet X', 'Discussion sur les délais et les ressources.', '2025-11-07 14:00:00', 1, 1, 3),
('Rendre visite à la famille', 'Déjeuner dimanche midi.', '2025-11-09 12:30:00', 0, 3, 1),
('Appeler le fournisseur', 'Confirmer la livraison des composants.', '2025-11-05 11:15:00', 0, 1, 2),
('Envoyer facture client', 'Projet Alpha terminé.', '2025-11-08 16:00:00', 1, 1, 3),
('Faire les courses', 'Produits frais et essentiels.', '2025-11-06 18:00:00', 0, 3, 1),
('Backup du serveur', 'Sauvegarde hebdomadaire complète.', '2025-11-07 02:00:00', 0, 2, 2),
('Préparer présentation', 'Slides pour la réunion direction.', '2025-11-06 08:00:00', 0, 1, 3),
('Répondre aux mails', 'Inbox à vider avant midi.', '2025-11-05 11:30:00', 0, 1, 1),
('Révision voiture', 'Contrôle annuel chez le garagiste.', '2025-11-10 09:00:00', 0, 3, 2),
('Mettre à jour le site web', 'Ajout des dernières actualités.', '2025-11-08 15:00:00', 1, 1, 3),
('Payer les factures', 'Électricité et Internet.', '2025-11-05 20:00:00', 0, 3, 1),
('Relancer le client B', 'Attente de validation du devis.', '2025-11-06 09:45:00', 0, 1, 2),
('Faire le ménage', 'Salon, cuisine, salle de bain.', '2025-11-07 17:00:00', 1, 3, 3),
('Urgence serveur', 'Incident sur l’API principale.', '2025-11-04 03:00:00', 0, 2, 1),
('Corriger le bug production', 'Erreur 500 sur le module de paiement.', '2025-11-04 09:15:00', 1, 2, 2),
('Préparer les impôts', 'Rassembler les justificatifs.', '2025-11-15 09:00:00', 0, 3, 3),
('Réunion client Y', 'Discussion sur les nouveaux besoins.', '2025-11-07 10:00:00', 0, 1, 1),
('Nettoyer le bureau', 'Trier les papiers et archiver.', '2025-11-06 17:00:00', 0, 3, 2),
('Livrer la version beta', 'Remise au client.', '2025-11-08 13:00:00', 1, 1, 3),
('Faire une sauvegarde locale', 'Backup sur disque dur.', '2025-11-09 21:00:00', 0, 2, 1),
('Rédiger compte rendu réunion', 'Envoyer le CR à l’équipe.', '2025-11-05 17:30:00', 1, 1, 2),
('Nettoyer la base de données', 'Purge des logs obsolètes.', '2025-11-06 04:00:00', 0, 2, 3),
('Planifier vacances', 'Regarder les destinations.', '2025-11-12 18:00:00', 0, 3, 1),
('Tester les fonctionnalités', 'Phase QA.', '2025-11-06 14:00:00', 1, 1, 2),
('Faire du sport', '30 min de cardio.', '2025-11-05 07:30:00', 0, 3, 3),
('Répondre au support', 'Tickets utilisateurs en attente.', '2025-11-07 09:00:00', 0, 1, 1),
('Maintenance serveur', 'Nettoyage disque et MAJ.', '2025-11-08 02:00:00', 1, 2, 2),
('Réviser l’algorithme', 'Optimiser la performance.', '2025-11-10 15:00:00', 0, 1, 3),
('Sortir avec des amis', 'Soirée samedi.', '2025-11-09 20:00:00', 0, 3, 1),
('Préparer rapport bug', 'Lister les anomalies QA.', '2025-11-05 15:00:00', 1, 1, 2),
('Mettre à jour Docker', 'Pull des dernières images.', '2025-11-07 08:00:00', 0, 2, 3),
('Préparer le dossier RH', 'Contrats stagiaires.', '2025-11-05 09:45:00', 0, 1, 1),
('Nettoyer la boîte mail', 'Supprimer les anciens messages.', '2025-11-06 11:00:00', 0, 3, 2),
('Urgence production', 'Crash du service API.', '2025-11-04 02:00:00', 0, 2, 3),
('Lecture technique', 'Lire un article sur Node.js.', '2025-11-08 22:00:00', 1, 3, 1),
('Optimiser la BDD', 'Amélioration des index.', '2025-11-07 12:00:00', 0, 1, 2),
('Nettoyer cache navigateur', 'Résolution lenteurs.', '2025-11-06 16:00:00', 0, 3, 3),
('Mettre à jour la doc API', 'Nouvelles routes à documenter.', '2025-11-07 13:30:00', 1, 1, 1),
('Vérifier sauvegarde distante', 'Test FTP.', '2025-11-05 01:00:00', 0, 2, 2),
('Faire un don', 'Pour l’association locale.', '2025-11-09 10:00:00', 0, 3, 3),
('Révision code', 'Passer un linter et corriger.', '2025-11-06 19:00:00', 0, 1, 1),
('Urgence déploiement', 'Pipeline cassé.', '2025-11-04 04:00:00', 1, 2, 2),
('Ranger les fichiers', 'Tri dans le dossier documents.', '2025-11-08 09:00:00', 1, 3, 3),
('Créer le dashboard', 'Vue statistique des ventes.', '2025-11-07 11:00:00', 0, 1, 1),
('Réserver un billet', 'Aller-retour pour le weekend.', '2025-11-10 08:30:00', 0, 3, 2),
('Corriger bug urgent', 'Crash dans le module login.', '2025-11-05 03:00:00', 0, 2, 3),
('Réviser pour l’examen', 'Chapitre sur les ORM.', '2025-11-11 19:00:00', 0, 3, 1),
('Installer dépendances', 'MAJ npm install.', '2025-11-05 13:00:00', 1, 1, 2);
