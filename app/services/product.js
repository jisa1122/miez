'use strict';

const _ = require('lodash');
// const mongoose = require('mongoose');
// const Product = mongoose.model('Product');
const Product = require('../models/product');

class ProductService {
  constructor() {
    this.Product = Product;
  }

/*
  productService.addProduct({...}, (err, product) => {

});
*/

  create(data, callback) {
    this.Product.create(data, callback);
  }

  addProduct(data, callback) {
    Product.create(data, callback);
  }

  updateProduct(sku, data, callback) {
    if (!sku) {
      let NoSkuErr = new Error('SKU is required');
      NoSkuErr.type = 'sku_required';

      return callback(NoSkuErr);
    }

    this.findProductBySku(sku, (err, product) => {
      if (err) {
        return callback(err);
      }

      if (!product) {
        let NoProdErr = new Error('Product not found');
        NoProdErr.type = 'product_not_found';

        return callback(NoProdErr);

      }

      _.assign(product, data);
      product.save((err, updatedProduct) => {
        if (err) {
          return callback(err);
        }

        callback(null, updateProduct);
      });
    });
  }

  findProductBySku(sku, callback) {
    if (!sku) {
      let NoSkuErr = new Error('SKU is required');
      NoSkuErr.type = 'sku_required';

      return callback(NoSkuErr);
    }

    Product.findBySKU(sku, (err, product) => {
      if (err) {
        return callback(err);
      }
      callback(null, product);
    });
  }

  deleteProduct(sku, callback){
    if (!sku) {
      let NoSkuErr = new Error('SKU is required');
      NoSkuErr.type = 'sku_required';

      return callback(NoSkuErr);
    }

    this.findProductBySku(sku, (err, product) => {
      if (err) {
        return callback(err);
      }

      if (!product) {
        let NoProdErr = new Error('Product not found');
        NoProdErr.type = 'product_not_found';

        return callback(NoProdErr);

      }

      product.remove(err => {
        if (err) {
          return next(err);
        }
        callback('Product with sku: ' + sku + ' was deleted!')
      });
    });
  }
}

module.exports = ProductService;
