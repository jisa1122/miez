'use strict';

/**
 *  Module dependencies
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const ProductService = require('../services/product');
const productService = new ProductService();
const ObjectId = mongoose.Types.ObjectId;

/**
 *  Module exports
 */
module.exports.create = create;

function create(req, res, next) {
  var data = req.body;
  productService.create(data, (err, product) => {
    if (err) {
      return next(err);
    }

    res.status(201).json(product)
  });
};

module.exports.findById = findProductById;
module.exports.getAll = getAllProducts;
module.exports.update = updateProduct;
module.exports.delete = deleteProduct;
//

function findProductById(req, res, next) {

  productService.findProductBySku(req.params.productId, (err, product) => {
    if (err) {
      return next(err);
    }

    res.status(200).json(product)
  });
};

function getAllProducts(req, res, next) {
  Product.find((err, products) => {
    if (err) {
      return next(err);
    }

    req.resources.products = products;
    next();
  });
};

function updateProduct(req, res, next) {
  let product = req.resources.product;
  _.merge(product, req.body); // used with patch. calls --> it merges data on destination if on data we have object properties with less properties than the destination product
  // _.assign(product, req.body);   // overwrites destination product with source data
  product.save((err, updatedProduct) => {
    if (err) {
      return next(err);
    }

    req.resources.product = updatedProduct;
    next();
  });
};

function deleteProduct(req, res, next) {
  req.resources.product.remove(err => {
    if (err) {
      return next(err);
    }

    res.status(204).json();
  });
};
