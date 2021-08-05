import axios from 'axios';
const baseUrl = '/api/blogs';

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const createNew = (blog, token) => {
  const headers = { authorization: `Bearer ${token}` };
  const request = axios.post(baseUrl, blog, { headers });
  return request.then((resp) => resp.data);
};