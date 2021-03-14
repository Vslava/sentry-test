require('dotenv').config();

const SENTRY_DSN = process.env.SENTRY_DSN;
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_SSL_ON = typeof process.env.DATABASE_SSL_ON !== 'undefined'
  ? (process.env.DATABASE_SSL_ON === 'true')
  : false;

module.exports = {
  SENTRY_DSN,
  DATABASE_URL,
  DATABASE_SSL_ON,
};
