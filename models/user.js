'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.profile, {
        as: "profile",
        foreignKey: {
          name: "idUser",
        },
      });
      user.hasMany(models.transaction, {
        as: "userTransactions",
        foreignKey: {
          name: "idUser",
        },
      });
      user.hasMany(models.favorite, {
        as: "userFavorite",
        foreignKey: {
          name: "idUser",
        },
      });
      user.hasMany(models.order, {
        as: "userOrder",
        foreignKey: {
          name: "idUser",
        },
      });
      user.hasMany(models.shipping, {
        as: "userShipping",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};