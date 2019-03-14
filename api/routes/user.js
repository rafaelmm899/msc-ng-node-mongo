'use strict'

var express = require('express');
var authenticated = require('../middlewares/authenticated');

var userController = require('../controllers/user');

var api = express.Router();

api.post('/login', userController.login);
api.post('/user/create_admin', [authenticated.ensureAuth],userController.create);
api.post('/user/create_user', userController.create);
api.post('/user/list/:page?',[authenticated.ensureAuth],userController.getUsers );
api.get('/user/:id',authenticated.ensureAuth,userController.getUser);
api.put('/user/update/:id', authenticated.ensureAuth,userController.updateUser);
api.delete('/user/delete/:id', authenticated.ensureAuth, userController.deleteUser);

module.exports = api;