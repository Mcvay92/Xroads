const Mongoose = require('mongoose');
var acl = require('acl');
acl = new acl(new acl.mongodbBackend(Mongoose.connection.db, 'acl_'));
console.log(acl, 'acl')
var roleMiddleware = function (req, res, next) {
    acl.allow('founder', 'profile', ['view, edit, delete']);
    next();
//    if (token) {
//        jwt.verify(token, config.secret, function (err, decoded) {
//            if (err) {
//                res.status(403).send({success: false, message: 'Failed to authenticate access token.'});
//            } else {
//                if (decoded.id !== req.params.id) {
//                    res.status(403).send({success: false, message: 'Failed to authenticate access token.'});
//                } else {
//                    req.decoded = decoded;
//                    next();
//                }
//            }
//        });
//    } else {
//        res.status(403).send({success: false, error: 'No access token provided.'});
//    }
}
module.exports = roleMiddleware;