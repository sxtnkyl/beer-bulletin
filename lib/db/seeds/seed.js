const sequelize = require("../../config/connection");
const { User, Trade, Chat } = require("../../models");

const userSeedData = require("./userSeedData.json");
const tradeSeedData = require("./tradeSeedData.json");
const chatSeedData = require("./chatSeedData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userSeedData);

  const trades = await Trade.bulkCreate(tradeSeedData);

  const chats = await Chat.bulkCreate(chatSeedData);

  process.exit(0);
};

seedDatabase();
