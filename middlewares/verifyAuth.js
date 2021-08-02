const jwt = require('jsonwebtoken')

const { request, response } = require('express')

const verifyAuth = async (req = request, res = response, next) => {
  try {
    const token = req.token

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    req.user = decodedToken.id
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = verifyAuth
