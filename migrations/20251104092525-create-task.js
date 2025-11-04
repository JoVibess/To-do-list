'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('task', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      done: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0,
      },

      datetime: {
        type: Sequelize.DATE,
        allowNull: false,
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
        references: {
          model: 'label',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('task');
  },
};

