const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req,res,next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ', '')
        // console.log(token)
        // verify token and decodes token which took in user._id
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
   
        // const user = await User.findOne({ token: token})
        // finds user from decoded var
        const user = await User.findOne({ _id: decoded._id})
  
        if(!user){
            throw new Error()
        }
        req.token = token
        req.user = user

        next()
    }catch(e){
        res.status(401).send({error: 'Please authenticate.'})
    }
}

module.exports = auth