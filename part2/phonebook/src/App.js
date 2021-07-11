import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import * as PersonsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    PersonsService.getAllPersons().then((persons) => setPersons(persons));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPerson = { name: newName, number: phoneNumber };

    if (persons.some((p) => p.name === newPerson.name)) {
      const confirm = window.confirm(
        `${newPerson.name} is already added to phonebook, replace de old number with the new one.`
      );

      if (confirm) {
        const { id } = persons.find((p) => p.name === newPerson.name);
        PersonsService.updatePerson({ id, ...newPerson }).then((data) =>
          setPersons((prev) => prev.map((p) => (p.id === id ? data : p)))
        );
      }
      return;
    }

    if (newName.trim() === '') {
      return;
    }

    PersonsService.createNewPerson(newPerson).then((data) =>
      setPersons((prev) => [...prev, data])
    );

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
      <Persons filter={filter} persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
