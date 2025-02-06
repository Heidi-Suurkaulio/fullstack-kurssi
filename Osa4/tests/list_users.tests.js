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

})

after(async () => {
    await mongo.connection.close()
})