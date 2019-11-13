const Photo = require('../models/photo')
const User = require('../models/user')
const Genre = require('../models/genre')
const Comment = require('../models/comment')

const data = async() => {

    User.collection.deleteMany({})
    Genre.collection.deleteMany({})
    Photo.collection.deleteMany({})
    Comment.collection.deleteMany({})
    
    const rei = await User.create({
        name: 'Rei',
        email: 'rei@sample.com',
        password: 'hello',
        age: 12
    })

    const leizl = await User.create({
        name: 'Leizl',
        email: 'leizl@sample.com',
        password: 'hello',
        age: 17
    })

    const kring = await User.create({
        name: 'Kring',
        email: 'kring@sample.com',
        password: 'hello',
        age: 21
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
    // // console.log(genres[0])
    
    const photos = await Photo.insertMany([
        {name: "Supreme LV Hoodie", description: "How much?", likes: 301, genre: genres[0], image: "https://blvcks.com/wp-content/uploads/2017/09/o4j_Hmqy2-g.jpg", owner: rei},
        {name: "Black Gucci Hoodie", description: "Why?", likes: 222, genre: genres[0], image: "https://cdn-images.farfetch-contents.com/12/56/27/14/12562714_11933138_300.jpg", owner: rei},
        {name: "White Gucci Tee", description: "Why tho?", likes: 930, genre: genres[0], image: "https://cdn-images.farfetch-contents.com/12/14/71/57/12147157_10105325_480.jpg", owner: rei},
        {name: "Off White Tee", description: "Affordable or nah", likes: 543, genre: genres[0], image: "https://is4.fwrdassets.com/images/p/fw/z/OFFF-MS57_V5.jpg", owner: rei},
        {name: "Supreme Grey Bogo Crewneck", description: "To wear or not to wear", likes: 12, genre: genres[0], image: "https://stockx.imgix.net/products/streetwear/Supreme-Box-Logo-Crewneck-FW18-Ash-Grey.jpg?fit=fill&bg=FFFFFF&w=300&h=214&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1544119130", owner: rei},
        {name: "Off White Chicago", description: "Almost mortgaged my house", likes: 123, genre: genres[1], image: "https://image.goat.com/crop/375/attachments/product_template_additional_pictures/images/008/487/311/original/136666_01.jpg.jpeg", owner: rei},
        {name: "Travis Scott Jordan 1s", description: "Pretty Unique", likes: 134, genre: genres[1], image: "https://static.highsnobiety.com/thumbor/xKVF4YDdnDrzV5p6j7CI5Zcjofk=/fit-in/320x213/smart/static.highsnobiety.com/wp-content/uploads/2019/01/11084540/travis-scott-nike-air-jordan-1-reverse-swoosh-release-date-price-product-04.jpg", owner: rei},
        {name: "Yeezy Pirate Blacks", description: "Expensive AF", likes: 242, genre: genres[1], image: "https://image.goat.com/crop/750/attachments/product_template_additional_pictures/images/008/490/707/original/29981_01.jpg.jpeg", owner: rei},
        {name: "Nike MAG Back to the Future", description: "Used my Flatiron Tuition for these", likes: 246, genre: genres[1], image: "https://stockx-360.imgix.net/mag-kauf_TruView/Images/mag-kauf_TruView/Lv2/img01.jpg?auto=format,compress&q=90&updated_at=1538080256&w=400", owner: rei},
        {name: "Timberlands", description: "The New Yorker", likes: 745, genre: genres[1], image: "https://images.timberland.com/is/image/timberland/10061024-HERO?wid=720&hei=720&fit=constrain,1&qlt=85,1&op_usm=1,1,6,0", owner: leizl},
        {name: "WHY", description: "Why you do this to me?", likes: 432, genre: genres[2], image: "https://pics.me.me/when-your-body-naturally-and-habitually-wakes-you-up-at-31528076.png", owner: leizl},
        {name: "The Truth", description: "Thats a fact !", likes: 635, genre: genres[2], image: "https://img.ifcdn.com/images/4fa610a71a294154fe556ede328f5db06b7ad05942ac3a88d443293718de026c_1.jpg", owner: leizl},
        {name: "Sorry", description: "Not Sorry", likes: 385, genre: genres[2], image: "https://pics.me.me/sorry-i-didnt-get-your-text-okayyy-so-who-got-37051846.png", owner: leizl},
        {name: "Oops", description: "I swear I'm doing work", likes: 878, genre: genres[2], image: "https://pics.me.me/when-your-boss-comes-around-the-corner-and-you-grab-23503350.png", owner: leizl},
        {name: "Chill", description: "...", likes: 990, genre: genres[2], image: "https://humorside.com/wp-content/uploads/2017/12/funny-memes-that-will-cure-your-bad-day-05.jpg", owner: leizl},
        {name: "LBJ", description: "Easy", likes: 745, genre: genres[3], image: "https://pbs.twimg.com/media/Clf-NPOWIAAzvVj.jpg", owner: leizl},
        {name: "Warriors", description: "Hitting the 3-peat", likes: 645, genre: genres[3], image: "https://www.mercurynews.com/wp-content/uploads/2016/08/20150616__warceleb34.jpg?w=460", owner: leizl},
        {name: "Damian Lillard", description: "Its Dame Time", likes: 777, genre: genres[3], image: "https://pbs.twimg.com/media/DNsnt0yVAAUIZrs.jpg", owner: rei},
        {name: "LBJ to JR", description: "What are you doing..?", likes: 888, genre: genres[3], image: "https://cms.qz.com/wp-content/uploads/2018/06/lebron-james-yelling-at-jr-smith.jpg?quality=75&strip=all&w=1400", owner: kring},
        {name: "Mountain", description: "Nice", likes: 245, genre: genres[4], image: "https://www.elitereaders.com/wp-content/uploads/2016/02/featimage-4.jpg", owner: kring},
        {name: "Blue", description: "Very Blue", likes: 168, genre: genres[4], image: "https://cdn-image.travelandleisure.com/sites/default/files/styles/1600x1000/public/1482439294/crater-lake-oregon-BLUEST1216.jpg?itok=mGRk1Fd2", owner: kring},
        {name: "Green", description: "Very Green", likes: 675, genre: genres[4], image: "https://www.uea.ac.uk/documents/3154295/26870726/Green+spaces++banner.jpg/b5ef8e03-1b39-5855-e563-e85623894a29?t=1530872002959", owner: kring},
        {name: "Rain", description: "Dont like the rain", likes: 432, genre: genres[4], image: "https://images.pexels.com/photos/1463530/pexels-photo-1463530.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", owner: kring},
        {name: "Rainbow", description: "Look its a rainbow", likes: 167, genre: genres[4], image: "https://s.hswstatic.com/gif/rainbow-gallery-1.jpg", owner: kring},
        {name: "Quantum Computer", description: "The Future", likes: 364, genre: genres[5], image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnlDT50speD4_TjyV7G1sRjTgj0nqHSxJGspuKC5LpMOFAZ1uc", owner: kring},
        {name: "Robo Dog", description: "Whos mans?", likes: 512, genre: genres[5], image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFOiXP0CwOmWn8jcWwsu5GEbsFiClNbh2jruY6ygRpW5kEh7eD", owner: kring},
        {name: "Antique", description: "Take me back to 1999", likes: 341, genre: genres[5], image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdZarDaGuG2YGfjWj6kZbIXwO6EkxgsFrjKiMMuFpCSecZmHmqHw", owner: leizl},
        {name: "Echo", description: "Alexa? Is that you?", likes: 892, genre: genres[5], image: "https://target.scene7.com/is/image/Target/GUEST_adaeeb2b-67d4-448d-8f2c-8f5de3b39757?wid=488&hei=488&fmt=pjpeg", owner: kring},
        {name: "Nintendo Switch", description: "Play me in Smash", likes: 45, genre: genres[5], image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBeoGwQISIS43ygfTvFWxg63wr6SsWIqSac0HJ3lADLh6bGomQ", owner: rei},
        {name: "Husky", description: "Cool dog", likes: 355, genre: genres[6], image: "https://cdn.orvis.com/images/DBS_SibHusky.jpg", owner: kring},
        {name: "White Horse", description: "Majestic", likes: 344, genre: genres[6], image: "https://image.shutterstock.com/image-photo/white-horse-standing-on-green-260nw-756457801.jpg", owner: leizl},
        {name: "Black Pug", description: "Cute", likes: 135, genre: genres[6], image: "https://wallpapercave.com/wp/bFB4V5c.jpg", owner: rei},
        {name: "Some Kitten", description: "Stay this size", likes: 900, genre: genres[6], image: "https://dcist.com/wp-content/uploads/sites/3/2019/04/Gem2-1500x1346.jpg", owner: leizl},
        {name: "The Lion King", description: "Roar", likes: 876, genre: genres[6], image: "https://cosmos-images2.imgix.net/file/spina/photo/14772/GettyImages-691120979.jpg?ixlib=rails-2.1.4&auto=format&ch=Width%2CDPR&fit=max&w=835", owner: rei},
        {name: "GTR", description: "Fast affffff", likes: 444, genre: genres[7], image: "https://www.nissanusa.com/content/dam/Nissan/us/vehicles/gtr/r35/2_minor_change/overview/18tdi-gtrhelios104.jpg.ximg.l_full_m.smart.jpg", owner: kring},
        {name: "Bugatti", description: "I woke up in a new Bugatti", likes: 567, genre: genres[7], image: "https://hips.hearstapps.com/amv-prod-cad-assets.s3.amazonaws.com/vdat/submodels/bugatti_divo_bugatti-divo_2020-1535127766731.jpg", owner: kring},
        {name: "Mercedes C63", description: "Too much class", likes: 888, genre: genres[7], image: "https://f7432d8eadcf865aa9d9-9c672a3a4ecaaacdf2fee3b3e6fd2716.ssl.cf3.rackcdn.com/C2299/U6886/IMG_17113-medium.jpg", owner: rei},
        {name: "Tesla", description: "No gas, No problem", likes: 908, genre: genres[7], image: "https://media.wired.com/photos/5926c04bf3e2356fd800a53a/master/w_2400,c_limit/TeslaSTA.jpg", owner: kring},
        {name: "Lamborghini", description: "Get low low low", likes: 688, genre: genres[7], image: "https://content.homenetiol.com/2001243/2130496/0x0/e38c567224374fb0a3f6a7a83b94bc57.jpg", owner: kring},
        {name: "Pad Thai", description: "My go to", likes: 396, genre: genres[8], image: "https://pinchofyum.com/wp-content/uploads/Vegetarian-Pad-Thai-Recipe.jpg", owner: leizl},
        {name: "General Tsos Chicken", description: "First name General, Last name Tso", likes: 574, genre: genres[8], image: "https://www.seriouseats.com/recipes/images/2015/04/20140328-general-tsos-chicken-recipe-food-lab-1-1500x1125.jpg", owner: leizl},
        {name: "STEAK", description: "Medium Rare Please", likes: 79, genre: genres[8], image: "https://hips.hearstapps.com/vidthumb/images/delish-cajun-butter-steak-still006-1528495387.jpg", owner: kring},
        {name: "Vegan", description: "Rabbit food", likes: 246, genre: genres[8], image: "https://cdn1.medicalnewstoday.com/content/images/articles/324/324343/plant-meal.jpg", owner: kring},
        {name: "Popeyes", description: "Louisiana is the way to go", likes: 364, genre: genres[8], image: "https://images.firstwefeast.com/complex/images/c_limit,f_auto,fl_lossy,q_auto,w_768/xcnbpr1e475lafy6eay9/popeyes", owner: kring},
        {name: "DJ ???", description: "Give him a name", likes: 6, genre: genres[9], image: "https://images.unsplash.com/photo-1533113860586-3da7fe05daae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80", owner: rei},
        {name: "DRUM DRUM DRUM", description: "I started a band", likes: 111, genre: genres[9], image: "https://c.stocksy.com/a/y9G900/z9/2207074.jpg?1551026928", owner: leizl},
        {name: "Yamaha Piano", description: "Play me a song", likes: 322, genre: genres[9], image: "https://www.pianosplus.com/wp-content/uploads/yamaha-pianos-types-650x368.jpg", owner: rei},
        {name: "Festival?", description: "Do you even rave?", likes: 45, genre: genres[9], image: "https://s29745.pcdn.co/wp-content/uploads/2018/09/41580112_10156173992978025_4013920836766400512_o.jpg.optimal.jpg", owner: leizl},
        {name: "Spotitube", description: "Pick your Poison", likes: 23, genre: genres[9], image: "https://techcrunch.com/wp-content/uploads/2016/07/spotify-over-youtube.png?w=730&crop=1", owner: rei},
    ])

    const comments = await Comment.insertMany([
        {content: "First Comment random", photo: photos[0], user: rei},
        {content: "Second Comment random", photo: photos[0], user: rei},
        {content: "Third Comment random", photo: photos[1], user: leizl}
    ])
}

// const createData = data()
// console.log(newUser)
module.exports = data