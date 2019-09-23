const express  = require('express')
require('./db/mongoose')
const commentRouter = require('./routers/comment')
const photoRouter = require('./routers/photo')
const userRouter = require('./routers/user')
const genreRouter = require('./routers/genre')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

app.use(photoRouter)
app.use(userRouter)
app.use(genreRouter)
app.use(commentRouter)

module.exports = app