const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(resp => {
    console.log('MongoDB connected.')
  })
  .catch(err => {
    console.log('Error connecting to mongodb', err.message)
  })
