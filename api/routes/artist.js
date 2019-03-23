'use strict'

var express = require('express');
var multipart = require('connect-multiparty');
var authenticated = require('../middlewares/authenticated');
var md_upload = multipart({ uploadDir : './uploads/artists' });


var artistController = require('../controllers/artist');
var api = express.Router();

api.get('/artists/:page?', authenticated.ensureAuth ,artistController.getArtists);
api.post('/saveArtist', authenticated.ensureAuth, artistController.saveArtist );
api.post('/uploadArtistImg/:id', [authenticated.ensureAuth, md_upload], artistController.uploadImage);

module.exports = api;