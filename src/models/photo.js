const mongoose = require('mongoose')

const photoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    likes: {
        type: Number,
        default: 0
    },
    image: {
        type: Buffer
    }
})

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo