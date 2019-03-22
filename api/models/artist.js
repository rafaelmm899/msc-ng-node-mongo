'use strict'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;

var ArtistSchema = schema({
    name: String,
    description: String,
    image: String
})
ArtistSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Artist', ArtistSchema);