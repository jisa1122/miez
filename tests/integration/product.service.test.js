'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
let mongoose, Product, ProductService, productService;

describe('Product service test', function() {
  before(function(done) {
    mongoose = require('../../config/mongoose').init();
    ProductService = require('../../app/services/product');
    Product = mongoose.model('Product');
    productService = new ProductService();
    done();
  });
  // after();

  describe('Create product', function () {
    after(function (done) {
      Product.remove({}, (err) => {
        if (err) throw err;

        done();
      });
    });

    it('should add a new product', function (done) {
      let productData = {
        sku: "ceva-345-ceva",
        title: "This is a new product",
        price: {
          value: 3.49
        }
      };
      productService.create(productData, (err, product) => {
        // console.log('err', err);
        if (err) throw err;
        // if (err) done(err);
        // should.not.exist(err);

        product.title.should.equal(productData.title);
        done();
      });
    });
  });

  describe('get by sku', function () {
    before(function (done) {
      let productData = {
        sku: "ceva-345-ceva",
        title: "This is a new product",
        price: {
          value: 3.49
        }
      };
      productService.create(productData, (err, product) => {
        // console.log('err', err);
        if (err) throw err;
        // if (err) done(err);
        // should.not.exist(err);

        product.title.should.equal(productData.title);
        done();
      });
    });
    after(function (done) {
      Product.remove({}, (err) => {
        if (err) throw err;

        done();
      });
    });

    it('should find a product by sku', function (done) {
      let sku = "ceva-345-ceva";
      productService.findProductBySku(sku, (err, product) => {
        if (err) throw err;

      product.sku.should.equal(sku);
      done();
      })
    })
  })
});
