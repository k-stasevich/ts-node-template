const path = require('path');
require('dotenv').config({ path: path.resolve('.env') });

module.exports = {
  database: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
};

// function toBoolean(value?: string) {
//   return value === 'true';
// }
