import React, { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = { name: newName, number: phoneNumber };

    if (persons.some((p) => p.name === newPerson.name)) {
      alert(`${newPerson.name} is already added to phonebook`);
      return;
    }

    if (newName.trim() === '') {
      return;
    }

    setPersons([...persons, newPerson]);
    setNewName('');
    setPhoneNumber('');
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />

      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        phoneNumber={phoneNumber}
        setNewName={setNewName}
        setPhoneNumber={setPhoneNumber}
      />

      <h2>Numbers</h2>
      <Persons filter={filter} persons={persons} />

    </div>
  );
};

export default App;
