'use strict';

const express = require('express');
const router = express.Router();
const contactsCtrl = require('../controllers/contact');
const auth = require('../middlewares/authentication');
const response = require('../helpers/response');

router.post('/contacts', auth.ensured, contactsCtrl.addOne, response.toJSON('contact'));

router.get('/contacts', auth.ensured, contactsCtrl.getAll, response.toJSON('contacts'));
router.get('/contacts/:contactId', auth.ensured, contactsCtrl.findById, response.toJSON('contact'));
router.put('/contacts/:contactId', auth.ensured, contactsCtrl.findById, contactsCtrl.update, response.toJSON('contact'));
router.delete('/contacts/:contactId', auth.ensured, contactsCtrl.findById, contactsCtrl.delete);

module.exports = router;
