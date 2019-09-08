const express = require('express')
const router = express.Router()
const Genre = require('../models/genre')

router.get('/genres', async(req,res) => {
    const genres = await Genre.find({})
    try{
        res.status(200).send(genres)
    }catch(e){
        res.status(404).send()
    }
})

router.post('/genres', async(req,res) => {
    const genre = new Genre(req.body)
    try{
        await genre.save()
        res.status(201).send(genre)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router