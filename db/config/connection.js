const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/config.js")[env];
require("dotenv").config();

let sequelize;

// if (config.use_env_variable) {
sequelize = new Sequelize(process.env[config.use_env_variable], {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  dialect: "mysql",
  dialectModule: require("mysql2"),
});
// } else {
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASS,
//     {
//       host: process.env.DB_HOST,
//       dialect: "mysql",
//       port: process.env.DB_PORT,
//     }
//   );
// }

module.exports = sequelize;
