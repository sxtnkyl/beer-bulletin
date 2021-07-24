const Chat = require("./Chat");
const User = require("./User");
const Trade = require("./Trade");

User.belongsToMany(Trade, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Chat,
    unique: false,
  },
  // Define an alias for when data is retrieved
  as: "user_trades",
});

Trade.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Chat,
    unique: false,
  },
  // Define an alias for when data is retrieved
  as: "trade_participants",
});

module.exports = { Chat, Trade, User };
