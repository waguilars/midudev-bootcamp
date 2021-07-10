import React from 'react';

const CountryDetail = ({ country }) => {
  const { name, capital, population, languages, flag } = country;

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>

      <h2>languages</h2>
      <ul>
        {languages.map((lang) => (
          <li key={lang.name}> {lang.name} </li>
        ))}
      </ul>

      <img width="150px" src={flag} alt={'Flag image for ' + name} />
    </div>
  );
};

export default CountryDetail;
