const tester = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

tester.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  console.log("hello, I'm in testing database!")
  response.status(204).end()
})

module.exports = tester
