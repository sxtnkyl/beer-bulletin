const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/./config.js")[env];

let sequelize;

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
      pool: {
        max: 5,
        min: 0,
        acuire: 30000,
        idle: 10000,
      },
    }
  );
}

module.exports = sequelize;
