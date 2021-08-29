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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    seeking: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    picture: {
      type: DataTypes.TEXT,
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
