(function () {
    "use strict";
    var passwordHash = require('password-hash');
    var jwt = require('jsonwebtoken');
    var async = require("async");
    var startupConfig = require('../config/startup');
    var config = require('../config/index');
    var User = require('../models/user.model');
    var userExport = {};

    userExport.signUp = async function (req, res) {
        try {
            const userEmailAddress = (req.body.email).toLowerCase();
            var checkEmail = await isUserEmailExist(userEmailAddress);
            if (checkEmail != null && checkEmail.data != null) {
                res.status(400).send({"status": false, "error": 'Email Address (' + userEmailAddress + ') already exist.'});
            } else {
                var userData = {
                    email: userEmailAddress,
                    description: req.body.description,
                    stage: req.body.stage,
                    start_date: req.body.start_date,
                    logo: req.body.logo,
                    team_name: req.body.team_name,
                    memebers: req.body.memebers,
                    role: startupConfig.roles[req.body.role]
                }
                if (req.body.password != null && req.body.password != 'null') {
                    var hashedPassword = passwordHash.generate(req.body.password);
                    userData['password'] = hashedPassword;
                }
                new User(userData).save(function (error, userResponse) {
                    if (error) {
                        res.status(400).send({"status": false, "error": error});
                    } else {
                        var token = jwt.sign({email: req.body.email}, config.secret, {expiresIn: '24h'});
                        res.status(200).send({status: true, "data": userResponse, "access_token": token});
                    }
                });
            }
        } catch (error) {
            res.status(400).send(JSON.stringify({"status": false, "error": error}));
        }
    }
    userExport.signIn = async function (req, res) {
        try {
            const userEmailAddress = (req.body.email).toLowerCase();
            var userResponse = await isUserEmailExist(userEmailAddress);
            if (userResponse != null && userResponse.data == null) {
                res.status(400).send({"status": false, "error": 'Email Address (' + userEmailAddress + ') not found. Please sign up.'});
            } else {
                const selectedFields = {
                    '_id': userResponse.data._id,
                    'team_name': userResponse.data.team_name,
                    'role': userResponse.data.role,
                    'email': userResponse.data.email,
                    'description': userResponse.data.description,
                    'stage': userResponse.data.stage,
                    'start_date': userResponse.data.start_date
                }
                var checkPassword = passwordHash.verify(req.body.password, userResponse.data.password);
                if (checkPassword !== true) {
                    res.status(403).send({status: false, error: 'Authentication failed. Wrong password.'});
                } else {
                    var token = jwt.sign({email: userEmailAddress}, config.secret, {expiresIn: '24h'});
                    res.status(200).send({status: true, "data": selectedFields, "access_token": token});
                }
            }
        } catch (error) {
            res.status(400).send(JSON.stringify({"status": false, "error": error}));
        }
    }
  
    function isUserEmailExist(email) {
        return new Promise((resolve) => {
            User.findOne({'email': email}, function (error, response) {
                if (error) {
                    resolve({data: null});
                } else {
                    resolve({data: response})
                }
            });
        })
    }
    function isUserIdExist(userId) {
        return new Promise((resolve) => {
            User.findOne({'_id': userId}, function (error, response) {
                if (error) {
                    resolve({data: null});
                } else {
                    resolve({data: response})
                }
            });
        })
    }
    module.exports = userExport;
})();