const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_DEV,
    password: process.env.DATABASE_DEVKEY,
    database: process.env.DATABASE_DB,
    operatorsAliases: Sequelize.Op,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    operatorsAliases: Sequelize.Op,
    dialect: 'postgres'
  },
  production: {
    DATABASE_URL: 'USE_ENV_VARIABLE',
    operatorsAliases: Sequelize.Op,
    dialect: 'postgres'
  }
};
