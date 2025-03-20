const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

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

blogRouter.post('/', userExtractor, async (request, response, next) => {
    try {
        const body = request.body
        const user = request.user

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

blogRouter.delete('/:id', userExtractor, async (request, response, next) => {
    try {   
        const userId = request.user._id
        const blogId = request.params.id
        const blog = await Blog.findById(blogId)
        if (!blog) {
            next(notFound)
            return
        }
        if (blog.user.toString() !== userId.toString()) {
            return response.status(401).json({error: 'user not authorized to modify content'})
        }
        // dangerous?
        await Blog.deleteOne({ _id: blogId })
        response.status(204).end()
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
            return
        }
        next(notFound)
        return
    }
    catch (exception) {
        next(exception)
    }
})

module.exports = blogRouter