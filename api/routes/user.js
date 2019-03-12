'use strict'

var express = require('express');
var authenticated = require('../middlewares/authenticated');

var userController = require('../controllers/user');

var api = express.Router();

api.post('/login', userController.login);
api.post('/user/create_admin', [authenticated.ensureAuth],userController.create);
api.post('/user/create_user', userController.create);
api.post('/user/list/:page?',[authenticated.ensureAuth],userController.getUsers );

module.exports = api;