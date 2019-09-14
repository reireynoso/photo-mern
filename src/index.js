const app = require('./app')
const seedData = require('./db/seedData')

const port = process.env.PORT || 3000

app.listen(port, ()=> {
    console.log('Server is up on ' + port)
    // seedData()
    // console.log(runner)
})

