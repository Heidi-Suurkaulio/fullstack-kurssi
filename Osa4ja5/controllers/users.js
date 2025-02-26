const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response, next) => {
    const { username, name, password, blogs } = request.body

    if (!password || password.length < 3) {
      const err = new Error('password must contain at least 3 characters')
      err.name = 'passwordError'
      next(err)
      return
    }
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    try {
      const user = new User({
        username,
        name,
        passwordHash
      })
    
      const savedUser = await user.save()
      
      response.status(201).json(savedUser)
    } catch(error) {
      next(error)
    }
})

userRouter.get('/', async (request, response, next) => {
  try {
    const users = await User
    .find({}).populate('blogs', {title: 1, author: 1, url: 1})
    response.json(users)
  } catch(error) {
    next(error)
  }
})

module.exports = userRouter