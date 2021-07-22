const mongoose = require('mongoose');

const mongourl = 'mongodb://127.0.0.1:27017/phonebook';

const args = process.argv.slice(2);



const [password, name, phone] = args;

mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const schema = mongoose.Schema({
  name: String,
  number: String,
}, { versionKey: false });

const Contact = mongoose.model('contact', schema);

if (args.length === 0) {
  Contact.find()
    .then(resp => {
      console.log('phonebook:')
      resp.forEach(({name, number}) => {
        console.log(`${name}\t${number}`);
      })
      mongoose.connection.close()
    })
} else {
  const myContact = new Contact({
    name,
    number: phone,
  });
  
  myContact.save()
    .then(({name, number}) => {
      console.log(`added ${name} number ${number} to phonebook`)
      mongoose.connection.close()
    })
}

