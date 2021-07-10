import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then((resp) => {
      const persons = resp.data;
      setPersons(persons);
    });
  }, []);

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
