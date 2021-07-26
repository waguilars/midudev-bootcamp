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
module.exports = app
