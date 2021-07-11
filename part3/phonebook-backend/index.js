const express = require('express');
const app = express();

let db = require('./db.json');

const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/persons', (req, res) => {
  return res.json(db);
});

app.get('/info', (req, res) => {
  const total = db.length;
  const date = new Date();

  res.send(`
    <p>Phonebook has info for ${total} people.</p>
    <p>${date}</p>
  `);
});

app.delete('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  db = db.filter((person) => person.id !== +id);
  res.sendStatus(204);
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({
      error: 'Name or number is missing.'
    });
  }

  const person = db.find(p => p.name.toLowerCase() === name.toLowerCase());
  if (!person) {
    return res.status(400).json({
      error: 'the name must be unique'
    });
  }

  let id = Math.floor(Math.random() * 100000);
  while (db.some((p) => p.id === id)) {
    id = Math.floor(Math.random() * 100000);
  }

  db.push({ id, name, number });
  res.status(201).json({ id, name, number });
});

app.listen(port, () => {
  console.log(`Server is runnning at http://localhost:${port}`);
});
