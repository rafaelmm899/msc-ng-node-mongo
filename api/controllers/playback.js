'use strict'

const mongoose =  require('mongoose');
const Song = require('../models/song');
const User = require('../models/user');
const Playback = require('../models/playback');

function save(req, res) {
    var param = req.body;
    if(param.user && param.song){
        var playback = new Playback();
        playback.user = param.user;
        playback.song = param.song;
        playback.save((error, stored) => {
            if(error){
                res.status(500).send({
                    message : 'Error in the request'
                })
            }else{
                if(!stored){
                    res.status(404).send({
                        message : 'The data could not be storedError in the request'
                    })
                }else{
                    res.status(200).send({
                        stored
                    })
                }
            }
        })
    }
}

module.exports = {
    save
}