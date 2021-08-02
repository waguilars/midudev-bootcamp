const { Router } = require('express')
const verifyAuth = require('../middlewares/verifyAuth')

const Blog = require('../models/Blog')
const User = require('../models/User')

const blogRouter = Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', 'name username')
  response.json(blogs)
})

blogRouter.post('/', verifyAuth, async (request, response) => {
  const { likes = 0, title, url } = request.body
  if (!title || !url) return response.status(400).send()

  const userID = request.user
  const authUser = await User.findById(userID)

  const blog = new Blog({ ...request.body, likes, user: userID })
  blog.user = authUser
  const result = await blog.save()

  authUser.blogs = authUser.blogs.concat(result._id)
  await authUser.save()

  response.status(201).json(result)
})

blogRouter.delete('/:id', verifyAuth, async (req, res) => {
  const { id } = req.params
  const userID = req.user

  const blog = await Blog.findById(id)

  if (!blog) {
    return res.status(404).json({
      error: 'The blog does not exists.'
    })
  }

  if (userID !== blog.user.toString()) {
    return res.status(401).json({
      error: 'You not have permission to delete this blog.'
    })
  }
  await blog.delete()

  res.status(204).send()
})

blogRouter.put('/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req

  await Blog.findByIdAndUpdate(id, body)
  res.status(204).send()
})

module.exports = blogRouter
