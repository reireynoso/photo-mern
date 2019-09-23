const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Comment = require('../models/comment')
const Photo = require('../models/photo')

// router.get('/comments', async(req,res) => {
//     const comments = await Comment.find({})
//     try{
//         res.status(200).send(comments)
//     }catch(e){
//         res.status(404).send()
//     }
// })

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

router.delete('/comment/:id', auth, async(req,res) => {
    const comment = await Comment.findById(req.params.id)
    try{
        // const photo = Photo.findByIdAndDelete(req.params.id)
        if(!comment){
            res.status(404).send()
        }
        if(comment.user_id !== req.user._id){
            throw new Error("You do not own this comment.")
        }
        await comment.remove()
        res.send()
    }
    catch(e){
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