const mongoose = require('mongoose')

let mongoUrl = process.env.MONGODB_URI || 'mongodb://localhost'

mongoUrl = process.env.NODE_ENV === 'test'
  ? `${mongoUrl}/${process.env.TEST_DB_NAME}`
  : `${mongoUrl}/${process.env.DB_NAME}`

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
