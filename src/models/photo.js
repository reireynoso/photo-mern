const mongoose = require('mongoose')
const User = require('../models/user')

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
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Genre'
    }
})

// photoSchema.virtual('users', {
//     ref: 'User',
//     localField: 'owner',
//     foreignField: '_id'
// })

//allows populate method to be accessible every time find is used for photos
photoSchema.pre('find', function(){
    this.populate('owner', 'name age')
    this.populate('genre', 'name')
})

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo