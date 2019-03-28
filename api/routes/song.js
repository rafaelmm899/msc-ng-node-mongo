'use strict'

var express = require('express');
var multipart = require('connect-multiparty');
var authenticated = require('../middlewares/authenticated');
var md_upload = multipart({ uploadDir : './uploads/songs' });

var songController = require('../controllers/song');
var api = express.Router();

api.post('/song',authenticated.ensureAuth,songController.save);
api.get('/songs/:id/:page?', authenticated.ensureAuth,songController.getSongs);
api.post('/upload_song/:id', [authenticated.ensureAuth, md_upload], songController.uploadFile);
api.get('/get_song/:id', authenticated.ensureAuth, songController.getFile);
api.get('/song/:id',authenticated.ensureAuth,songController.getSong);
api.put('/update_song/:id', authenticated.ensureAuth,songController.update);


module.exports = api;