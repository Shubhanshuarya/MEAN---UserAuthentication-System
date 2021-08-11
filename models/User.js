const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: String,
        default: Date.now
    },
    linkedin:{
        type: String
    },
    github:{
        type: String,
    },
    twitter:{
        type: String,
    },
    facebook:{
        type: String,
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;