const express  = require('express')
require('./db/mongoose')
// const Photo = require('./models/photo')
const photoRouter = require('./routers/photo')
const userRouter = require('./routers/user')
const genreRouter = require('./routers/genre')

const app = express()

app.use(express.json())

app.use(photoRouter)
app.use(userRouter)
app.use(genreRouter)

module.exports = app