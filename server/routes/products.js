const express = require('express');
const router = express.Router();
const { getProducts, seedProducts } = require('../controllers/productController');

router.get('/', getProducts);
router.post('/seed', seedProducts);

module.exports = router;
