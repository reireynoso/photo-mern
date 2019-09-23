const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    photo_id: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment