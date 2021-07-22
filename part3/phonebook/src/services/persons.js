import axios from 'axios';

const url = 'http://localhost:3001/api/persons';

export const createNewPerson = ({ name, number }) => {
  return axios.post(url, { name, number })
    .then((resp) => {
      return resp.data;
    })
};

export const getAllPersons = () => {
  return axios.get(url).then((resp) => {
    const persons = resp.data;
    return persons;
  });
};

export const deletePerson = (id) => {
  return axios.delete(`${url}/${id}`).then((resp) => resp.data);
};

export const updatePerson = ({ id, name, number }) => {
  return axios
    .put(`${url}/${id}`, { name, number })
    .then((resp) => resp.data);
};
