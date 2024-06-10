const express = require('express');
const router = express.Router();
const donations_itemController = require('../controllers/donations_itemController');

router.get('/donations_items', donations_itemController.getAllDonationsItems);
router.get('/donations_items/:id', donations_itemController.getAllDonationsItemsByDonationId);
router.get('/donations_items/fullPrice/:id', donations_itemController.getFullPriceByDonationId);
router.post('/donations_items', donations_itemController.createDonationItem);

module.exports = router;