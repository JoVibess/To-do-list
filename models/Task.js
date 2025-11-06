const { DataTypes, Model } = require('sequelize');
const sequelize = require('../core/sequelize');
const Label = require('./Label');
const User = require('./User');

class Task extends Model {}

Task.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    titre: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    datetime: { type: DataTypes.DATE, allowNull: false },
    done: { type: DataTypes.BOOLEAN, defaultValue: false },
    labelId: {
      type: DataTypes.INTEGER,
      field: 'label_id',
      references: { model: 'label', key: 'id' },
    },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
      references: { model: 'user', key: 'id' },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'task',
  }
);

module.exports = Task;
