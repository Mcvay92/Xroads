var mongoose = require('mongoose'),
        validator = require('validator'),
        bcrypt = require('bcrypt'),
        Schema = mongoose.Schema;

var validateLocalStrategyEmail = function (email) {
    return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email, {require_tld: false}));
};

var userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        match: /.+\@.+\..+/,
        required: true,
        validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    stage: {
        type: String,
        trim: true
    },
    start_date: {
        type: Date,
        trim: true
    },
    team_name: {
        type: String,
        trim: true
    },
    logo: {
        type: Number,
        trim: true,
        default: 0
    },
    memebers: [{
            name: {type: String},
            role:  {type: Array},
            major: {type: String},
            linkedin: {type: String}
        }],
    role: {
        type: Array
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

// Export the Mongoose model
module.exports = mongoose.model('User', userSchema);