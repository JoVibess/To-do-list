const path = require('path');
const dotenv = require('dotenv');

// Charge .env puis .env.local (qui override)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(process.cwd(), '.env.local'), override: true });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:     process.env.DB_HOST,
    port:     Number(process.env.DB_PORT || 3306),
    dialect:  'mysql',
    logging:  false,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host:     '127.0.0.1',
    dialect:  'mysql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:     process.env.DB_HOST,
    port:     Number(process.env.DB_PORT || 3306),
    dialect:  'mysql',
    logging:  false,
  },
};
