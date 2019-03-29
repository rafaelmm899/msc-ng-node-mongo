'use strict'

const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
const Schema  = mongoose.Schema;

var SongSchema = Schema({
    number : Number,
    name: String,
    duration: String,
    file: String,
    gender: String,
    album : { type: Schema.ObjectId, ref:'Album' }
})

SongSchema.plugin(paginate);

var Song = mongoose.model('Song',SongSchema);

Song.removeSongs = async function(condition) {
    var result = await Song.findOneAndDelete(condition,(fail, songsRemoved) => {
        if(!fail){
            return false;
        }else{
            if(!songsRemoved){
                return 404;
            }else{
                return 200;
            }
        }
    })
    return result;
}



module.exports = Song;
