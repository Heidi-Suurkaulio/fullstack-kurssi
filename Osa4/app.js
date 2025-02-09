const {mongoUrl} = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const middleWare = require('./utils/middleware')

const mongo = require('mongoose')
const loginRouter = require('./controllers/login')
mongo.set('strictQuery', false)
mongo.connect(mongoUrl)

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use('/api/blogs', router)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleWare.unknownEndpoint)
app.use(middleWare.errorHandler)

module.exports = app