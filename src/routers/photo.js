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
        const photos = await Photo.find({owner: "5d6d637ab0cb59bb5d502693"})
        // await photos[0].populate({
        //     path: 'owner'
        // }).execPopulate()
        res.send(photos)
    }
    catch(e){
        res.status(500).send()
    }
})

module.exports = router