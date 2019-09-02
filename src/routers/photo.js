const express = require('express')
const router = new express.Router()
const Photo = require('../models/photo')

router.post('/photo', async(req,res) => {
    const photo = new Photo(req.body)
    try {
        await photo.save()
        res.status(201).send(photo)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.get('/photos', async(req,res) => {
    try{
        const photos = await Photo.find({})
        await photos[2].populate({
            path: 'owner'
        }).execPopulate()
        res.send(photos[2])
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router