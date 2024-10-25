const express = require('express');
//const { createAuctionItem, placeBid, getAllAuctionItems } = require('../controllers/auctionController');
const authMiddleware = require('../middleware/authMiddleware');
const auctionController = require('../controllers/auctionController');


const router = express.Router();

router.post('/auction', authMiddleware, auctionController.createAuctionItem);
router.post('/auction/bid', authMiddleware, auctionController.placeBid);
router.get('/getRecords', authMiddleware, auctionController.getAllAuctionItems); // Fetch all auction items
router.delete('/deleteAuction/:id', authMiddleware, auctionController.deleteAuctionItem); // Fetch all auction items
router.put('/updateAuction/:id', authMiddleware, auctionController.updateAuctionItem); // Fetch all auction items

module.exports = router;
