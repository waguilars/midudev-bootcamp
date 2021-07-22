require('dotenv').config()

const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

require('./db')
const Contact = require('./models/contact')

const app = express()

const { notFoundError, generalError } = require('./middlewares/errorHandler')

const port = process.env.PORT || 3001

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.use(cors())

app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/api/persons', (req, res, next) => {
  Contact.find({})
    .then((resp) => {
      res.json(resp)
    })
    .catch(next)
})

app.get('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  Contact.findById(id)
    .then((person) => {
      res.json(person)
    })
    .catch(next)
})

app.get('/api/info', (req, res, next) => {
  const date = new Date()
  Contact.countDocuments({}).then((total) => {
    res.send(`
      <p>Phonebook has info for ${total} people.</p>
      <p>${date}</p>
    `)
  })
    .catch(next)
})

app.delete('/api/persons/:id', (req, res, next) => {
  const { id } = req.params

  Contact.findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(204)
    })
    .catch(next)
})

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({
      error: 'Name or number is missing.'
    })
  }

  const contact = new Contact({ name, number })
  contact
    .save()
    .then((resp) => {
      res.status(201).json(resp)
    })
    .catch((err) => {
      next(err)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const { id } = req.params
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({
      error: 'Name or number is missing.'
    })
  }

  Contact.findByIdAndUpdate(id, { number }, { new: true, runValidators: true, context: 'query' })
    .then((resp) => res.json(resp))
    .catch(next)
})

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.use(notFoundError)
app.use(generalError)

app.listen(port, () => {
  console.log(`🔥 Server is runnning at http://localhost:${port}`)
})
