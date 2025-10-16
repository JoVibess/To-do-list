"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "task",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        done: {
          type: Sequelize.TINYINT, // 0|1
          allowNull: false,
          defaultValue: 0,
        },
        datetime: {
          type: Sequelize.DATE,
          allowNull: false, // deadline obligatoire
        },
        titre: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        label_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: "label", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
      },
      {
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
      }
    );

  },

  async down(queryInterface) {
    await queryInterface.dropTable("task");
  },
};
