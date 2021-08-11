const sequelize = require("../config/connection");
const models = require("../models");

const userSeedData = require("./userSeedData.json");
const tradeSeedData = require("./tradeSeedData.json");
const offerSeedData = require("./offerSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await models.users.bulkCreate(userSeedData, {
    individualHooks: true,
  });

  await models.trades.bulkCreate(tradeSeedData);

  await models.offers.bulkCreate(offerSeedData);

  process.exit(0);
};

seedDatabase();
