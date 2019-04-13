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

function getPlayCounter(req, res){
    Playback.aggregate([
        { $group: { _id: '$song', count: {$sum: 1} } },
        { $unwind: { "path" : "$_id" }},
        { $lookup : { from:"songs",localField:"_id", foreignField:"_id",as:"sg"} },
        { $unwind: { "path" : "$sg" }},
        { $lookup : { from:"albums",localField:"_id", foreignField:"sg.album",as:"lb"} }
    ]).exec((error, count) => {
        if(error){
            res.status(500).send({
                message : 'Error in the request',
                error : error
            })
        }else{
            if(!count){
                res.status(404).send({
                    message : 'There are no data'
                })
            }else{
                res.status(200).send({
                    count
                })
            }
        }
    })
}

module.exports = {
    save,
    getPlayCounter
}