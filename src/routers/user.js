const express = require("express")
const router = new express.Router()
const User = require("../models/user")
const Photo = require("../models/photo")
const auth = require('../middleware/auth')
const cors = require('cors')

router.post('/users', async(req,res) => {
    const user = new User(req.body)
    try{
        //create token
        await user.save()
        const token = await user.generateAuthToken()
        // console.log(token)
        res.status(201).send({user, token})
    }
    catch(e){
        // console.log(e.errmsg)
        res.status(400).send({error: 'Email already exists.'})
    }
})
router.post('/users/login', cors() , async(req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    }catch(e){
        // console.log(Object.keys(e))
        res.status(400).send({error: "Unable to Login"})
    }
})

// router.get('/user/:id', async(req,res) => {
//     try{
//         const user = await User.findById(req.params.id)
//         // await user.populate('photos').execPopulate() //field doesn't show on json response. virtually it does
//         // console.log(user.photos)
//         res.send(user)
//     }
//     catch(e){
//         res.status(404).send()
//     }
// })

router.get('/user/auto_login', auth, async(req,res) => {
    try{
        // const user = await User.findById(req.params.id)
        res.send(req.user)
    }
    catch(e){
        res.status(404).send()
    }
})

router.get('/user/photos', auth ,async(req,res) => {
    try{
        // const user = await User.findById(req.params.id)
        const userPhotos = await Photo.find({owner: req.user.id})
        res.send(userPhotos)
    }
    catch(e){
        res.status(404).send()
    }
})

router.patch('/user', auth ,async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try{
        // const user = await User.findById(req.params.id)
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        res.status(200).send(req.user)
    }
    catch(e){
        req.status(400).send(e)
    }
})

router.delete('/user', auth, async(req,res) => {
    try{
        // const user = User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     res.status(404).send()
        // }
        await req.user.remove()
        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = router