'use strict'

const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const AlbumSchema = Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: { type: Schema.ObjectId, ref: 'Artist' }
});

AlbumSchema.plugin(paginate);
module.exports = mongoose.model('Album',AlbumSchema);