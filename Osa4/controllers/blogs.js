const blogRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    }
    catch { exception =>
        logger.info(exception.message) // temporary fix? bad one?
        response.status(404).end()
    }
})

blogRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        })

        const saved = await blog.save()
        response.status(201).json(saved)
    }
    catch {exception => 
        logger.info(exception.message)
        response.status(400).end()
    }
})

module.exports = blogRouter