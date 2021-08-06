const Sequelize = require("sequelize");
const sequelize = require("../config/connection");

const Chat = require("./Chat");
const User = require("./User");
const Trade = require("./Trade");

User.hasMany(Trade, {
  // Define the third table needed to store the foreign keys
  foreignKey: "user_id",
  // Define an alias for when data is retrieved
  as: "user_trades",
});

Trade.hasMany(Chat, {
  foreignKey: "trade_id",
});

Chat.belongsTo(User, {
  foreignKey: "participant_id",
  as: "participant",
});

const db = {
  users: User,
  chats: Chat,
  trades: Trade,
  sequelize: sequelize,
  Sequelize: Sequelize,
};

module.exports = db;
