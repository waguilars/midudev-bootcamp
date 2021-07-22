const { request, response } = require('express')

module.exports.notFoundError = (req = request, resp = response, next) => {
  resp.status(404).json({
    error: 'Not found'
  })
}

module.exports.generalError = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  if (error.name === 'ValidationError') {
    const errorNames = Object.keys(error.errors)
    const errorData = error.errors[errorNames[0]]
    return response.status(400).json({
      error: errorData.message
    })
  }

  next(error)
}
