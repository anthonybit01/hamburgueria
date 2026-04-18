"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Entrega extends Model {
    static associate(models) {
      Entrega.belongsTo(models.Pedido, {
        foreignKey: "pedido_id",
        as: "pedido",
      });
    }
  }
  Entrega.init(
    {
      endereco: DataTypes.STRING,
      status: DataTypes.STRING,
      pedido_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Entrega",
    },
  );
  return Entrega;
};
