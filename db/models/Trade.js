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
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   // maybe no bad words? lol
      // },
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
    // current_offers: {
    //   type: DataTypes.STRING,
    // },
    seeking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    open: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
