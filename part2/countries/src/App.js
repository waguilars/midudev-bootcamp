import React, { useEffect, useState } from 'react';

import axios from 'axios';
import CountryDetail from './CountryDetail';
import CountryList from './CountryList';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      const data = response.data;
      setCountries(data);
    });
  }, []);

  const searchCountries = (countryName) => {
    if (countryName.trim() === '') {
      return;
    }

    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(countryName.toLowerCase())
    );
    setSearchedCountries(filteredCountries);
  };

  const component =
    searchedCountries.length > 1 ? (
      <CountryList countries={searchedCountries} />
    ) : searchedCountries.length === 1 ? (
      <CountryDetail country={searchedCountries[0]} />
    ) : null;

  return (
    <>
      <label>Find countries: </label>
      <input type="text" onChange={(e) => searchCountries(e.target.value)} />

      {searchedCountries.length > 10 ? (
        <p>Too many matches, specify another filter.</p>
      ) : (
        component
      )}
    </>
  );
}

export default App;
