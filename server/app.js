const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const Mongoose = require('mongoose');
const config = require(__dirname + '/config/index');
const https = require('https');
var acl = require('acl');
app.use(express.json({limit: '50mb'}));

Mongoose.connect("mongodb://localhost:27017/xroads", {
    "useNewUrlParser":true,
    "useFindAndModify":false,
    "useCreateIndex":true
}, (error, db) => {
    if (error) {
        throw error;
    }
    acl = new acl(new acl.mongodbBackend(db, 'acl_'));
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use('/uploads', express.static(process.cwd() + '/app/uploads'));


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token, user_id');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(config.apiPath, require("./routes/index"));
app.use(config.apiPath, require("./routes/user"));


module.exports = app;

