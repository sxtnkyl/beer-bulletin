const sequelize = require("../config/connection");
const models = require("../models");

const userSeedData = require("./userSeedData.json");
const tradeSeedData = require("./tradeSeedData.json");
const chatSeedData = require("./chatSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await models.users.bulkCreate(userSeedData);

  await models.trades.bulkCreate(tradeSeedData);

  await models.chats.bulkCreate(chatSeedData);

  process.exit(0);
};

seedDatabase();
