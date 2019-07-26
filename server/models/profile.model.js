var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

var profileSchema = new Schema({
    user_id:{
        type: Schema.ObjectId,
        required:true
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
        trim: true,
        unique: true,
    },
    contact: {
        type: String,
        trim: true
    },
    logo: {
        type: Number,
        trim: true,
        default: 0
    },
    members: [{
            name: {type: String},
            role: {type: Array},
            major: {type: String},
            linkedin: {type: String}
        }],
//    role: {
//        type: Array
//    },
    created_on: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model('Profile', profileSchema);