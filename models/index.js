const { Sequelize } = require('sequelize');

const {
  DATABASE_URL,
} = require('../config');

const sequelize = new Sequelize(DATABASE_URL);

const TestItem = require('./test-item')(sequelize);

module.exports = {
  TestItem,
};
