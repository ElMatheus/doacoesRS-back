const express = require('express');
const router = express.Router();
const donations_itemController = require('../controllers/donations_itemController');

router.get('/donations_items', donations_itemController.getAllDonationsItems);
router.post('/donations_items', donations_itemController.createDonationItem);

module.exports = router;