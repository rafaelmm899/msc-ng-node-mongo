'use strict'

const mongoose =  require('mongoose');
const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');
const fs = require('fs');
const path = require('path');

function save(req, res) {
    var param = req.body;
    if(param.number && param.name && param.duration && param.gender && param.album){
        var song = new Song();
        song.number = param.number;
        song.name = param.name;
        song.duration = param.duration;
        song.gender = param.gender;
        song.file = null;
        song.album = param.album;

        song.save((error, songStored) => {
            if(error){
                res.status(500).send({
                    message : 'Error in the request'
                })
            }else{
                if(!songStored){
                    res.status(404).send({
                        message : 'Error creating the song'
                    })
                }else{
                    res.status(200).send({
                        song: songStored
                    })
                }
            }
        })
    }else{
        res.status(200).send({
            message : "All fields are required"
        })
    }
}

function getSongs(req, res) {
    let albumId = req.params.id;
    var page = (req.params.page)?req.params.page:1;
    var items = 10;

    Song.paginate(Song.find({album: albumId}).populate({path:'Album'}),{ page: page, limit:items },function (error, songs) {
        if(error){
            res.status(500).send({
                message : 'Error in the request'
            })
        }else{
            if(!songs){
                res.status(404).send({
                    message : 'No records found'
                })
            }else{
                res.status(200).send({
                    song: songs
                })
            }
        }
    })
}

module.exports = {
    save,
    getSongs
}