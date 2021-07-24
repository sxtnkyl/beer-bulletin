const User = require("./User");
const Trade = require("./Trade");
const Chat = require("./Chat");

//hasOne = FK in target
//belongsTo = FK in source
//hasMany = FK in target
User.hasMany(Trade, {
  as: "poster_id",
});

User.hasMany(Chat, {
  as: "poster_id",
});

User.hasMany(Chat, { as: "participant_id" });

Trade.hasMany(Chat, { as: "chats" });

Chat.belongsTo(User, { foreignKey: "participant" });

Chat.belongsTo(User, { as: "participant_id" });

module.exports = { User, Trade, Chat };
