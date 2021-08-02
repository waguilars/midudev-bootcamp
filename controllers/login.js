const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const loginRouter = Router()

loginRouter.post('/', async (req, res) => {
  const { body } = req

  const user = await User.findOne({ username: body.username })
  const password = user === null
    ? false
    : await bcrypt.compare(body.password, user.password)

  if (!(user && password)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const payload = { username: user.username, id: user._id }

  const token = jwt.sign(payload, process.env.SECRET)

  res.json({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
