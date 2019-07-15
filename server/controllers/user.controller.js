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
        const userEmailAddress = (req.body.email).toLowerCase();
        var checkEmail = await isUserExist(userEmailAddress);
//        console.log(checkEmail, '<<--checkEmail')
//        if (checkEmail && checkEmail.data != null) {
//            res.status(400).send(JSON.stringify({"status": false, "error": 'Email Address (' + userEmailAddress + ') already exist.'}));
//        } else {
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
                res.status(400).send(JSON.stringify({"status": false, "error": error}));
            } else {
                var token = jwt.sign({email: req.body.email}, config.secret, {expiresIn: '24h'});
                res.status(200).send(JSON.stringify({status: true, "userData": userResponse, "access_token": token}));
            }
        });
//        }
    }
    userExport.signIn = async function (req, res) {
        const userEmailAddress = (req.body.email).toLowerCase();
        const userResponse = await isUserExist(userEmailAddress);
        if (userResponse && userResponse.data == null) {
            res.status(400).send(JSON.stringify({"status": false, "error": 'Email Address (' + userEmailAddress + ') not found. Please sign up.'}));
        } else {
            const selectedFields = {
                'team_name': 1,
                'role': 1,
                'email': 1,
                'description': 1,
                'stage': 1,
                'start_date': 1
            }
            var checkPassword = passwordHash.verify(req.body.password, userResponse.password);
            if (checkPassword !== true) {
                res.status(403).send(JSON.stringify({status: false, error: 'Authentication failed. Wrong password.'}));
            } else {
                User.findOne({email: userEmailAddress}).select(selectedFields).exec(function (error, userdata) {
                    var token = jwt.sign({email: userEmailAddress}, config.secret, {expiresIn: '24h'});
                    res.status(200).send(JSON.stringify({status: true, "userData": userdata, "access_token": token}));
                });
            }
        }
    }

    function isUserExist(email) {
        return new Promise((reject, resolve) => {
            User.findOne({'email': email}, function (error, response) {
                if (!error) {
                    resolve(error, response);
                } else {
                    console.log(response, 'response')
                    resolve(null, response)
                }
            });
        })
    }
    module.exports = userExport;
})();