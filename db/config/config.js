"use strict";
module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acuire: 30000,
      idle: 10000,
    },
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acuire: 30000,
      idle: 10000,
    },
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acuire: 30000,
      idle: 10000,
    },
  },
};
