const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    photo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Photo'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment