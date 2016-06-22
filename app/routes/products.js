'use strict';

const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product');
const auth = require('../middlewares/authentication');
const main = require('../controllers/main');

router.post('/products', auth.ensured, productCtrl.addOne, main.toJSON('products'));

router.get('/products', auth.ensured, productCtrl.getAll, main.toJSON('products'));
router.get('/products/:productId', auth.ensured, productCtrl.findById, main.toJSON('product'));
router.put('/products/:productId', auth.ensured, productCtrl.findById, productCtrl.update, main.toJSON('product'));
router.delete('/products/:productId', auth.ensured, productCtrl.findById, productCtrl.delete);

module.exports = router;
