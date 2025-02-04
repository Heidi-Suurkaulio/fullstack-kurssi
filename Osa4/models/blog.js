const mongo = require('mongoose')

const blogSchema = mongo.Schema({
    title: {
      type: String,
      required: true
    },
    author: String,
    url: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      required: true,
      default: 0
    }
  })

blogSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
  }
})

module.exports = mongo.model('Blog', blogSchema)
