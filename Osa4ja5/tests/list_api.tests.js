const { test, after, beforeEach, describe, before } = require('node:test')
const mongo = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')

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

const logIn = async () => {
    const login = await api
    .post('/api/login')
    .send({username: "fraktaali", password: "11235"})
    return `Bearer ${login.body.token}`
}

// before instead of beforeEach
before(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    const pw = await bcrypt.hash('11235', 10)
    await new User({
        "name": "Fraktaali-Joonas",
        "username": "fraktaali",
        "passwordHash": pw
    }).save()
    token = await logIn()
    await api
    .post('/api/blogs')
    .send(initBlogs[0])
    .set({ Authorization: token })
    await api
    .post('/api/blogs')
    .send(initBlogs[1])
    .set({ Authorization: token})
})

describe('generally testing the blog list', () => {

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
})

describe('testing post method', async () => {
    token = await logIn()
    
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
                .set({authorization: token})
                .expect(201)
                .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        assert(response.body.find(({ author }) =>
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
                .set({authorization: token})
                .expect(201)

        const response = await api.get('/api/blogs')

        const blg = response.body.find(({ title }) =>
            title === 'Onko gradu kesken?')

        assert(blg.likes === 0)
    }) 

    test('if request has no title return status 400', async () => {
        const tester = {
            author: 'Heidi Suurkaulio',
            url: 'https://www.jyu.fi/fi/blogikirjoitus/onko-gradu-kesken',
            likes: 6
        }

        await
            api.post('/api/blogs')
                .send(tester)
                .set({authorization: token})
                .expect(400)
    })

    test('if request has no url return status 400', async () => {
        const test = {
            title: 'Onko gradu kesken?',
            author: 'Heidi Suurkaulio',
            url: null,
            likes: 6
        }

        await
            api.post('/api/blogs')
                .send(test)
                .set({authorization: token})
                .expect(400)
    })

    test ('if request has no authentication return 401', async () => {
        const testerBlog = {
            title: 'Onko gradu kesken?',
            author: 'Heidi Suurkaulio',
            url: 'https://www.jyu.fi/fi/blogikirjoitus/onko-gradu-kesken',
            likes: 5
        }

        await 
            api.post('/api/blogs')
            .send(testerBlog)
            .expect(401)
    })
})

describe('testing delete method', async () => {
    token = await logIn()

    test('blog can be deleted by id', async () => {
        const resp = await api.get('/api/blogs')
        const originalLength = resp.body.length
        const lastId = resp.body.pop().id
        
        await api
        .delete(`/api/blogs/${lastId}`)
        .set({authorization: token})

        const response = await api.get('/api/blogs')
        assert(originalLength > response.body.length)
    })

    test('if id to be deleted not found returns status 404', async () => {
        await api
        .delete('/api/blogs/60a0ff0c000a0f0ebfc0c0c0')
        .set({authorization: token})
        .expect(404)
    })
})

describe('testing put method', () => {
    test('adding the likes of the last one by 1', async () => {
        const resp = await api.get('/api/blogs')
        const last = resp.body.pop()
        const OriginalId = last.id
        const originalLikes = last.likes

        await api
        .put(`/api/blogs/${OriginalId}`)
        .send({likes: originalLikes + 1})
        .expect(200)

        response = await api.get('/api/blogs')
        // if return by id is not implemented
        const updated = response.body.find(({ id }) =>
            id === OriginalId)

        assert(updated.likes > originalLikes)
    })

    test('put to unknown endpoint returns 404', async () => {
        await api
        .put('/api/blogs/60a0ff0c000a0f0ebfc0c0c0')
        .send({likes: 5})
        .expect(404)
    })

    // still handles empty for some reason...
    test('sending null value with put request return status 400', async () => {
        const resp = await api.get('/api/blogs')
        const last = resp.body.pop()

        await api
        .put(`/api/blogs/${last.id}`)
        .send({likes: null})
        .expect(400)
    })
})

after(async () => {
    await mongo.connection.close()
})