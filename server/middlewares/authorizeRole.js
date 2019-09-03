const Mongoose = require('mongoose');
var acl = require('acl');
acl = new acl(new acl.mongodbBackend(Mongoose.connection.db, 'acl_'));
//console.log(Mongoose.connection, 'Mongoose.connection.db')
var roleMiddleware = function (req, res, next) {
    acl.allow([
        {
            roles: ['founder'],
            allows: [
                {
                    resources: ['/api/getprofile', '/api/editprofile'],
                    permissions: ['get', 'post', 'put', 'delete'],
                },
            ],
        },
        {
            roles: ['co-founder'],
            allows: [
                {
                    resources: ['/api/getprofile'],
                    permissions: ['get']
                },
            ]
        }
    ]);
}
module.exports = roleMiddleware;