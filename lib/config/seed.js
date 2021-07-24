//create local db or refresh
const sequelize = require("./connection");
const { User, Trade, Chat } = require("../models");

const userSeedData = require("./travellerSeedData.json");
const tradeSeedData = require("./tradeSeedData.json");
const chatSeedData = require("./chatSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeedData, { validate: true });
  await Trade.bulkCreate(tradeSeedData, { validate: true });
  await Chat.bulkCreate(chatSeedData, { validate: true });

  process.exit(0);
};

// seedDatabase()
