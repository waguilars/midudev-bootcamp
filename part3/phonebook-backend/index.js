require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

require('./db')
const Contact = require('./models/contact')

const app = express()

const db = require('./db.json')

const port = process.env.PORT || 3001

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(cors())

app.get('/api/persons', (req, res) => {
  Contact.find({})
    .then(resp => {
      res.json(resp)
    })
})

app.get('/info', (req, res) => {
  const total = db.length
  const date = new Date()

  res.send(`
    <p>Phonebook has info for ${total} people.</p>
    <p>${date}</p>
  `)
})

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params

  Contact.findByIdAndRemove(id)
    .then(() => {
      res.sendStatus(204)
    })
})

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({
      error: 'Name or number is missing.'
    })
  }

  const contact = new Contact({ name, number })
  contact.save()
    .then(resp => {
      res.status(201).json(resp)
    })
})

app.listen(port, () => {
  console.log(`🔥 Server is runnning at http://localhost:${port}`)
})
