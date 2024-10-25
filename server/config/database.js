const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    // Add this option to specify the schema
    schema: 'auction_schema',
},
});

module.exports = sequelize;
