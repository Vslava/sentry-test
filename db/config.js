const {
  DATABASE_URL,
  DATABASE_SSL_ON,
} = require('../config');

const common = {
  url: DATABASE_URL,
  dialect: 'postgres',
  dialectOptions: {
    bigNumberStrings: true,
  }
};

if (DATABASE_SSL_ON) {
  common.dialectOptions.ssl = {
    require: true,
    rejectUnauthorized: false,
  };
}

module.exports = {
  development: common,
  test: common,
  production: common,
};
