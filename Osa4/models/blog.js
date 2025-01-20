const mongo = require('mongoose')

const blogSchema = mongo.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

module.exports = mongo.model('Blog', blogSchema)
