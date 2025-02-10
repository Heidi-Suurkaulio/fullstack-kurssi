const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const notFound = new Error('resource not found')
notFound.name = 'notFoundError'

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog
            .find({}).populate('user', { username: 1, name: 1 })
        response.json(blogs)
    }
    catch (error) {
        next(error)
    }
})

blogRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        const decodedToken = jwt.verify(request.token, 
        process.env.SECRET)
        if (!decodedToken.id) {    
            return response.status(401).json({ error: 'token invalid' })  
        }
        const user = await User.findById(decodedToken.id)

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes,
            user: user._id
        })

        const saved = await blog.save()
        user.blogs = user.blogs.concat(saved.id)
        await user.save()
        response.status(201).json(saved)
    }
    catch (exception) {
        next(exception)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        const result = await Blog.findByIdAndDelete(request.params.id)
        if (result) {
            response.status(204).end()
        }
        next(notFound)
        return
    }
    catch (exception) {
        next(exception)
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    try {
        const body = request.body
        const res = await Blog.findByIdAndUpdate(request.params.id,
            { likes: body.likes }, {
            new: true, runValidators: true, context: 'query'
        })
        if (res) {
            response.json(res).end()
        }
        next(notFound)
        return
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = blogRouter