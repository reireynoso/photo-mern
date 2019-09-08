const express = require('express')
const router = new express.Router()
const Photo = require('../models/photo')
const multer = require('multer')
const sharp = require('sharp')

router.get('/photos', async(req,res) => {
    const photo = await Photo.find({})
    try{
        // res.set('Content-Type', 'image/jpg')
        res.status(200).send(photo)
    }
    catch(e){
        res.status(404).send()
    }
})

router.get('/photos/:id', async(req,res) => {
    const photo = await Photo.findById(req.params.id)
    try{
        //returns image as jpg. 
        res.set('Content-Type', 'image/jpg')
        res.status(200).send(photo.image)
    }
    catch(e){
        res.status(404).send()
    }
})

const upload = multer({
    // dest: 'images'
    limits: {
        fileSize: 2000000
    }
})

router.post('/photo', upload.single('image'), async(req,res) => {
    // console.log(req.file)
    const buffer = await sharp(req.file.buffer).toBuffer()
    const newPhotoObj = {...req.body, image: buffer}
    const photo = new Photo(newPhotoObj)
    try {
        await photo.save()
        res.set('Content-Type', 'image/png')
        res.status(201).send(photo)
    }
    catch(e){
        res.status(400).send(e)
    }
})





// router.get('/photos', async(req,res) => {
//     try{
//         const photos = await Photo.find({owner: "5d6d637ab0cb59bb5d502693"})
//         // await photos[0].populate({
//         //     path: 'owner'
//         // }).execPopulate()
//         res.send(photos)
//     }
//     catch(e){
//         res.status(500).send()
//     }
// })

module.exports = router