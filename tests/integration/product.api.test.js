'use strict';

/**
 * Important! Set the environment to test
 */
process.env.NODE_ENV = 'test';

const http = require('http');
const request = require('request');
const chai = require('chai');
const should = chai.should();

describe('Authentication', function() {
  let mongoose;
  let app;
  let appServer;
  let config;
  let baseUrl, apiUrl;
  let Product, ProductService, productService;

  before(function(done) {
    app = require('../../server');
    config = app.get('config');
    baseUrl = config.baseUrl;
    apiUrl = `${baseUrl}/api/products`;
    appServer = http.createServer(app);
    ProductService = require('../../app/services/product');
    productService = new ProductService();

    appServer.on('listening', () => {
      mongoose = app.get('mongoose');
      Product = mongoose.model('Product');
      done();
    });

    appServer.listen(config.port);
  });

  after(function(done) {
    appServer.on('close', () => {
      setTimeout(function() { done(); }, 1000);
    });

    mongoose.connection.db.command({ dropDatabase:1 }, (err, result) => {
      if (err) throw err;

      mongoose.connection.close(function() {
        appServer.close();
      });
    });
  });

  describe('Create product', function() {
    after(function(done) {
      Product.remove({}, (err) => {
        if (err) throw err;

        done();
      });
    });

    it('should create a product', function(done) {
      let dataProduct = {
        sku: 'MIEZ-001',
        title: 'First awesome miez product',
        price: {
          value: 9.99
        }
      };

      request({
        method: 'POST',
        url: `${apiUrl}`,
        headers: {
        },
        body: dataProduct,
        json:true,
      }, function(err, res, body) {
        if (err) throw err;

        res.statusCode.should.equal(201);
        body.sku.should.equal(dataProduct.sku);
        body.title.should.equal(dataProduct.title);
        body.price.value.should.equal(dataProduct.price.value);
        done();
      });
    });
  });

  describe('Get product by sku', function() {
    before(function (done) {
      let dataProduct = {
        sku: 'MIEZ-002',
        title: 'First awesome miez product',
        price: {
          value: 9.99
        }
      };
      productService.create(dataProduct, (err, product) => {
        if (err) throw err;

        product.title.should.equal(dataProduct.title);
        done();
      });
    });
    after(function(done) {
      Product.remove({}, (err) => {
        if (err) throw err;

        done();
      });
    });

    it('should find a product by sku', function(done) {
      let dataProduct = {
        sku: 'MIEZ-002',
        title: 'First awesome miez product',
        price: {
          value: 9.99
        }
      };

      request({
        method: 'GET',
        url: `${apiUrl}/MIEZ-002`,
        headers: {
        },
        sku: dataProduct.sku,
        json:true,
      }, function(err, res, sku) {
        if (err) throw err;

        res.statusCode.should.equal(200);
        done();
      });
    });
  });

});
