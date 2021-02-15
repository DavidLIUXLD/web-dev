const { number } = require('joi');
const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    gender: {
        type: number,
        default: 0,
        required: true
    },

    bio: {
        type: String
    },

    watched:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'anime'
    },

    following: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user'
    },

    birthday: {
        type: Date,
    }

})

module.exports = Profile = mongoose.model('profile', ProfileSchema);