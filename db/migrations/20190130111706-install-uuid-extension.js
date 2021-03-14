module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto;');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP EXTENSION IF EXISTS "uuid-ossp";');
    await queryInterface.sequelize.query('DROP EXTENSION IF EXISTS pgcrypto;');
  }
};
