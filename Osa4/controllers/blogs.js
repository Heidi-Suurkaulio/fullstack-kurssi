const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    }
    catch { exception =>
        console.log(exception) // bad fix
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
        console.log(exception)
    }
})

module.exports = blogRouter