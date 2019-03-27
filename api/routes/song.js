'use strict'

var express = require('express');
var multipart = require('connect-multiparty');
var authenticated = require('../middlewares/authenticated');
var md_upload = multipart({ uploadDir : './uploads/songs' });

var songController = require('../controllers/song');
var api = express.Router();

api.post('/song',authenticated.ensureAuth,songController.save);
api.get('/songs/:id/:page?', authenticated.ensureAuth,songController.getSongs);


module.exports = api;