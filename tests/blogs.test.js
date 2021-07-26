const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/Blog')
const { blogs } = require('../utils/list_helper')

const api = supertest(app)

const initialPosts = blogs
// .map(
// ({ title, author, url, likes }) => ({ title, author, url, likes })
// )

beforeEach(async () => {
  await Blog.deleteMany({})
  for (const post of initialPosts) {
    const postObj = new Blog(post)
    await postObj.save()
  }
})

describe('The route /api/blogs', () => {
  it('a [GET] request must returns the correct amount of blog posts in the JSON format.', async () => {
    const content = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(content.body).toHaveLength(initialPosts.length)

    // expect(content.body).toContainEqual(initialPosts[1])
  })

  it('unique identifier property of the blog posts is named id', async () => {
    const content = await api.get('/api/blogs')

    expect(content.body[0].id).toBeDefined()
  })

  it('an HTTP POST must creates a new blog post', async () => {
    const newPost = {
      title: 'Structure based in components',
      author: 'Wilson Aguilar',
      url: 'https://...',
      likes: 0
    }

    await api.post('/api/blogs')
      .send(newPost)
      .expect(201)
    const content = await api.get('/api/blogs')

    expect(content.body).toHaveLength(initialPosts.length + 1)
    expect(content.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining(newPost)
      ])
    )
  })

  it('if the likes property is missing from the request, it will default to the value 0.', async () => {
    const newPost = {
      title: 'Structure based in components',
      author: 'Wilson Aguilar',
      url: 'https'
    }

    const response = await api.post('/api/blogs')
      .send(newPost)
      .expect(201)

    expect(response.body.likes).toBeDefined()
    expect(response.body.likes).toBe(0)
  })

  it('if the title and url properties are missing, the server responds with 400', async () => {
    const post = {
      author: 'Wilson Aguilar',
      likes: 0
    }

    await api.post('/api/blogs')
      .send(post)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
