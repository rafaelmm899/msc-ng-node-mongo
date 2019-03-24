'use strict'

var express = require('express');
var multipart = require('connect-multiparty');
var authenticated = require('../middlewares/authenticated');
var md_upload = multipart({ uploadDir : './uploads/albums' });

var albumController = require('../controllers/album');
var api = express.Router();

api.post('/album', authenticated.ensureAuth, albumController.saveAlbum);
api.get('/albums/:id/:page?', authenticated.ensureAuth, albumController.getAlbums);

module.exports = api;