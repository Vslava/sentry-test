const { DataTypes } = require('sequelize');

module.exports = (sequelize) => (
  sequelize.define('test_items', {
    name: DataTypes.STRING,
  }, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })
);
