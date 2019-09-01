const express  = require('express')
require('./db/mongoose')
const Photo = require('./models/photo')

const app = express()

app.use(express.json())

app.use(photoRouter)

module.exports = app