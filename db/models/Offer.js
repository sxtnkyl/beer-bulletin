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
      type: DataTypes.STRING,
      allowNull: false,
    },
    participant_id: {
      type: DataTypes.INTEGER,
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
    },
    // chat_log: {},
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
