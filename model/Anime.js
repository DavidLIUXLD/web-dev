const { number } = require('joi');
const mongoose = require('mongoose');

const AnimeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    startingSeason: {
        type: number
    },

    status: {
        type: number
    },

    about: {
        type: String
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