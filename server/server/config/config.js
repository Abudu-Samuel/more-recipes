import dotevn from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    username: process.env.DATABASE_DEV,
    password: process.env.DATABASE_DEV_KEY,
    database: process.env.DATABASE_DB,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    DATABASE_URL: 'USE_ENV_VARIABLE',
    dialect: 'postgres'
  }
};
