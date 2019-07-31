var mongoose = require('mongoose'),
validator = require('validator'),
bcrypt = require('bcrypt'),
Schema = mongoose.Schema;
const beautifyUnique = require('mongoose-beautiful-unique-validation');

var validateLocalStrategyEmail = function (email) {
    return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email, {require_tld: false}));
};

var userSchema = new Schema({
    email: {
        type: String,
        unique: 'Email already exist.',
        lowercase: true,
        trim: true,
        match: /.+\@.+\..+/,
        required: 'Email is required.',
        validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
    },
    password: {
        type: String,
        trim: true,
        required: 'Password is required.'
    },
    created_on: {
        type: Date,
        default: Date.now
    }
});


userSchema.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err)
            return cb(err);
        cb(null, isMatch);
    });
};
userSchema.plugin(beautifyUnique);
module.exports = mongoose.model('User', userSchema);