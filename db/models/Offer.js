const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Offer extends Model {}

Offer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    host_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    participant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    trade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "trade",
      },
    },
    resolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    offer_money: {
      type: DataTypes.INTEGER,
    },
    offer_beer: {
      type: DataTypes.STRING,
    },
    offer_other: {
      type: DataTypes.STRING,
    },

    // chat_log: {
    //   type: DataTypes.STRING,
    //   defaultValue: null,
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "offer",
  }
);

module.exports = Offer;
