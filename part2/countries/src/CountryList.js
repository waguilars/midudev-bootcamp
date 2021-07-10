import React, { useState } from 'react';
import CountryDetail from './CountryDetail';

const CountryList = ({ countries }) => {
  const [hidden, setHidden] = useState(Array.from(countries).fill(false));

  const showCountryDetail = (idx) => {
    const hiddeElement = [...hidden];
    hiddeElement[idx] = !hiddeElement[idx];
    setHidden(hiddeElement);
  };

  return (
    <ul>
      {countries.map((country, idx) => (
        <li key={country.name}>
          {country.name}
          <button onClick={() => showCountryDetail(idx)}>show</button>
          {hidden[idx] && <CountryDetail country={country} />}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
