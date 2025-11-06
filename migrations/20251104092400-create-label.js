'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('label', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: Sequelize.STRING(50), allowNull: false, unique: true },
      color: { type: Sequelize.STRING(7), allowNull: false, defaultValue: '#999999' },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('label');
  },
};
