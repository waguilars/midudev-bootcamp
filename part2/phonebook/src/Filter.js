import React from 'react';

const Filter = ({ setFilter, filter = '' }) => {
  const handleFilter = (e) => setFilter(e.target.value);

  return (
    <div>
      <p>
        Filter shown with <input onChange={handleFilter} value={filter} />{' '}
      </p>
    </div>
  );
};

export default Filter;
