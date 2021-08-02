const bcrypt = require('bcrypt')
const { Router } = require('express')
const User = require('../models/User')

const router = Router()

router.post('/', async (req, res, next) => {
  const { username = '', password = '', name } = req.body

  if (!username.trim() || !password.trim()) {
    return res.status(400).json({
      error: 'username and password must be given'
    })
  }

  if (username.trim().length < 3 || password.trim().length < 3) {
    return res.status(400).json({
      error: 'username and password must be at least 3 characters long'
    })
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      name,
      password: passwordHash
    })

    const savedUser = await user.save()

    return res.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res) => {
  const users = await User.find()
    .populate('blogs', 'url title author')
  res.json(users)
})

module.exports = router
