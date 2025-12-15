"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    await queryInterface.sequelize.transaction(async (t) => {
      // Couper les contraintes pour TRUNCATE
      await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { transaction: t });

      // 1) Reset (enfant -> parents)
      await queryInterface.sequelize.query("TRUNCATE TABLE `task`",  { transaction: t });
      await queryInterface.sequelize.query("TRUNCATE TABLE `label`", { transaction: t });
      await queryInterface.sequelize.query("TRUNCATE TABLE `user`",  { transaction: t });

      // Réactiver
      await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { transaction: t });

      // 2) Users
      await queryInterface.bulkInsert(
        "user",
        [
          { id: 1, email: "alice@example.com",   password: "$2b$10$ABCDEFGHIJKLMNOPQRSTUVWX1234567890abcdefghi" },
          { id: 2, email: "bob@example.com",     password: "$2b$10$ABCDEFGHIJKLMNOPQRSTUVWX1234567890abcdefghi" },
          { id: 3, email: "charlie@example.com", password: "$2b$10$ABCDEFGHIJKLMNOPQRSTUVWX1234567890abcdefghi" },
        ],
        { transaction: t }
      );

      // 3) Labels
      await queryInterface.bulkInsert(
        "label",
        [
          { id: 1, name: "Travail", color: "#2196F3" },
          { id: 2, name: "Urgent",  color: "#F44336" },
          { id: 3, name: "Perso",   color: "#4CAF50" },
        ],
        { transaction: t }
      );

      // 4) Tasks 
      const tasks = [
        { titre: "Préparer le rapport mensuel", description: "Compiler les ventes du mois et générer les graphiques.", datetime: "2025-11-05 09:00:00", done: 0, label_id: 1, user_id: 1 },
        { titre: "Acheter des fournitures", description: "Papier, stylos, et cartouches d’encre.", datetime: "2025-11-06 10:00:00", done: 0, label_id: 3, user_id: 2 },
        { titre: "Réunion projet X", description: "Discussion sur les délais et les ressources.", datetime: "2025-11-07 14:00:00", done: 1, label_id: 1, user_id: 3 },
        { titre: "Rendre visite à la famille", description: "Déjeuner dimanche midi.", datetime: "2025-11-09 12:30:00", done: 0, label_id: 3, user_id: 1 },
        { titre: "Appeler le fournisseur", description: "Confirmer la livraison des composants.", datetime: "2025-11-05 11:15:00", done: 0, label_id: 1, user_id: 2 },
        { titre: "Envoyer facture client", description: "Projet Alpha terminé.", datetime: "2025-11-08 16:00:00", done: 1, label_id: 1, user_id: 3 },
        { titre: "Faire les courses", description: "Produits frais et essentiels.", datetime: "2025-11-06 18:00:00", done: 0, label_id: 3, user_id: 1 },
        { titre: "Backup du serveur", description: "Sauvegarde hebdomadaire complète.", datetime: "2025-11-07 02:00:00", done: 0, label_id: 2, user_id: 2 },
        { titre: "Préparer présentation", description: "Slides pour la réunion direction.", datetime: "2025-11-06 08:00:00", done: 0, label_id: 1, user_id: 3 },
        { titre: "Répondre aux mails", description: "Inbox à vider avant midi.", datetime: "2025-11-05 11:30:00", done: 0, label_id: 1, user_id: 1 },
        { titre: "Révision voiture", description: "Contrôle annuel chez le garagiste.", datetime: "2025-11-10 09:00:00", done: 0, label_id: 3, user_id: 2 },
        { titre: "Mettre à jour le site web", description: "Ajout des dernières actualités.", datetime: "2025-11-08 15:00:00", done: 1, label_id: 1, user_id: 3 },
        { titre: "Payer les factures", description: "Électricité et Internet.", datetime: "2025-11-05 20:00:00", done: 0, label_id: 3, user_id: 1 },
        { titre: "Relancer le client B", description: "Attente de validation du devis.", datetime: "2025-11-06 09:45:00", done: 0, label_id: 1, user_id: 2 },
        { titre: "Faire le ménage", description: "Salon, cuisine, salle de bain.", datetime: "2025-11-07 17:00:00", done: 1, label_id: 3, user_id: 3 },
        { titre: "Urgence serveur", description: "Incident sur l’API principale.", datetime: "2025-11-04 03:00:00", done: 0, label_id: 2, user_id: 1 },
        { titre: "Corriger le bug production", description: "Erreur 500 sur le module de paiement.", datetime: "2025-11-04 09:15:00", done: 1, label_id: 2, user_id: 2 },
        { titre: "Préparer les impôts", description: "Rassembler les justificatifs.", datetime: "2025-11-15 09:00:00", done: 0, label_id: 3, user_id: 3 },
        { titre: "Réunion client Y", description: "Discussion sur les nouveaux besoins.", datetime: "2025-11-07 10:00:00", done: 0, label_id: 1, user_id: 1 },
        { titre: "Nettoyer le bureau", description: "Trier les papiers et archiver.", datetime: "2025-11-06 17:00:00", done: 0, label_id: 3, user_id: 2 },
        { titre: "Livrer la version beta", description: "Remise au client.", datetime: "2025-11-08 13:00:00", done: 1, label_id: 1, user_id: 3 },
        { titre: "Faire une sauvegarde locale", description: "Backup sur disque dur.", datetime: "2025-11-09 21:00:00", done: 0, label_id: 2, user_id: 1 },
        { titre: "Rédiger compte rendu réunion", description: "Envoyer le CR à l’équipe.", datetime: "2025-11-05 17:30:00", done: 1, label_id: 1, user_id: 2 },
        { titre: "Nettoyer la base de données", description: "Purge des logs obsolètes.", datetime: "2025-11-06 04:00:00", done: 0, label_id: 2, user_id: 3 },
        { titre: "Planifier vacances", description: "Regarder les destinations.", datetime: "2025-11-12 18:00:00", done: 0, label_id: 3, user_id: 1 },
        { titre: "Tester les fonctionnalités", description: "Phase QA.", datetime: "2025-11-06 14:00:00", done: 1, label_id: 1, user_id: 2 },
        { titre: "Faire du sport", description: "30 min de cardio.", datetime: "2025-11-05 07:30:00", done: 0, label_id: 3, user_id: 3 },
        { titre: "Répondre au support", description: "Tickets utilisateurs en attente.", datetime: "2025-11-07 09:00:00", done: 0, label_id: 1, user_id: 1 },
        { titre: "Maintenance serveur", description: "Nettoyage disque et MAJ.", datetime: "2025-11-08 02:00:00", done: 1, label_id: 2, user_id: 2 },
        { titre: "Réviser l’algorithme", description: "Optimiser la performance.", datetime: "2025-11-10 15:00:00", done: 0, label_id: 1, user_id: 3 },
        { titre: "Sortir avec des amis", description: "Soirée samedi.", datetime: "2025-11-09 20:00:00", done: 0, label_id: 3, user_id: 1 },
        { titre: "Préparer rapport bug", description: "Lister les anomalies QA.", datetime: "2025-11-05 15:00:00", done: 1, label_id: 1, user_id: 2 },
        { titre: "Mettre à jour Docker", description: "Pull des dernières images.", datetime: "2025-11-07 08:00:00", done: 0, label_id: 2, user_id: 3 },
        { titre: "Préparer le dossier RH", description: "Contrats stagiaires.", datetime: "2025-11-05 09:45:00", done: 0, label_id: 1, user_id: 1 },
        { titre: "Nettoyer la boîte mail", description: "Supprimer les anciens messages.", datetime: "2025-11-06 11:00:00", done: 0, label_id: 3, user_id: 2 },
        { titre: "Urgence production", description: "Crash du service API.", datetime: "2025-11-04 02:00:00", done: 0, label_id: 2, user_id: 3 },
        { titre: "Lecture technique", description: "Lire un article sur Node.js.", datetime: "2025-11-08 22:00:00", done: 1, label_id: 3, user_id: 1 },
        { titre: "Optimiser la BDD", description: "Amélioration des index.", datetime: "2025-11-07 12:00:00", done: 0, label_id: 1, user_id: 2 },
        { titre: "Nettoyer cache navigateur", description: "Résolution lenteurs.", datetime: "2025-11-06 16:00:00", done: 0, label_id: 3, user_id: 3 },
        { titre: "Mettre à jour la doc API", description: "Nouvelles routes à documenter.", datetime: "2025-11-07 13:30:00", done: 1, label_id: 1, user_id: 1 },
        { titre: "Vérifier sauvegarde distante", description: "Test FTP.", datetime: "2025-11-05 01:00:00", done: 0, label_id: 2, user_id: 2 },
        { titre: "Faire un don", description: "Pour l’association locale.", datetime: "2025-11-09 10:00:00", done: 0, label_id: 3, user_id: 3 },
        { titre: "Révision code", description: "Passer un linter et corriger.", datetime: "2025-11-06 19:00:00", done: 0, label_id: 1, user_id: 1 },
        { titre: "Urgence déploiement", description: "Pipeline cassé.", datetime: "2025-11-04 04:00:00", done: 1, label_id: 2, user_id: 2 },
        { titre: "Ranger les fichiers", description: "Tri dans le dossier documents.", datetime: "2025-11-08 09:00:00", done: 1, label_id: 3, user_id: 3 },
        { titre: "Créer le dashboard", description: "Vue statistique des ventes.", datetime: "2025-11-07 11:00:00", done: 0, label_id: 1, user_id: 1 },
        { titre: "Réserver un billet", description: "Aller-retour pour le weekend.", datetime: "2025-11-10 08:30:00", done: 0, label_id: 3, user_id: 2 },
        { titre: "Corriger bug urgent", description: "Crash dans le module login.", datetime: "2025-11-05 03:00:00", done: 0, label_id: 2, user_id: 3 },
        { titre: "Réviser pour l’examen", description: "Chapitre sur les ORM.", datetime: "2025-11-11 19:00:00", done: 0, label_id: 3, user_id: 1 },
        { titre: "Installer dépendances", description: "MAJ npm install.", datetime: "2025-11-05 13:00:00", done: 1, label_id: 1, user_id: 2 },
      ].map(t => ({ ...t, createdAt: now, updatedAt: now }));

      await queryInterface.bulkInsert("task", tasks, { transaction: t });
    });
  },

  async down(queryInterface) {
    await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { transaction: t });
      await queryInterface.sequelize.query("TRUNCATE TABLE `task`",  { transaction: t });
      await queryInterface.sequelize.query("TRUNCATE TABLE `label`", { transaction: t });
      await queryInterface.sequelize.query("TRUNCATE TABLE `user`",  { transaction: t });
      await queryInterface.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { transaction: t });
    });
  },
};
