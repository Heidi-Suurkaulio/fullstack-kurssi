const { test, after, beforeEach, describe, before } = require('node:test')

const mongo = require('mongoose')
const User = require('../models/user')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')

const api = supertest(app)

before(async () => {
    await User.deleteMany({})
})

describe('testing post method', () => {
    test('a valid user can be added', async () => {
        const newUser = {
            name: "Mr Steelgrave",
            username: "mrsteelgrave",
            password: "admin123"
        }

        await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    })

    test('user with empty username return 400', async () => {
        await api
        .post('/api/users')
        .send({name: 'No One', username: '', password: 'password'})
        .expect(400)
    })

    test('user with empty password return 400', async () => {
        await api
        .post('/api/users')
        .send({name: 'No One', username: 'none'})
        .expect(400)
    })

    test('if username is reserved return 400', async () => {
        const duplicate = {
            name: "Mr Steelgrave",
            username: "mrsteelgrave",
            password: "admin123"
        }

        await api
        .post('/api/users')
        .send(duplicate)
        .expect(400)
    })
})

after(async () => {
    await mongo.connection.close()
})