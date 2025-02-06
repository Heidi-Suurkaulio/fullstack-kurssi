const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    }
    catch(error) {
         next(error)
    }
})

blogRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        })
        console.log("täällä")

        const saved = await blog.save()
        response.status(201).json(saved)
    }
    catch(exception) {
        next(exception)
    }
})

blogRouter.delete('/:id' , async (request, response, next) => {
    try {
        const result = await Blog.findByIdAndDelete(request.params.id)
        if (result) {
            response.status(204).end()
        }
        response.status(404).end()
    }
    catch(exception) {
        next(exception)
    }
})

blogRouter.put('/:id', async (request, response, next) => {
    try {
        const body = request.body
        const res = await Blog.findByIdAndUpdate(request.params.id, 
            {likes: body.likes}, {
                new: true, runValidators: true, context: 'query'
            })
         if (res) {
            response.json(res).end()
        }
        response.status(404).end()
    }
    catch(exception) {
        next(exception)
    }
})

module.exports = blogRouter