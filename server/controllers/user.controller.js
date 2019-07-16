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
                    contact: req.body.contact,
                    start_date: req.body.start_date,
                    logo: req.body.logo,
                    team_name: req.body.team_name,
                }
                if (req.body.password != null && req.body.password != 'null') {
                    const hashedPassword = passwordHash.generate(req.body.password);
                    userData['password'] = hashedPassword;
                }
                if (req.body.role) {
                    userData['role'] = JSON.parse(req.body.role)
                }
                if (req.body.members) {
                    const memberArray = JSON.parse(req.body.members);
                    memberArray.map(function (k, v) {
                        console.log('key', k)
                        console.log('value', v)
                    })
                    userData['members'] = JSON.parse(req.body.members)
                }
                new User(userData).save(function (error, userResponse) {
                    if (error) {
                        res.status(400).send({"status": false, "error": error});
                    } else {
                        var token = jwt.sign({email: req.body.email, id: userResponse._id}, config.secret, {expiresIn: '24h'});
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
                    'contact': userResponse.data.contact,
                    'email': userResponse.data.email,
                    'description': userResponse.data.description,
                    'stage': userResponse.data.stage,
                    'start_date': userResponse.data.start_date
                }
                var checkPassword = passwordHash.verify(req.body.password, userResponse.data.password);
                if (checkPassword !== true) {
                    res.status(403).send({status: false, error: 'Authentication failed. Wrong password.'});
                } else {
                    var token = jwt.sign({email: userEmailAddress, id: userResponse.data._id}, config.secret, {expiresIn: '24h'});
                    res.status(200).send({status: true, "data": selectedFields, "access_token": token});
                }
            }
        } catch (error) {
            res.status(400).send(JSON.stringify({"status": false, "error": error}));
        }
    }
    userExport.getProfile = async function (req, res) {
        try {
            const userId = req.params.id;
            const selectedFields = {
                'email': 1,
                'team_name': 1,
                'role': 1,
                'contact': 1,
                'description': 1,
                'members': 1,
                'logo': 1,
                'stage': 1,
                'start_date': 1
            }
            User.findOne({'_id': userId}, selectedFields, function (error, response) {
                if (error) {
                    res.status(400).send({status: true, "data": error});
                } else {
                    res.status(200).send({status: true, "data": response});
                }
            });
        } catch (error) {
            res.status(400).send({"status": false, "error": error});
        }
    }
    userExport.editProfile = async function (req, res) {
        try {
            const userId = req.params.id;
            const updateFields = {};
            if (req.body.password != null && req.body.password != 'null') {
                const hashedPassword = passwordHash.generate(req.body.password);
                updateFields['password'] = hashedPassword;
            }
            if (req.body.team_name) {
                updateFields['team_name'] = req.body.team_name;
            }
            if (req.body.start_date) {
                updateFields['start_date'] = req.body.start_date;
            }
            if (req.body.contact) {
                updateFields['contact'] = req.body.contact;
            }
            if (req.body.description) {
                updateFields['description'] = req.body.description;
            }
            if (req.body.role) {
                updateFields['role'] = JSON.parse(req.body.role)
            }
            if (req.body.members) {
                const memberArray = JSON.parse(req.body.members);
                updateFields['members'] = JSON.parse(req.body.members)
            }
            User.update({'_id': userId}, updateFields, function (error, response) {
                if (error) {
                    res.status(400).send({status: true, "data": error});
                } else {
                    res.status(200).send({status: true, "data": response});
                }
            });
        } catch (error) {
            res.status(400).send({"status": false, "error": 'catch error'});
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