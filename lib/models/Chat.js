const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Chat extends Model {}

Chat.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "user",
      },
    },
    participant_id: {
      type: DataTypes.STRING,
    },
    resolved: {
      type: DataTypes.BOOLEAN,
    },
    trade_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "trade",
      },
    },
    // chatLog: {},
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "chat",
  }
);

module.exports = Chat;
