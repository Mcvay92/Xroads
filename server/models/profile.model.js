var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const beautifyUnique = require('mongoose-beautiful-unique-validation');

var profileSchema = new Schema({
    user_id: {
        type: Schema.ObjectId,
        required: 'User Id is required.'
    },
    description: {
        type: String,
        trim: true
    },
    stage: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        default: 'active'
    },
    start_date: {
        type: Date,
        trim: true
    },
    team_name: {
        type: String,
        trim: true,
        required: 'Team name is required',
        unique: 'Team Name must be unique.'
    },
    contact: {
        type: String,
        trim: true
    },
    logo: {
        type: String,
        trim: true,
    },
    members: [{
            name: {type: String, required: 'Member name is required.'},
            role: {type: String},
            major: {type: String},
            linkedin: {type: String}
        }],
    roles: [{
            name: {type: String, required: 'Role name is required.'}
        }],
    git: {
        type: String,
        trim: true
    },
    facebook: {
        type: String,
        trim: true
    },
    instagram: {
        type: String,
        trim: true
    },
    linkedin: {
        type: String,
        trim: true
    },
    inbox: {
        type: String,
        trim: true
    },
    created_on: {
        type: Date,
        default: Date.now
    }
});




profileSchema.plugin(beautifyUnique);


module.exports = mongoose.model('Profile', profileSchema);