import { useEffect, useState } from 'react';
import { getCountry } from '../services/country';

const useCountry = (name) => {
  const [country, setCountry] = useState('');

  useEffect(() => {
    getCountry(name)
      .then((resp) => {
        setCountry({
          found: true,
          ...resp.data[0]
        });
      })
      .catch((err) => setCountry({
        found: false
      }));
  }, [name]);

  return country;
};

export default useCountry;
