"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
   
    static associate(models) {
      Produto.belongsTo(models.Categoria, {
        foreignKey: "categoria_id",
        as: "categoria",
      });
    }
  }
  Produto.init(
    {
      nome: DataTypes.STRING,
      preco: DataTypes.FLOAT,
      categoria_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Produto",
    },
  );
  return Produto;
};
