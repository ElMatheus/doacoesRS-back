const express = require('express');
const router = express.Router();
const gift_itemController = require('../controllers/gift_itemController');

router.get('/gift_item', gift_itemController.getAllGiftItems);
router.get('/gift_item/:id', gift_itemController.getGiftItemById);
router.post('/gift_item', gift_itemController.createGiftItem);
router.put('/gift_item/:id', gift_itemController.updateGiftItem);
router.delete('/gift_item/:id', gift_itemController.deleteGiftItem);

module.exports = router;