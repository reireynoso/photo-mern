const mongoose = require("mongoose")
const validator = require('validator')
const Photo = require('./photo')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    password: {
        type: String,
        trim: true
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
    // token: {
    //     type: String,
       
    // }
}, {
    timestamps: true
})

//private methods

userSchema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    // delete userObject.token

    return userObject
}

// userSchema.virtual('photos', {
//     ref: 'Photo',
//     localField: '_id',
//     foreignField: 'owner'
// })

//set instance methods for user class, dealing with tokens

userSchema.methods.generateAuthToken = async function (){
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, 'thisismyphoto')
    // console.log(user._id, 'user_id')
    await user.save()

    return token
}

//method to be called on from router
userSchema.statics.findByCredentials = async(email,password) => {
    const user = await User.findOne({ email: email })

    if(!user){
        throw new Error('Unable to login')
    }
    //if user is found, compares password
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
// console.log(user)
    return user
}

//hashes plain text pw before saving
userSchema.pre('save', async function(next){
    const user = this

    //check if password has been updated
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})
// userSchema.virtual('photos', {
//     ref: 'Photo',
//     localField: '_id',
//     foreignField: 'owner'
// })

const User = mongoose.model('User', userSchema)

module.exports = User