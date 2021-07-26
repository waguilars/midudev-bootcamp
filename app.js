require('dotenv').config()

const express = require('express')
const cors = require('cors')

const Blog = require('./models/Blog')

const app = express()
require('./config/db')

app.use(cors())
app.use(express.json())

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

app.post('/api/blogs', async (request, response) => {
  const { likes = 0, title, url } = request.body
  if (!title || !url) return response.status(400).send()

  const blog = new Blog({ ...request.body, likes })

  const result = await blog.save()
  response.status(201).json(result)
})

app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params
  await Blog.findByIdAndDelete(id)
  res.status(204).send()
})

app.put('/api/blogs/:id', async (req, res) => {
  const { id } = req.params
  const { body } = req

  await Blog.findByIdAndUpdate(id, body)
  res.status(204).send()
})

module.exports = app
