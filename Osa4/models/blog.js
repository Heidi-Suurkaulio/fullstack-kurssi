const mongo = require('mongoose')
const { Transform } = require('supertest/lib/test')

const blogSchema = mongo.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })

blogSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
  }
})

module.exports = mongo.model('Blog', blogSchema)
