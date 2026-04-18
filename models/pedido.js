"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    
    static associate(models) {
      Pedido.hasOne(models.Entrega, {
        foreignKey: "pedido_id",
        as: "entrega",
      });

      Pedido.hasOne(models.Avaliacao, {
        foreignKey: "pedido_id",
        as: "avaliacao",
      });
    }
  }
  Pedido.init(
    {
      cliente: DataTypes.STRING,
      total: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Pedido",
    },
  );
  return Pedido;
};
