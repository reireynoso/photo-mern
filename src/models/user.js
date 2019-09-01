const mongoose = require("mongoose")
const validator = require('validator')
const Photo = require('./photo')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number')
            }
        }
    },
    // tokens: [{
    //     token: String,
    //     required: true
    // }]
}, {
    timestamps: true
})

userSchema.virtual('photos', {
    ref: 'Photo',
    localField: '_id',
    foreignField: 'owner'
})

const User = mongoose.model('User', userSchema)

module.exports = User