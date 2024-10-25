const sequelize = require('../config/database');
const User = require('./User');
const AuctionItem = require('./AuctionItem');
const Bid = require('./Bid');

// Define model associations
User.hasMany(AuctionItem, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE', // Deleting a user will delete their auction items
});
AuctionItem.belongsTo(User);

AuctionItem.hasMany(Bid, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE', // Deleting an auction item will delete associated bids
});
Bid.belongsTo(AuctionItem);

Bid.belongsTo(User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: 'CASCADE', // Deleting a user will delete their bids
});

// Sync models with the database
sequelize.sync({ alter: true }) // Use { alter: true } to modify the schema without dropping tables
  .then(() => console.log('Database synced'))
  .catch((err) => console.log('Error syncing database: ', err));

// Export the models and sequelize instance
module.exports = { sequelize, User, AuctionItem, Bid };
