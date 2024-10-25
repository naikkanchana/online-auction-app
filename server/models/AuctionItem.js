const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AuctionItem = sequelize.define('AuctionItem', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  startingBid: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  schema: 'auction_schema', // Specify the schema name here
  tableName: 'AuctionItems', // Optionally specify the table name
  timestamps: true, // Enable timestamps (createdAt, updatedAt)
});
// Define the association
AuctionItem.associate = (models) => {
  AuctionItem.hasMany(models.Bid, { foreignKey: 'auctionItemId' });
};

module.exports = AuctionItem;
