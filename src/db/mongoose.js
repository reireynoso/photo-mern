const mongoose = require('mongoose')

const URL = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/photo-api'

mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

