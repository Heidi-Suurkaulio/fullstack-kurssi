const { test, after, beforeEach } = require('node:test')
const mongo = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const { title } = require('node:process')

const api = supertest(app)

// Now using local database
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

test('identifier is marked as id', async () => {
    const response = await api.get('/api/blogs')
    const everyId = response.body.every(res => res.id)
    
    assert(everyId)
})

test('a valid blog can be added', async () => {
    const testBlog = {
        title: 'Luottamusväli ≠ luottamusväli',
        author: 'Joni Pääkkö',
        url: 'https://joanpaak.github.io/blathers/LuottamusvaliEiLuottamusvali/luottamusvaliEiLuottamusvali.html',
        likes: 6
    }

    await 
    api.post('/api/blogs')
    .send(testBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    assert(response.body.find(({author}) => 
        author === 'Joni Pääkkö'))

    assert.strictEqual(response.body.length, initBlogs.length + 1)
})

test('if likes is not declared the dafault is 0', async () => {
    const testerBlog = {
        title: 'Onko gradu kesken?',
        author: 'Heidi Suurkaulio',
        url: 'https://www.jyu.fi/fi/blogikirjoitus/onko-gradu-kesken'
    }

    await 
    api.post('/api/blogs')
    .send(testerBlog)
    .expect(201)

    const response = await api.get('/api/blogs')
    
    const blg = response.body.find(({title}) => 
        title === 'Onko gradu kesken?')

    assert(blg.likes === 0)
})

after(async () => {
    await mongo.connection.close()
})