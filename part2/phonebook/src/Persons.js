import React from 'react'

const Persons = ({persons, filter}) => {
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
          </p>
        ))}
    </div>
  )
}

export default Persons
