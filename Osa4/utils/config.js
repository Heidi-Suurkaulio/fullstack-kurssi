require('dotenv').config()

const PORT = process.env.PORT

const mongoUrl = process.env.NODE_ENV === 'test'
? process.env.TEST_MONGODBURI  
: process.env.MONGODBURI

//let mongoUrl = process.env.MONGODBURI

module.exports = {
    PORT,
    mongoUrl
}