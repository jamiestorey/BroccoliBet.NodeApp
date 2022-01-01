const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    displayname: {
        type: String,
        required: false,
        default: ''
    },
    firstName: {
        type: String,
        required: false,
        default: 'investigate'
    },
    lastName: {
        type: String,
        required: false,
        default: ''
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);