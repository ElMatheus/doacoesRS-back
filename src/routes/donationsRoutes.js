const express = require('express');
const router = express.Router();
const donationsController = require('../controllers/donationsController');

router.get('/donations', donationsController.getAllDonations);
router.get('/donations/:id', donationsController.getDonationById);
router.post('/donations', donationsController.createDonation);
router.put('/donations/:id', donationsController.updateDonation);
router.delete('/donations/:id', donationsController.deleteDonation);

module.exports = router;