const express = require('express')
const router = new express.Router()
const Photo = require('../models/photo')
const multer = require('multer')
const sharp = require('sharp')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: 'dbajnnylp',
    api_key: '383671612569842',
    api_secret: 'vtYO04aHVQac4TGFsJ9AeJmgKBY'
})

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

router.get('/photo/:id', async(req,res) => {
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
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 2000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload Jpg Jpeg or Png file'))
        }
        cb(undefined, true)
    }
})


router.post('/photos', upload.single('image'), async(req,res) => {
    // console.log(req.file)
    // const buffer = await sharp(req.file.buffer).toBuffer()
    const image = await cloudinary.v2.uploader.upload(req.file.path)
    const newPhotoObj = {...req.body, image: image.url}
    const photo = new Photo(newPhotoObj)
    // console.log(image.url)
    // console.log(newPhotoObj)
    try {
        await photo.save()
        // res.set('Content-Type', 'image/png')
        res.status(201).send(photo)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.patch('/photo/:id', async(req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'description']
    const isValidOperation = updates.every((update) => {
        return allowedUpdates.includes(update)
    })
    if(isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try{
        const photo = await Photo.findById(req.params.id)
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()
    }
    catch(e){
        req.status(400).send(e)
    }
})

router.delete('/photo/:id', async(req,res) => {
    try{
        const photo = Photo.findByIdAndDelete(req.params.id)
        if(!photo){
            res.status(404).send()
        }
    }
    catch(e){
        res.status(500).send(e)
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