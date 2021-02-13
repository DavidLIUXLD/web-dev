const mongoose = require('mongoose');

const AnimeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    about: {
        type: String,
        required: true
    },

    staff:{
        directors: {
            type: [String]
        }, 

        voiceActor: {
            type: [String]
        }
    },

    producer: {
        type: String,
        required: true
    },
    
    yearOfProduction: {
        type: Date,
        required: true
    },
    
    genre: {
        type: [String],
        required: true
    }

})

module.exports = Anime = mongoose.model('anime', AnimeSchema);