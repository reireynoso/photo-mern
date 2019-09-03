const express = require("express")
const router = new express.Router()
const User = require("../models/user")

router.post('/user', async(req,res) => {
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/user/:id', async(req,res) => {
    try{
        const user = await User.findById(req.params.id)
        await user.populate('photos').execPopulate() //field doesn't show on json response. virtually it does
        // console.log(user.photos)
        res.send(user.photos)
    }
    catch(e){
        res.status(404).send()
    }
})

module.exports = router