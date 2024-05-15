const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

router.get('/products', productsController.getAllProducts);
router.get('/products/:id', productsController.getProductById);
router.post('/products', productsController.createProduct);
router.get('/products/name/:name', productsController.getProductByName);
router.get('/products/type/:type', productsController.getProductByType);
router.put('/products/:id', productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);

module.exports = router;