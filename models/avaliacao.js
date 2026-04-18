"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Avaliacao extends Model {
    static associate(models) {
      Avaliacao.belongsTo(models.Pedido, {
        foreignKey: "pedido_id",
        as: "pedido",
      });
    }
  }
  Avaliacao.init(
    {
      nota: DataTypes.INTEGER,
      pedido_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Avaliacao",
    },
  );
  return Avaliacao;
};
