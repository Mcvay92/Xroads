(function () {
    "use strict";
    const passwordHash = require('password-hash');
    const jwt = require('jsonwebtoken');
    const async = require("async");
    const aws = require('aws-sdk');
    const startupConfig = require('../config/startup');
    const config = require('../config/index');
    const User = require('../models/user.model');
    const userExport = {};
    const  multer = require('multer');
    const multerS3 = require('multer-s3');

    const s3 = new aws.S3({
        credentials: {
            secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
            accessKeyId: process.env.S3_BUCKET_ACCESS_KEY_ID,
            region: process.env.S3_BUCKET_REGION
        },
        signatureVersion: 'v4'});

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
                }
                if (req.body.password != null && req.body.password != 'null') {
                    const hashedPassword = passwordHash.generate(req.body.password);
                    userData['password'] = hashedPassword;
                }
                if (req.body.role) {
                    userData['role'] = JSON.parse(req.body.role)
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
            res.status(400).send(JSON.stringify({"status": false, "error": 'Something Went wrong'}));
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
                    'email': userResponse.data.email
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

    module.exports = userExport;
})();