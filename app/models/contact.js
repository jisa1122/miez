"use strict";

const mongoose = require('mongoose');
const userSchema = require('./contact').schema;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const _ = require('lodash');

var ContactSchema = new Schema({
  name: {
    type: String
  },
  email:  {
    type: String,
    required: true,
    unique: true
  },
  city: {
    type: String
  },
  phone: {
    type: String
  },
  company: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
