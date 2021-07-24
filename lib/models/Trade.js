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
    poster_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
        unique: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        // maybe no bad words? lol
      },
    },
    content: {
      type: DataTypes.STRING,
      defaultValue: "",
      validate: {
        len: [250],
      },
    },
    offers: {
      type: DataTypes.ARRAY,
      defaultValue: [],
    },
    resolved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    chats: {
      type: DataTypes.ARRAY,
      defaultValue: [],
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "trade",
  }
);

module.exports = Trade;
