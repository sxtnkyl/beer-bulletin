const Sequelize = require("sequelize");
const sequelize = require("../config/connection");

const Offer = require("./Offer");
const User = require("./User");
const Trade = require("./Trade");

User.hasMany(Trade, {
  foreignKey: "user_id",
  // Define an alias for when data is retrieved
  as: "user_trades",
});

User.hasMany(Offer, {
  foreignKey: "participant_id",
  as: "user_offers",
});

Trade.hasMany(Offer, {
  foreignKey: "trade_id",
});

Trade.belongsTo(User, {
  foreignKey: "user_id",
  as: "host",
});

Offer.belongsTo(User, {
  foreignKey: "participant_id",
  as: "participant",
});

Offer.belongsTo(User, {
  foreignKey: "host_id",
  as: "host",
});

Offer.belongsTo(Trade, {
  foreignKey: "trade_id",
});

const db = {
  users: User,
  offers: Offer,
  trades: Trade,
  sequelize: sequelize,
  Sequelize: Sequelize,
};

module.exports = db;
