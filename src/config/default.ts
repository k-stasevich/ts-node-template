const path = require('path');
require('dotenv').config({ path: path.resolve('.env') });

module.exports = {
  appName: process.env.APP_NAME,
  nodeEnv: process.env.NODE_ENV,
  env: process.env.ENV,

  logLevel: process.env.LOG_LEVEL,

  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
};
