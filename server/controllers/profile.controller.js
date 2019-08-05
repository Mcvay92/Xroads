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
    const upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.S3_BUCKET_NAME + '/logo',
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
    }).array("logo", 10);
    profileExport.addProfile = async function (req, res) {
        try {
            upload(req, res, function (err, result) {
                if (err) {
                    res.status(422).send({"status": false, err});
                } else {
                    var profileData = {
                        user_id: req.body.user_id,
                        description: req.body.description,
                        stage: req.body.stage,
                        role: req.body.role,
                        contact: req.body.contact,
                        start_date: req.body.start_date,
                        logo: req.body.logo,
                        team_name: req.body.team_name,
                        status: 'active'
                    };
                    if (req.files.length) {
                        req.files.forEach(function (item) {
                            profileData['logo'] = item.key;
                        });
                    }

                    if (req.body.members) {
                        var memebers = [];
                        const memberArray = typeof req.body.members == 'string' ? JSON.parse(req.body.members) : req.body.members;
                        memberArray.map((v, k) => {
                            memebers.push({
                                'name': v.name,
                                'role': v.role,
                                'major': v.major,
                                'linkedin': v.linkedin
                            })
                        })
                        profileData['members'] = memebers;
                    }
                    new Profile(profileData).save(function (error, profileResponse) {
                        if (error) {
                            res.status(422).send({"status": false, error});
                        } else {
                            res.status(200).send({"status": true, "data": profileResponse});
                        }
                    });
                }
            });
        } catch (error) {
            res.status(422).send({"status": false, error});
        }
    };
    profileExport.getSingleProfile = async function (req, res) {
        try {
            const profileId = req.params.id;
            const selectedFields = {
                'team_name': 1,
                'role': 1,
                'contact': 1,
                'description': 1,
                'members': 1,
                'logo': 1,
                'stage': 1,
                'start_date': 1
            };
            Profile.findOne({'_id': profileId, status: 'active'}, selectedFields, function (error, response) {
                if (error) {
                    res.status(422).send({status: false, error});
                } else {
                    res.status(200).send({status: true, "data": response});
                }
            });
        } catch (error) {
            res.status(422).send({"status": false, error});
        }
    };
    profileExport.getAllProfiles = async function (req, res) {
        try {
            const userId = req.decoded.id;
            var query = {
                'user_id': userId,
                status: 'active'
            };
            if (req.query.team_name) {
                query['team_name'] = req.query.team_name; //for filteration of profiles
            }
            const selectedFields = {
                'team_name': 1,
                'role': 1,
                'contact': 1,
                'description': 1,
                'members': 1,
                'logo': 1,
                'stage': 1,
                'start_date': 1
            };
            Profile.find(query, selectedFields, function (error, response) {
                if (error) {
                    res.status(422).send({status: false, error});
                } else {
                    res.status(200).send({status: true, "data": response});
                }
            });
        } catch (error) {
            res.status(422).send({"status": false, error});
        }
    };
    profileExport.editProfile = async function (req, res) {
        upload(req, res, function (err, result) {
            if (err) {
                res.status(422).send({status: false, err});
            } else {
                let updateFields = {};
                if (req.files.length) {
                    req.files.forEach(function (item) {
                        updateFields['logo'] = item.key;
                    });
                }
                const profileId = req.params.id;
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
                if (req.body.removeLogo && req.body.removeLogo === 'true' && (updateFields['logo'] == undefined || null)) {
                    updateFields['logo'] = null;
                }
                if (req.body.role) {
                    updateFields['role'] = req.body.role;
                }
                if (req.body.members) {
                    const memberArray = typeof req.body.members == 'string' ? JSON.parse(req.body.members) : req.body.members;
                   let memebers = [];
                    memberArray.map((v, k) => {
                        var member = {
                            'name': v.name,
                            'role': v.role,
                            'major': v.major,
                            'linkedin': v.linkedin
                        }
                        if (v._id != '') {
                            member['_id'] = v._id
                        }
                        memebers.push(member);
                    })
                    updateFields['members'] = memebers;
                }
                Profile.updateOne({'_id': profileId, status: 'active'}, updateFields, function (error, response) {
                    if (error) {
                        res.status(422).send({status: false, error});
                    } else {
                        res.status(200).send({status: true, "data": response});
                    }
                });
            }
        });
    };
    profileExport.deleteProfile = async function (req, res) {
        const profileId = req.params.id;
        Profile.updateOne({'_id': profileId}, {status: 'inactive'}, function (error, response) {
            if (error) {
                res.status(422).send({status: false, error});
            } else {
                res.status(200).send({status: true, "data": response});
            }
        });
    };
    module.exports = profileExport;
})();