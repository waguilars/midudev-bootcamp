const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  password: {
    type: String
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }]
}, { versionKey: false })

UserSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id
    delete obj._id
    delete obj.password
    return obj
  }
})

UserSchema.plugin(uniqueValidator)

const User = mongoose.model('User', UserSchema)

module.exports = User
