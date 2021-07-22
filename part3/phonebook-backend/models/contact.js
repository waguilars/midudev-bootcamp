const uniqueValidator = require('mongoose-unique-validator')
const { Schema, SchemaTypes, model } = require('mongoose')

const ContactSchema = Schema({
  name: {
    type: SchemaTypes.String,
    unique: true,
    minLength: [3, 'the name must have at least three characters long.']
  },
  number: {
    type: SchemaTypes.String,
    minLength: [8, 'The number must have at least 8 digits']
  }
}, { versionKey: false, timestamps: true })

ContactSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    const { _id, ...obj } = returnedObj
    obj.id = _id
    return obj
  }
})

ContactSchema.plugin(uniqueValidator, { message: '{VALUE} is already in the phonebook' })

module.exports = model('Contact', ContactSchema)
