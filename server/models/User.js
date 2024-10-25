const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  schema: 'auction_schema',  // Specify the schema
  tableName: 'Users',        // Optionally specify the table name
  timestamps: true,          // Adds createdAt and updatedAt
});

module.exports = User;
