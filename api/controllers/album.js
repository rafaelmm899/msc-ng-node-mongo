'use strict'

const mongoose = require('mongoose');
const Artist = require('../models/artist');
const Album = require('../models/album');
const fs = require('fs');
const path = require('path');

function saveAlbum(req, res){
    var params = req.body;
    if(params.title && params.description && params.year){
        var album = new Album();
        album.title = params.title;
        album.description = params.description;
        album.year = params.year;
        album.image = null;
        album.artist = params.artist;

        album.save((error, albumStored)=> {
            if(error){
                res.status(500).send({
                    message : 'Error in the request'
                })
            }else{
                if(!albumStored){
                    res.status(404).send({
                        message : 'Error creating the album'
                    })
                }else{
                    res.status(200).send({
                        album : albumStored
                    })
                }
            }
        })
    }else{
        res.status(404).send({
            message : 'All fields are required'
        })
    }
}

function getAlbums(req, res) {
    var page = (req.params.page)?req.params.page:1;
    var artistId = req.params.id;
    var items = 10;

    
    Album.paginate(Album.find({ artist : artistId }).populate({ path : 'Artist' }),{page : page, limit: items}, function (error , albums) { 

        if(error){
            res.status(500).send({
                message : 'Error in the request'
            })
        }else{
            if(!albums){
                res.status(200).send({
                    message : 'There are no artists'
                })
            }else{
                res.status(200).send({
                    album:albums
                })
            }
        }
    
    })
}

function uploadImage(req, res){
    var albumId = req.params.id;
    var filename = 'file not uploaded';

    if(req.files){
        let filePath = req.files.image.path;
        let fileSplit = filePath.split('\\');
        filename = fileSplit[2];

        let extSplit = filename.split('\.');
        let fileExt = extSplit[1];

        if(fileExt == 'png' || fileExt == 'jpg'){
            Album.findByIdAndUpdate(albumId, {image : filename}, (error, albumUpdated) => {
                if (error) {
                    res.status(500).send({
                        message : 'Error in the request'
                    })
                } else {
                    res.status(200).send({
                        album : albumUpdated
                    }) 
                }
            })
        }else{
            res.status(200).send({
                message : 'The file extension you want to upload is not valid'
            })
        }
    }
}

function getImage(req, res) {
    var image = req.params.imageFile;
    var pathFiles = './uploads/artists/'+image;

    fs.exists(pathFiles,function (exist) {
        if(exist){
            res.sendFile(path.resolve(pathFiles));
        }else{
            res.status(200).send({
                message :'The image does not exist'
            });
        }
    } )
}

module.exports = {
    saveAlbum,
    getAlbums,
    uploadImage,
    getImage
}