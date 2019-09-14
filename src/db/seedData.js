const Photo = require('../models/photo')
const User = require('../models/user')
const Genre = require('../models/genre')

const data = async() => {
    const user = await User.create({
        name: 'hello',
        email: 'hello@sample.com',
        password: 'hello',
        age: 12
    })

    const genres = await Genre.insertMany([
        {name: "Streetwear"},
        {name: "Sneakers"},
        {name: "Memes"},
        {name: "Sports"},
        {name: "Nature"},
        {name: "Techonology"},
        {name: "Animals"},
        {name: "Cars"},
        {name: "Food"},
        {name: "Music"}
    ]) 
}

// const createData = data()
// console.log(newUser)
module.exports = data