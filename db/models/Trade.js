const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Trade extends Model {}

Trade.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        // maybe no bad words? lol
      },
    },
    // SHOULD THIS HAVE A LENGTH LIMIT??
    content: {
      type: DataTypes.TEXT,
      // THISS MEANS IT HAS TO BE AT LEAST 250, find new way...
      // validate: {
      //   len: [250],
      // },
    },
    // how is this going to look/be formatted?
    current_offers: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    open: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "trade",
  }
);

module.exports = Trade;
