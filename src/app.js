const express  = require('express')
require('./db/mongoose')
// const Photo = require('./models/photo')
const photoRouter = require('./routers/photo')
const userRouter = require('./routers/user')

const app = express()

app.use(express.json())

app.use(photoRouter)
app.use(userRouter)

module.exports = app