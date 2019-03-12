'use strict'

const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../service/jwt');
const moongoosePaginate = require('mongoose-paginate');

function checkUserExist(user) {
    var res = false;
    if(user.email){
        
        res = User.findOne({ email : user.email.toLowerCase() }, (error , userFinded) => {
            
            if (!error && userFinded) {
                return true;   
            }else{
                return false;
            }
        })
    }
    return res;
}

function create(req, res){
    var user = new User();
    var params = req.body;

    //console.log(req.rawHeaders);

    if(params){
        if(params.name && params.lastname && params.password && params.role && params.email){
            user.name = params.name;
            user.lastname = params.lastname;
            user.email = params.email;
            user.role = params.role;
            user.image = null;

            User.findOne({ email : user.email.toLowerCase() }, (error , userFinded) => {
                if (userFinded) {
                    res.status(200).send({
                        message : "User already exists"
                    }); 
                    
                } else {
                    bcrypt.hash(params.password, null, null, function(error, hash) {
                        if (error) {
                            res.status(500).send({
                                message : "Error in the request"
                            });
                        } else {
                            user.password = hash;
                            user.save((err, userStored) => {
                                if (err) {
                                    res.status(500).send({
                                        message : "Error in the request"
                                    });
                                } else {
                                    if (!userStored) {
                                        res.status(200).send({
                                            message : "Error in the request"
                                        }); 
                                    } else {
                                        res.status(200).send({
                                            user : userStored
                                        });
                                    }
                                }
                            })
                        }
                    })   
                }
            })
        }else{
            res.status(200).send({
                message : ''
            });
        }
    }
}

function login(req, res){
    let params = req.body;

    if (params) {
        if (params.password && params.email) {
            User.findOne({ email : params.email.toLowerCase() }, (error , userFinded) => {
                if (error) {
                    res.status(500).send({
                        message : "Error in the request"
                    }); 
                } else {
                    if (userFinded) {
                        bcrypt.compare(params.password, userFinded.password, (err, result) => {
                            if (err) {
                                res.status(500).send({
                                    message : "Error in the request"
                                });         
                            } else {
                                if (result) {
                                    if (params.getToken) {
                                        res.status(200).send({
                                            token : jwt.createToken(userFinded)
                                        });     
                                    } else {
                                        res.status(200).send({
                                            user : userFinded
                                        });
                                    }
                                } else {
                                    res.status(200).send({
                                        message : 'Incorrect user or password'
                                    });
                                }
                            }
                        })       
                    }else{
                        res.status(200).send({
                            message : 'The email is not registered'
                        });
                    }
                }
            })
        }
    }
}

function getUsers(req, res){
    let itemPerPage = 10;
    let idUser = null;
    let currentPage = (req.params.page) ? req.params.page : 1;

    if(req.body._id){
        idUser = req.body._id;
    }

    //User.find({ _id: { $ne: idUser } }, (error, users) => {
    User.paginate(User.find({ _id: { $ne: idUser } }), { page: 1, limit: 10 }, function(err, users, total) {

        if (!users) {
            res.status(500).send({ message : "Error in the request" });
        } else {
            res.status(200).send({
                items : 0,
                users : users
            });
        }
    })
}

module.exports = {
    login,
    create,
    getUsers
}