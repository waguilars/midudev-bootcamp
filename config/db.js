const mongoose = require('mongoose')

const mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost/bloglist'

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(db => {
    console.log('DB is ready!')
  })
  .catch(() => {
    console.log('Cannot connect with the database.')
  })
