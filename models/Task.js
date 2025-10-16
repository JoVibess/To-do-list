const { DataTypes, Model } = require('sequelize');
const sequelize = require('../core/sequelize');

class Task extends Model {}

Task.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

  done: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 0,
    validate: { isIn: { args: [[0, 1]], msg: 'done doit être 0 ou 1' } },
  },

  // <- DEADLINE OBLIGATOIRE
  datetime: { type: DataTypes.DATE, allowNull: false, validate: { notNull: { msg: 'datetime requis' }, isDate: true } },

  titre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { notEmpty: { msg: 'titre requis' } },
  },

  description: { type: DataTypes.TEXT, allowNull: true },

  labelId: { type: DataTypes.INTEGER, allowNull: true, field: 'label_id' },
}, {
  sequelize,
  modelName: 'Task',
  tableName: 'task',
  timestamps: false,
  indexes: [{ fields: ['label_id'] }],
});

module.exports = Task;

