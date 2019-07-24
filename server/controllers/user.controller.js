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
                    userData['members'] = memberArray;
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
    };
    userExport.uploadImage = async function (req, res) {
        const uploadedData = await uploadOnS3(req, res, req.query.type);
        res.status(200).send({data: uploadedData});
    };
    userExport.deleteImage = async function (req, res) {
        var deleteItems = [];
        if (req.body.images === null) {
            res.json({
                message: 'provide image keys to delete'
            });
        }
        const imageArray = JSON.parse(req.body.images);
        imageArray.forEach(function (item) {
            deleteItems.push({Key: item.type+'/'+item.key});
        });

        var params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Delete: {
                Objects: deleteItems,
                Quiet: false
            }
        };

        s3.deleteObjects(params, function (err, data) {
            if (err) {
                console.log(err);
                res.json({
                    message: 'somwthing went wrong',
                    items: data
                })
            } else {
                console.log("Successfully deleted myBucket/myKey", data);
                res.json({
                    message: 'images deleted',
                    items: data
                });
            }
        });

    }
    function uploadOnS3(req, res, type) {
        return new Promise((resolve) => {
            const upload = multer({
                storage: multerS3({
                    s3: s3,
                    bucket: process.env.S3_BUCKET_NAME + '/' + type,
                    acl: 'public-read',
                    contentType: multerS3.AUTO_CONTENT_TYPE,
                    metadata: function (req, file, cb) {
                        const fileName = (file.originalname).substring(0, 4).trim().replace(/ /g, "_");
                        const fileType = (file.mimetype).split('/');
                        const fullPath = Date.now() + "_" + fileName.trim() + '.' + fileType[1];
                        cb(null, {fieldname: file.fieldname, originalname: fullPath});
                    },
                    key: function (req, file, cb) {
                        const fileName = (file.originalname).substring(0, 4).trim().replace(/ /g, "_");
                        const fileType = (file.mimetype).split('/');
                        const fullPath = Date.now() + "_" + fileName.trim() + '.' + fileType[1];
                        cb(null, fullPath);
                    }
                })
            }).array("file", 10);
            upload(req, res, function (err, result) {
                if (err) {
                    resolve({error: err, files: null});
                } else {
                    let fileArray = [];
                    if (req.files.length) {
                        req.files.forEach(function (item) {
                            fileArray.push(item.key);
                        });
                    }
                    resolve({files: fileArray});
                }
            })
        })
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