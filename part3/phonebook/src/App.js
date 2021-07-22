import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import Notification from './Notification';
import PersonForm from './PersonForm';
import Persons from './Persons';
import * as PersonsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [hideNotification, setHideNotification] = useState(true);
  const [notificationType, setNotificationType] = useState('success');

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
        PersonsService.updatePerson({ id, ...newPerson })
          .then((data) => {
            const message = `${data.name}'s number updated.`;
            sendNotification(message, 'success');
            setPersons((prev) => prev.map((p) => (p.id === id ? data : p)));
          })
          .catch(err => {
            // const message = `Information of ${name} has been removed from server.`;
            const message = err.response.data.error
            sendNotification(message, 'error');
          });
        setNewName('');
        setPhoneNumber('');
      }
      return;
    }

    if (newName.trim() === '') {
      return;
    }

    PersonsService.createNewPerson(newPerson)
      .then((data) => {
        const message = `${data.name}'s number added.`;
        sendNotification(message, 'success');
        setPersons((prev) => [...prev, data]);
      })
      .catch(err => {
        const msg = err.response.data.error
        sendNotification(msg, 'error')
      });

    setNewName('');
    setPhoneNumber('');
  };

  const sendNotification = (message, type) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setHideNotification(false);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notificationMessage}
        hidden={hideNotification}
        type={notificationType}
      />
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
