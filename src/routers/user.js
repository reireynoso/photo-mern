const express = require("express")
const router = new express.Router()
const User = require("../models/user")

router.post('/users', async(req,res) => {
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

router.patch('/user/:id', async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if(isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try{
        const user = await User.findById(req.params.id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()
    }
    catch(e){
        req.status(400).send(e)
    }
})

router.delete('/users/:id', async(req,res) => {
    try{
        const user = User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = router