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

  next(error)
}
