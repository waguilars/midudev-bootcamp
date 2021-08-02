const bcrypt = require('bcrypt')
const supertest = require('supertest')

const User = require('../models/User')
const app = require('../app')

const api = supertest(app)

beforeAll(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', password: passwordHash })
  await user.save()
})

describe('[GET] /api/users', () => {
  it('Must return a list with the users', async () => {
    await api.get('/api/users')
      .expect(200)
  })
})

describe('[POST] /api/users', () => {
  it('Must create a new user', async () => {
    const usersBefore = await User.find()
    const newUser = { username: 'Will', password: 'will-password', name: 'Wilson' }
    const result = await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await User.find()
    expect(result.body).not.toHaveProperty('password')
    expect(usersAfter).toHaveLength(usersBefore.length + 1)
  })

  it('Both username and password must be given', async () => {
    const newUser = { name: 'Wilson' }
    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toHaveProperty('error')
    expect(result.body.error).toContain('username and password must be given')
  })

  it('Both username and password must be at least 3 characters long', async () => {
    const newUser = { username: 'wi', password: 'gg', name: 'Wilson' }
    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body).toHaveProperty('error')
    expect(result.body.error).toContain('username and password must be at least 3 characters long')
  })

  it('The username must be unique', async () => {
    const user = { username: 'root', name: 'superadmin', password: 'secret' }
    const result = await api.post('/api/users')
      .send(user)
      .expect(409)
      .expect('Content-Type', /application\/json/)
    expect(result.body).toHaveProperty('error')
    expect(result.body.error).toContain('validation failed')
  })
})
