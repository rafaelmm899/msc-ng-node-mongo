'use strict'

var express = require('express');
var multipart = require('connect-multiparty');
var authenticated = require('../middlewares/authenticated');
var md_upload = multipart({ uploadDir : './uploads/users' });
var tmp_upload = multipart({ uploadDir : './uploads/users/tmp' });

var artistController = require('../controllers/artist');
var api = express.Router();

api.get('/artists/:page?', authenticated.ensureAuth ,artistController.getArtists);
api.post('/saveArtist', authenticated.ensureAuth, artistController.saveArtist );

module.exports = api;