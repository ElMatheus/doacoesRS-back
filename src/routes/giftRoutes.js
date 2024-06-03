const express = require('express');
const router = express.Router();
const giftController = require('../controllers/giftController');

router.get('/gift', giftController.getAllGift);
router.get('/gift/id/:id', giftController.getGiftById);
router.post('/gift', giftController.createGift);
router.put('/gift/:id', giftController.updateGift);
router.delete('/gift/:id', giftController.deleteGift);


module.exports = router;
