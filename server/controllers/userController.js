const User = require('../models/User');
const AuctionItem = require('../models/AuctionItem');
const Bid = require('../models/Bid');
const bcrypt = require('bcryptjs');


// Get user profile along with auction items and bids
exports.getUserProfile = async (req, res) => {
  try {
    const UserId = req.user.id;
    const user = await User.findByPk(UserId, {
      include: [
        {
          model: AuctionItem,
          include: [
            {
              model: Bid,
              required: false, // Include bids, if any
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// // Get user profile
// exports.getUserProfile = async (req, res) => {
  
//   try {
//     const UserId = req.user.id; // Assuming you're getting the user ID from the JWT token
//     const user = await User.findByPk(UserId);
//     if (!user) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(user);
//   } catch (error) {
//     console.error('Error fetching user profile:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// // Get user's auction items
// exports.getUserAuctionItems = async (req, res) => {
//   try {
//     const UserId = req.user.id;
//     const items = await AuctionItem.findAll({ where: { UserId } });
//     res.json(items);
//   } catch (error) {
//     console.error('Error fetching auction items:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// Get user's auction items along with bids
exports.getUserAuctionItems = async (req, res) => {
  try {
    const UserId = req.user.id; // Ensure this comes from your auth middleware
    console.log('User ID:', UserId); // Debugging line to check the user ID

    // Fetch auction items for the user along with bids
    const items = await AuctionItem.findAll({
      where: { UserId },
      include: [
        {
          model: Bid,
          required: false, // Include items even if they have no bids
        },
      ],
    });

    // If no items are found, handle it gracefully
    if (!items || items.length === 0) {
      return res.status(404).json({ message: 'No auction items found for this user.' });
    }

    res.json(items);
  } catch (error) {
    console.error('Error fetching auction items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const UserId = req.user.id; // Assuming you're using some auth middleware to get the logged-in user
    const user = await User.findByPk(UserId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields
    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      // Hash the new password if provided
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({ message: 'Profile updated successfully', user: { name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get user's bids
exports.getUserBids = async (req, res) => {
  try {
    const UserId = req.user.id; // Assuming you're using an auth middleware to get the logged-in user's ID

    // Find all bids by the user
    const bids = await Bid.findAll({
      where: { UserId }, // Find bids where UserId matches
      include: [
        {
          model: AuctionItem, // Include details of the auction item the bid is associated with
          required: true,
        },
      ],
    });

    if (bids.length === 0) {
      return res.status(404).json({ error: 'No bids found for this user' });
    }

    res.json(bids);
  } catch (error) {
    console.error('Error fetching user bids:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Place a bid
exports.postPlaceBid = async (req, res) => {
  const { auctionItemId, bidAmount } = req.body;
  //const userId = req.userId; // Extracted from the token using authMiddleware

  const userId = req.user.id;

  if (!auctionItemId || !bidAmount) {
    return res.status(400).json({ error: 'Auction item ID and bid amount are required.' });
  }

  console.log('User ID:', userId); // Debugging line to check userId

  try {
    // Find the auction item
    const auctionItem = await AuctionItem.findOne({
      where: { id: auctionItemId },
    });

    if (!auctionItem) {
      return res.status(404).json({ error: 'Auction item not found.' });
    }

    // Check if the highest bid is higher than the new bid amount
    const highestBid = await Bid.findOne({
      where: { AuctionItemId: auctionItemId },
      order: [['amount', 'DESC']], // Get the highest bid
    });

    // Ensure the new bid is higher than the current highest bid
    if (highestBid && bidAmount <= highestBid.amount) {
      return res.status(400).json({ error: 'Bid amount must be higher than the current highest bid.' });
    }

    // Check if userId is valid
    if (!userId) {
      return res.status(400).json({ error: 'User ID cannot be null.' });
    }

    // Place the bid
    const newBid = await Bid.create({
      UserId: userId,         // Ensure you're using the correct userId field
      AuctionItemId: auctionItemId,
      amount: bidAmount,      // Ensure the field names match your Bid model
    });

    return res.status(201).json(newBid);
  } catch (error) {
    console.error('Error placing bid:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
};



