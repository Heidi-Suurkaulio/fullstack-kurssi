const { test, after, beforeEach } = require('node:test')
const mongo = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')

const api = supertest(app)

// Note: Using the original database!
const initBlogs = [
    {
        "title": "Hirmuisten liskojen menneisyys",
        "author": "Heikki Kämäräinen",
        "url": "https://www.jyu.fi/fi/blogikirjoitus/hirmuisten-liskojen-menneisyys",
        "likes": 9
    },
    {
        "title": "The fractal nature of scientific revolutions",
        "author": "Andrew Gelman",
        "url": "https://statmodeling.stat.columbia.edu/2025/01/24/the-fractal-nature-of-scientific-revolutions-3/",
        "likes": 11
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there are right amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initBlogs.length)
})

after(async () => {
    await mongo.connection.close()
})