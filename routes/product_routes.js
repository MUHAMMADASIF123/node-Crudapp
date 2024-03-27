const express = require('express');
const router = express.Router();
const productController = require('../controllers/product_controller');

router.get('/api/product', productController.getProducts);
router.get('/api/product/:id', productController.getProduct);
router.post('/api/product', productController.createProduct);
router.put('/api/product/:id', productController.updateProduct);
router.delete('/api/product/:id', productController.deleteProduct);

module.exports = router;
     