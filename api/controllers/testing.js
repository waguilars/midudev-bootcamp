const { Router } = require('express')

const Blog = require('../models/Blog')
const User = require('../models/User')

const router = Router()

router.post('/reset', async (req, res) => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  res.status(204).end()
})

module.exports = router
