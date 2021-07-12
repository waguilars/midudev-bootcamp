import React from 'react';
import * as PersonService from './services/persons'

const Persons = ({ persons, filter, setPersons }) => {

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    const confirm = window.confirm(`Delete ${person.name}`)
    if (confirm) {
      PersonService.deletePerson(id)
        .then(() => {
          setPersons(prev => prev.filter(p => p.id !== id))
        })
    }
  };

  return (
    <div>
      {persons
        .filter((p) => {
          if (filter) {
            return p.name.toLowerCase().includes(filter.toLowerCase());
          }
          return true;
        })
        .map((p) => (
          <p key={p.name}>
            {p.name} - {p.number}
            <button onClick={() => handleDelete(p.id)}>delete</button>
          </p>
        ))}
    </div>
  );
};

export default Persons;
