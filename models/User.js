const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../core/sequelize');

class User extends Model {
  async validPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8],
          msg: 'Le mot de passe doit contenir au moins 8 caractères',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    hooks: {
      beforeCreate: async (user) => {
        user.password = await bcrypt.hash(user.password, 10);
      },
    },
  }
);

module.exports = User;
