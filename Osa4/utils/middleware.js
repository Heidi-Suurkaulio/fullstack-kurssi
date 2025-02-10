const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
    if (error.name === 'passwordError') {
        return response.status(400).send({ error: 'weak password' })
    }
    if (error.name === 'notFoundError') {
        return response.status(404).send({ error: 'resource not found' })
    }
    if (error.name === 'unauthorizedError') {
        return response.status(401).send({ error: 'invalid username or password' })
    }
    if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
    }
    if (error.name === 'JsonWebTokenError') {
        return response.status(400).json({ error: 'token missing or invalid' })
    }
    next(error)
}

module.exports = {
    tokenExtractor,
    unknownEndpoint,
    errorHandler
}