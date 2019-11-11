const app = require('./app')
const seedData = require('./db/seedData')

const port = process.env.PORT

app.listen(port, ()=> {
    console.log('Server is up on ' + port)
    // seedData()
})

