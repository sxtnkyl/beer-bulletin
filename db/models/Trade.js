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
    content: {
      type: DataTypes.STRING,
      validate: {
        len: [250],
      },
    },
    currentOffers: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    open: {
      type: DataTypes.BOOLEAN,
    },
    // chats: {
    //   type: DataTypes.ARRAY,
    // },
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
