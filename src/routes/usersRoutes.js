const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

router.get('/users', usersController.getAllUsers);
router.get('/users/:id', ensureAuthenticated ,usersController.getUserById);
router.get('/users/name/:name', usersController.getUserByName);
router.get('/users/email/:email', usersController.getUserByEmail);
router.post('/users', usersController.createUser);
router.put('/users/:id', usersController.updateUser);
router.delete('/users/:id', usersController.deleteUser);
router.post('/users/login', usersController.loginUser);
router.post('/users/refresh', usersController.refreshToken);

module.exports = router;