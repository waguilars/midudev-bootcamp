import axios from 'axios'

const baseUrl = '/api/login'


const login = credentials => {
  const request = axios.post(baseUrl, credentials)

  return request.then(resp => resp.data)
}


export default {
  login
}