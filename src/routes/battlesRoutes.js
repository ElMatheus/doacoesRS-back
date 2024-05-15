const express = require('express');
const router = express.Router();
const battlesController = require('../controllers/battlesController');

router.get('/battles', battlesController.getAllBattles);
router.get('/battles/name/:name', battlesController.getBattleByHeroName);
router.get('/battles/:heroi1/:heroi2', battlesController.battle);

module.exports = router;