const {mongoUrl} = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./controllers/blogs')
const userRouter = require('./controllers/users')

const mongo = require('mongoose')
mongo.set('strictQuery', false)
mongo.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', router)
app.use('/api/users', userRouter)

module.exports = app