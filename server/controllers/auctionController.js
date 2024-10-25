// const { AuctionItem, Bid } = require('../models');

// // Create an auction item
// exports.createAuctionItem = async (req, res) => {
//   const { title, description, startingBid, endDate } = req.body;
//   try {
//     const auctionItem = await AuctionItem.create({ title, description, startingBid, endDate, UserId: req.userId });
//     res.status(201).json(auctionItem);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to create auction item' });
//   }
// };

// // Place a bid
// exports.placeBid = async (req, res) => {
//   const { auctionItemId, amount } = req.body;
//   try {
//     const auctionItem = await AuctionItem.findByPk(auctionItemId);
//     if (!auctionItem) return res.status(404).json({ message: 'Auction item not found' });

//     const highestBid = await Bid.findOne({ where: { AuctionItemId: auctionItemId }, order: [['amount', 'DESC']] });

//     if (highestBid && amount <= highestBid.amount) {
//       return res.status(400).json({ message: 'Bid must be higher than the current highest bid' });
//     }

//     const bid = await Bid.create({ amount, AuctionItemId: auctionItemId, UserId: req.userId });
//     res.status(201).json(bid);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to place bid' });
//   }
// };
// // Get all auction items
// exports.getAllAuctionItems = async (req, res) => {
//   try {
//     const auctionItems = await AuctionItem.findAll();
//     res.status(200).json(auctionItems);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error, unable to fetch auction items.' });
//   }
// };

// // Update auction item
// exports.updateAuctionItem = async (req, res) => {
//   const { id } = req.params;
//   const { title, description, startingBid, endDate } = req.body;

//   try {
//     const auctionItem = await AuctionItem.findByPk(id);

//     if (!auctionItem || auctionItem.UserId !== req.userId) {
//       return res.status(404).json({ message: 'Auction item not found or you do not have permission to edit.' });
//     }

//     auctionItem.title = title;
//     auctionItem.description = description;
//     auctionItem.startingBid = startingBid;
//     auctionItem.endDate = endDate;

//     await auctionItem.save();
//     res.status(200).json(auctionItem);
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to update auction item' });
//   }
// };

// // Delete auction item
// exports.deleteAuctionItem = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const auctionItem = await AuctionItem.findByPk(id);

//     if (!auctionItem || auctionItem.UserId !== req.userId) {
//       return res.status(404).json({ message: 'Auction item not found or you do not have permission to delete.' });
//     }

//     await auctionItem.destroy();
//     res.status(204).send(); // No content
//   } catch (error) {
//     res.status(400).json({ error: 'Failed to delete auction item' });
//   }
// };

const { AuctionItem, Bid } = require('../models');
const { User } = require('../models'); // Import User model for reference if needed
const bcrypt = require('bcryptjs');

// // Create an auction item
// exports.createAuctionItem = async (req, res) => {
//   const { title, description, startingBid, endDate } = req.body;
//   try {
//     const auctionItem = await AuctionItem.create({
//       title,
//       description,
//       startingBid,
//       endDate,
//       UserId: req.userId // Assuming req.userId is set by your authentication middleware
//     });
//     res.status(201).json(auctionItem);
//   } catch (error) {
//     console.error('Error creating auction item:', error);
//     res.status(400).json({ error: 'Failed to create auction item' });
//   }
// };


exports.createAuctionItem = async (req, res) => {
  const { title, description, startingBid, endDate } = req.body;
  
  try {
    const userId = req.user.id; // Assuming you're getting the user ID from the JWT token

    const auctionItem = await AuctionItem.create({
      title,
      description,
      startingBid,
      endDate,
      UserId: userId // Use userId from req.user
    });
    
    res.status(201).json(auctionItem);
  } catch (error) {
    console.error('Error creating auction item:', error);
    res.status(400).json({ error: 'Failed to create auction item' });
  }
};


// // Place a bid
// exports.placeBid = async (req, res) => {
//   const { auctionItemId, amount } = req.body;
//   try {
//     const auctionItem = await AuctionItem.findByPk(auctionItemId);
//     if (!auctionItem) return res.status(404).json({ message: 'Auction item not found' });

//     const highestBid = await Bid.findOne({
//       where: { AuctionItemId: auctionItemId },
//       order: [['amount', 'DESC']]
//     });

//     if (highestBid && amount <= highestBid.amount) {
//       return res.status(400).json({ message: 'Bid must be higher than the current highest bid' });
//     }

