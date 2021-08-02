require('dotenv').config()

const express = require('express')
const cors = require('cors')

const usersRouter = require('./controllers/users')
const { serverError } = require('./middlewares/errorHandler')
const { error404 } = require('./middlewares/error404')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./middlewares/tokenExtractor')

const app = express()
require('./config/db')

app.use(cors())
app.use(express.json())

app.use(tokenExtractor)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(error404)

app.use(serverError)

module.exports = app
