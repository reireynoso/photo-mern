const express = require('express')
const router = new express.Router()
const Photo = require('../models/photo')
const User = require('../models/user')
const Genre = require('../models/genre')
const multer = require('multer')
const sharp = require('sharp')
const cloudinary = require('cloudinary')
const auth = require('../middleware/auth')
const Comment = require('../models/comment')

cloudinary.config({
    cloud_name: 'dbajnnylp',
    api_key: '383671612569842',
    api_secret: 'vtYO04aHVQac4TGFsJ9AeJmgKBY'
})

// alternative seed data approach
// router.get('/seedData', async(req,res) => {
//     const newUser = await User.create({
//         name: 'hello',
//         email: 'hello@sample.com',
//         password: 'hello',
//         age: 12
//     })
//     res.send(newUser)
// })

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
    const comments = await Comment.find({ photo_id: req.params.id})
    // console.log(photo)
    // const photoInfo = {...photo, comments}
    try{
        //returns image as jpg. 
        // res.set('Content-Type', 'image/jpg')
        res.status(200).send({photo, comments})
    }
    catch(e){
        res.status(404).send()
    }
})

router.post('/photo/:id/comments', auth ,async(req,res) => {
    const newComment = {...req.body, user_id: req.user._id}
    const comment = new Comment(newComment)
    try{
        await comment.save()
        res.status(201).send(comment)
    }catch(e){
        res.status(400).send(e)
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

router.post('/photos', upload.single('image'), auth, async(req,res) => {
    // console.log(req.file)
    // const buffer = await sharp(req.file.buffer).toBuffer()
    const image = await cloudinary.v2.uploader.upload(req.file.path)
    const newPhotoObj = {...req.body, owner: req.user._id, image: image.url}
    const photo = new Photo(newPhotoObj)

    try {
        await photo.save()
        res.status(201).send(photo)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.patch('/photo/:id', auth, async(req,res) => {
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
        if(photo.owner !== req.user._id){
            throw new Error("You do not own this photo.")
        }
        updates.forEach((update) => {
            user[update] = req.body[update]
        })
        await user.save()
        res.send()
    }
    catch(e){
        req.status(400).send(e)
    }
})

router.delete('/photo/:id', auth, async(req,res) => {
    const photo = await Photo.findById(req.params.id)
    try{
        // const photo = Photo.findByIdAndDelete(req.params.id)
        if(!photo){
            res.status(404).send()
        }
        if(photo.owner !== req.user._id){
            throw new Error("You do not own this photo.")
        }
        await photo.remove()
        res.send()
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