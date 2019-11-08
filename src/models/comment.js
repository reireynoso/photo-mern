const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true
    },
    photo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Photo',
        // autopopulate: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        // autopopulate: true
    },
}, {
    timestamps: true
})

commentSchema.pre('find', function(){
    this.populate('user', 'name age')
    // this.populate('genre', 'name')
    // this.populate('comments')
})

commentSchema.methods.toJSON = function(){
    const comment = this
    const commentObject = comment.toObject()
    // console.log(commentObject)

    delete commentObject.createdAt
    delete commentObject.updatedAt
    delete commentObject.photo
    // delete userObject.token

    return commentObject
}
// commentSchema.plugin(require('mongoose-autopopulate'));

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment