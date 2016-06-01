'use strict';

/**
 *  Module dependencies
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');
const ObjectId = mongoose.Types.ObjectId;

/**
 *  Module exports
 */
module.exports.addOne = addContact;

function addContact(req, res, next) {
  Contact.create(req.body, (err, updatedContact) => {
    if (err) {
      return next(err);
    }

    req.resources.contact = updatedContact;
    next();
  });
};

module.exports.findById = findContactById;
module.exports.getAll = getAllContacts;
module.exports.update = updateContact;
module.exports.delete = deleteContact;
//

function findContactById(req, res, next) {
  if (!ObjectId.isValid(req.params.contactId)) {
    return res.status(404).json({ message: '404 not found.'});
  }

  Contact.findById(req.params.contactId, (err, contact) => {
    console.log(err);
    if (err) {
      next(err);
    } else if (contact) {
      req.resources.contact = contact;
      next();
    } else {
      next(new Error('failed to find Contact'));
    }
  });
};

function getAllContacts(req, res, next) {
  Contact.find((err, contacts) => {
    if (err) {
      return next(err);
    }

    req.resources.contacts = contacts;
    next();
  });
};

function updateContact(req, res, next) {
  let contact = req.resources.contact;
  _.assign(contact, req.body);

  contact.save((err, updatedContact) => {
    if (err) {
      return next(err);
    }

    req.resources.contact = updatedContact;
    next();
  });
};

function deleteContact(req, res, next) {
  req.resources.contact.remove(err => {
    if (err) {
      return next(err);
    }

    res.status(204).json();
  });
};
