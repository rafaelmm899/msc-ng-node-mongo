'use strict'

var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/msc01',{useNewUrlParser: true},(error, response) => {
    if(error){
        throw error;
    }else{
        console.log("Connection made successfully");
    }
});