//     // Create the bid with the user ID from req.userId
//     const bid = await Bid.create({
//       amount,
//       AuctionItemId: auctionItemId,
//       UserId: req.userId // Map the bid to the user
//     });
//     res.status(201).json(bid);
//   } catch (error) {
//     console.error('Error placing bid:', error);
//     res.status(400).json({ error: 'Failed to place bid' });
//   }
// };

// // Get all auction items
// exports.getAllAuctionItems = async (req, res) => {
//   try {
//     const auctionItems = await AuctionItem.findAll();
//     res.status(200).json(auctionItems);
//   } catch (error) {
//     console.error('Error fetching auction items:', error);
//     res.status(500).json({ message: 'Server error, unable to fetch auction items.' });
//   }
// };

// // Update auction item
// exports.updateAuctionItem = async (req, res) => {
//   const { id } = req.params;
//   const { title, description, startingBid, endDate } = req.body;

//   try {
//     const auctionItem = await AuctionItem.findByPk(id);

//     if (!auctionItem || auctionItem.UserId !== req.userId) {
//       return res.status(404).json({ message: 'Auction item not found or you do not have permission to edit.' });
//     }

//     auctionItem.title = title || auctionItem.title; // Keep existing if not provided
//     auctionItem.description = description || auctionItem.description;
//     auctionItem.startingBid = startingBid || auctionItem.startingBid;
//     auctionItem.endDate = endDate || auctionItem.endDate;

//     await auctionItem.save();
//     res.status(200).json(auctionItem);
//   } catch (error) {
//     console.error('Error updating auction item:', error);
//     res.status(400).json({ error: 'Failed to update auction item' });
//   }
// };

// // Delete auction item
// exports.deleteAuctionItem = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const auctionItem = await AuctionItem.findByPk(id);

//     if (!auctionItem || auctionItem.UserId !== req.userId) {
//       return res.status(404).json({ message: 'Auction item not found or you do not have permission to delete.' });
//     }

//     await auctionItem.destroy();
//     res.status(204).send(); // No content
//   } catch (error) {
//     console.error('Error deleting auction item:', error);
//     res.status(400).json({ error: 'Failed to delete auction item' });
//   }
// };

// Place a bid
exports.placeBid = async (req, res) => {
  const { auctionItemId, amount } = req.body;
  try {
    const auctionItem = await AuctionItem.findByPk(auctionItemId);
    if (!auctionItem) return res.status(404).json({ message: 'Auction item not found' });

    const highestBid = await Bid.findOne({
      where: { AuctionItemId: auctionItemId },
      order: [['amount', 'DESC']]
    });

    if (highestBid && amount <= highestBid.amount) {
      return res.status(400).json({ message: 'Bid must be higher than the current highest bid' });
    }

    // Create the bid with the user ID from req.user.id
    const bid = await Bid.create({
      amount,
      AuctionItemId: auctionItemId,
      UserId: req.user.id // Use the user ID from the request
    });
    res.status(201).json(bid);
  } catch (error) {
    console.error('Error placing bid:', error);
    res.status(400).json({ error: 'Failed to place bid' });
  }
};


// Get all auction items
exports.getAllAuctionItems = async (req, res) => {
  try {
    const auctionItems = await AuctionItem.findAll();
    res.status(200).json(auctionItems);
  } catch (error) {
    console.error('Error fetching auction items:', error);
    res.status(500).json({ message: 'Server error, unable to fetch auction items.' });
  }
};

// Update auction item
exports.updateAuctionItem = async (req, res) => {
  const { id } = req.params;
  const { title, description, startingBid, endDate } = req.body;

  try {
    const auctionItem = await AuctionItem.findByPk(id);

    if (!auctionItem || auctionItem.UserId !== req.user.id) {
      return res.status(404).json({ message: 'Auction item not found or you do not have permission to edit.' });
    }

    auctionItem.title = title || auctionItem.title; // Keep existing if not provided
    auctionItem.description = description || auctionItem.description;
    auctionItem.startingBid = startingBid || auctionItem.startingBid;
    auctionItem.endDate = endDate || auctionItem.endDate;

    await auctionItem.save();
    res.status(200).json(auctionItem);
  } catch (error) {
    console.error('Error updating auction item:', error);
    res.status(400).json({ error: 'Failed to update auction item' });
  }
};

// Delete auction item
exports.deleteAuctionItem = async (req, res) => {
  const { id } = req.params;

  try {
    const auctionItem = await AuctionItem.findByPk(id);

    if (!auctionItem || auctionItem.UserId !== req.user.id) {
      return res.status(404).json({ message: 'Auction item not found or you do not have permission to delete.' });
    }

    await auctionItem.destroy();
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting auction item:', error);
    res.status(400).json({ error: 'Failed to delete auction item' });
  }
};
