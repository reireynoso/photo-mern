const mongoose = require('mongoose')
const User = require('../models/user')
const Comment = require('../models/comment')

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
        ref: 'User',
        // autopopulate: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Genre',
        // autopopulate: true
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
})

photoSchema.virtual('comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'photo'
})


//allows populate method to be accessible every time find is used for photos
photoSchema.pre('find', function(){
    this.populate('owner', 'name age')
    this.populate('genre', 'name')
    this.populate('comments')
})
//populate field upon creation and save
// photoSchema.post('save', async function(doc,next){
//     await doc.populate('owner').execPopulate()
//     await doc.populate('genre').execPopulate()
//     next()
// })

// photoSchema.plugin(require('mongoose-autopopulate'));

const Photo = mongoose.model('Photo', photoSchema)

module.exports = Photo