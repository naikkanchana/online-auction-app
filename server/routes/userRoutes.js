const express = require('express');
const { getUserProfile, getUserAuctionItems, updateUserProfile, getUserBids,postPlaceBid } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to authenticate users

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, getUserProfile);

// Get user's auction items
router.get('/auctionitems', authMiddleware, getUserAuctionItems);

// Update user profile
router.put('/update-profile', authMiddleware, updateUserProfile);

// getting the bids
router.get('/bids',authMiddleware, getUserBids);

router.post('/placeBid',authMiddleware,postPlaceBid)

module.exports = router;
