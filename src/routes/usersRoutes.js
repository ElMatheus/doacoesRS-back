const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

router.get('/users', ensureAuthenticated,usersController.getAllUsers);
router.get('/users/:id', usersController.getUserById);
router.get('/users/name/:name', usersController.getUserByName);
router.post('/users', usersController.createUser);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);
router.post('/users/login', usersController.loginUser);
router.post('/users/refresh', usersController.refreshToken);

module.exports = router;