const {mongoUrl} = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./controllers/blogs')

const mongo = require('mongoose')
mongo.set('strictQuery', false)
mongo.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', router)

module.exports = app