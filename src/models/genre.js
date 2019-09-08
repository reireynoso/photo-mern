const mongoose = require("mongoose")

const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
}, {
    timestamps: true
})

const Genre = mongoose.model('Genre', genreSchema)

module.exports = Genre