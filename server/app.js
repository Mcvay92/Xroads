const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const node_acl = require('acl');
const Mongoose = require('mongoose');
const config = require(__dirname + '/config/index');
const https = require('https');

app.use(express.json({limit: '50mb'}));

let acl = null;

Mongoose.connect("mongodb://localhost:27017/xroads", {
    "useNewUrlParser": true
}, (error, db)=>{
    if(error){
        throw error;
    }
    acl = new node_acl.mongodbBackend(db, '_acl');
});

app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));
app.use(bodyParser.json());
app.use(bodyParser({keepExtensions: true, uploadDir: __dirname + '/app/uploads'}));

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

