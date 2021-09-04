import axios from 'axios';


const url = 'https://restcountries.eu/rest/v2/name'

export const getCountry = name => {
  return axios.get(`${url}/${name}?fullText=true`)
}
