
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Label extends Model {
    static associate(models) {
      Label.hasMany(models.Task, {
        foreignKey: { name: "labelId", field: "label_id" },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../core/sequelize');

class Label extends Model {}

Label.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    color: {
      type: DataTypes.STRING(7),
      allowNull: false,
      defaultValue: '#999999',
    },
  },
  {
    sequelize,
    modelName: 'Label',
    tableName: 'label',
    timestamps: false,

  }
  Label.init(
    {
      name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      color:{ type: DataTypes.STRING(7),  allowNull: false, defaultValue: "#999999" },
    },
    { sequelize, modelName: "Label", tableName: "label", timestamps: false }
  );
  return Label;
};
