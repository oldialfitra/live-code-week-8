const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    axios = require('axios')

const apodSchema = new Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    url: {
        type: String
    },
    mediaType: {
        type: String
    },
    date: {
        type: Date,
        required: [true, 'Date required']
    }
}, {
        timestamps: {}
    })

const Apods = mongoose.model('apod', apodSchema)
module.exports = Apods