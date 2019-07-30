(function () {
    "use strict";
    const passwordHash = require('password-hash');
    const async = require("async");
    const aws = require('aws-sdk');
    const startupConfig = require('../config/startup');
    const config = require('../config/index');
    const Profile = require('../models/profile.model');
    const profileExport = {};
    const  multer = require('multer');
    const multerS3 = require('multer-s3');

    const s3 = new aws.S3({
        credentials: {
            secretAccessKey: process.env.S3_BUCKET_SECRET_ACCESS_KEY,
            accessKeyId: process.env.S3_BUCKET_ACCESS_KEY_ID,
            region: process.env.S3_BUCKET_REGION
        },
        signatureVersion: 'v4'});

    profileExport.addProfile = async function (req, res) {
        try {
            console.log('req.body', req.body)
            var profileData = {
                user_id: req.body.user_id,
                description: req.body.description,
                stage: req.body.stage,
                contact: req.body.contact,
                start_date: req.body.start_date,
                logo: req.body.logo,
                team_name: req.body.team_name
            };

            if (req.body.members) {
                const memberArray = typeof req.body.members == 'string' ? JSON.parse(req.body.members) : req.body.members;
                profileData['members'] = memberArray;
            }
            new Profile(profileData).save(function (error, profileResponse) {
                if (error) {
                    res.status(400).send({"status": false, "error": error});
                } else {
                    res.status(200).send({status: true, "data": profileResponse});
                }
            });
        } catch (error) {
            res.status(400).send({"status": false, "error": error});
        }
    };
    profileExport.getSingleProfile = async function (req, res) {
        try {
            const profileId = req.params.id;
            console.log(profileId, 'profileId')
            const selectedFields = {
                'team_name': 1,
//                'role': 1,
                'contact': 1,
                'description': 1,
                'members': 1,
                'logo': 1,
                'stage': 1,
                'start_date': 1
            };
            Profile.findOne({'_id': profileId}, selectedFields, function (error, response) {
                if (error) {
                    res.status(400).send({status: true, "data": error});
                } else {
                    res.status(200).send({status: true, "data": response});
                }
            });
        } catch (error) {
            res.status(400).send({"status": false, "error": error});
        }
    };
    profileExport.getAllProfiles = async function (req, res) {
        try {
            const userId = req.decoded.id;
            var query = {
                'user_id': userId
            };
            if (req.query.team_name) {
                query['team_name'] = req.query.team_name; //for filteration of profiles
            }
            const selectedFields = {
                'team_name': 1,
//                'role': 1,
                'contact': 1,
                'description': 1,
                'members': 1,
                'logo': 1,
                'stage': 1,
                'start_date': 1
            };
            Profile.find(query, selectedFields, function (error, response) {
                if (error) {
                    res.status(400).send({status: true, "data": error});
                } else {
                    res.status(200).send({status: true, "data": response});
                }
            });
        } catch (error) {
            res.status(400).send({"status": false, "error": error});
        }
    };
    profileExport.editProfile = async function (req, res) {
        try {
            const profileId = req.params.id;
            const updateFields = {};
            if (req.body.team_name) {
                updateFields['team_name'] = req.body.team_name;
            }
            if (req.body.start_date) {
                updateFields['start_date'] = req.body.start_date;
            }
            if (req.body.stage) {
                updateFields['stage'] = req.body.stage;
            }
            if (req.body.contact) {
                updateFields['contact'] = req.body.contact;
            }
            if (req.body.description) {
                updateFields['description'] = req.body.description;
            }
//            if (req.body.role) {
//                updateFields['role'] = JSON.parse(req.body.role);
//            }
            if (req.body.members) {
                const memberArray = typeof req.body.members == 'string' ? JSON.parse(req.body.members) : req.body.members;
                updateFields['members'] = memberArray;
            }
            Profile.update({'_id': profileId}, updateFields, function (error, response) {
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
    profileExport.uploadImage = async function (req, res) {
        const uploadedData = await uploadOnS3(req, res, req.query.type);
        res.status(200).send({data: uploadedData});
    };
    profileExport.deleteImage = async function (req, res) {
        var deleteItems = [];
        if (req.body.images === null) {
            res.json({
                message: 'provide image keys to delete'
            });
        }
        const imageArray = JSON.parse(req.body.images);
        imageArray.forEach(function (item) {
            deleteItems.push({Key: item.type + '/' + item.key});
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
                });
            } else {
                console.log("Successfully deleted myBucket/myKey", data);
                res.json({
                    message: 'images deleted',
                    items: data
                });
            }
        });
    };
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
            });
        });
    }
    module.exports = profileExport;
})();