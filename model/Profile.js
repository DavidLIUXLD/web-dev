const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    bio: {
        type: String
    },

    watched:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'anime'
    },

    article:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'article'
    },

    liked:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'article'
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