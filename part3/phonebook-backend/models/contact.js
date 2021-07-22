const { Schema, SchemaTypes, model } = require('mongoose')

const ContactSchema = Schema({
  name: SchemaTypes.String,
  number: SchemaTypes.String
}, { versionKey: false, timestamps: true })

ContactSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    const { _id, ...obj } = returnedObj
    obj.id = _id
    return obj
  }
})

module.exports = model('Contact', ContactSchema)
