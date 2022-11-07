const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    } else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
          error: 'token expired'
        })
    }
    next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.header('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const token = request.token
  if (token) {
    try {
  const decodedToken = jwt.verify(token, process.env.SECRET)
  request.user = await User.findById(decodedToken.id)
    } catch(exception) {
      next(exception)
    }
  }
  next()
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}