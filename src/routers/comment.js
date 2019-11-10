const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Comment = require('../models/comment')
const Photo = require('../models/photo')

router.get('/comments', async(req,res) => {
    console.log('hey')
    const comments = await Comment.find({})
    try{
        res.status(200).send(comments)
    }catch(e){
        res.status(404).send()
    }
})

// router.post('/comments', auth ,async(req,res) => {
//     const newComment = {...req.body, user_id: req.user._id}
//     const comment = new Comment(newComment)
//     try{
//         await comment.save()
//         res.status(201).send(comment)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })

router.delete('/comment', auth, async(req,res) => {
    // console.log(req.body)
    const comment = await Comment.findById(req.body._id)
    // console.log(comment.user.toString())
    // console.log(req.user._id.toString())
    try{
        // const photo = Photo.findByIdAndDelete(req.params.id)
        if(!comment){
            // res.status(404).send({error: "Photo does not exist"})
            throw new Error("Photo does not exist.")
        }
        if(comment.user.toString() !== req.user._id.toString()){
            // res.status(404).send({error: "You do not own this comment."})
            throw new Error("You do not own this comment.")
        }
        await comment.remove()
        res.status(200).send({success: "Comment Deleted"})
    }
    catch(e){
        // console.log(e)
        res.status(500).send(e)
    }
})



// router.patch('/comment/:id', auth, async(req,res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'description']
//     const isValidOperation = updates.every((update) => {
//         return allowedUpdates.includes(update)
//     })
//     if(isValidOperation){
//         return res.status(400).send({error: 'Invalid updates!'})
//     }
//     try{
//         const comment = await Comment.findById(req.params.id)
//         if(photo.owner !== req.user._id){
//             throw new Error("You do not own this photo.")
//         }
//         updates.forEach((update) => {
//             user[update] = req.body[update]
//         })
//         await user.save()
//         res.send()
//     }
//     catch(e){
//         req.status(400).send(e)
//     }
// })



module.exports = router