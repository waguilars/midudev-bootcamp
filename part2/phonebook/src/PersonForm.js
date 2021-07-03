import React from 'react';

const PersonForm = ({
  setNewName,
  setPhoneNumber,
  newName,
  phoneNumber,
  handleSubmit,
}) => {
  const handleInputName = (e) => setNewName(e.target.value);
  const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input onChange={handleInputName} value={newName} />
      </div>
      <div>
        number: <input onChange={handlePhoneNumber} value={phoneNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
