const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');

router.get('/gifts', giftController.getAllGifts);
router.get('/gifts/id/:id', giftController.getGiftById);
router.post('/gifts', giftController.createGift);
router.put('/gifts/:id', giftController.updateGift);
router.delete('/gifts/:id', giftController.deleteGift);


module.exports = router;
