require('dotenv').config()

let PORT = process.env.PORT
let mongoUrl = process.env.MONGODBURI

module.exports = {
    PORT,
    mongoUrl
}