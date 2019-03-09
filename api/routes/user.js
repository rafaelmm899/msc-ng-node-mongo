'use strict'

var express = require('express');
var authenticated = require('../middlewares/authenticated');

var userController = require('../controllers/user');

var api = express.Router();

api.post('/login', userController.login);
api.post('/user/create', [authenticated.ensureAuth],userController.create);

module.exports = api;