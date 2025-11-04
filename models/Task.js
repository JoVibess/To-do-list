"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Associations: appelé automatiquement par models/index.js
     */
    static associate(models) {
      // Task.belongsTo(Label)
      Task.belongsTo(models.Label, {
        foreignKey: { name: "labelId", field: "label_id", allowNull: true },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });


    }
  }

  Task.init(
    {
      done: {
        type: DataTypes.TINYINT,     // 0 | 1
        allowNull: false,
        defaultValue: 0,
        validate: { isIn: { args: [[0, 1]], msg: "done doit être 0 ou 1" } },
      },
      datetime: {
        type: DataTypes.DATE,
        allowNull: false,            // deadline obligatoire
        validate: {
          notNull: { msg: "datetime est requis" },
          isDate: { msg: "datetime invalide" },
        },
      },
      titre: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { notEmpty: { msg: "titre requis" } },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      labelId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "label_id",          
      },
    },
    {
      sequelize,
      modelName: "Task",
      tableName: "task",
      timestamps: false,
      indexes: [{ fields: ["label_id"] }],
    }
  );

  return Task;
};

Task.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

    done: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isIn: { args: [[0, 1]], msg: 'done doit être 0 ou 1' },
      },
    },

    // DEADLINE OBLIGATOIRE
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'datetime requis' },
        isDate: true,
      },
    },

    titre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: { notEmpty: { msg: 'titre requis' } },
    },

    description: { type: DataTypes.TEXT, allowNull: true },

    labelId: { type: DataTypes.INTEGER, allowNull: true, field: 'label_id' },

    userId: { type: DataTypes.INTEGER, allowNull: false, field: 'user_id' },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'task',
    timestamps: false,
    indexes: [{ fields: ['label_id'] }, { fields: ['user_id'] }],
  }
);

module.exports = Task;

