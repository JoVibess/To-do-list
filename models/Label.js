const { DataTypes, Model } = require('sequelize');
const sequelize = require('../core/sequelize');

class Label extends Model {}

Label.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    color: { type: DataTypes.STRING(7), allowNull: false, defaultValue: '#999999' },
  },
  {
    sequelize,
    modelName: 'Label',
    tableName: 'label',
    timestamps: false,
  }
);

module.exports = Label;
