import * as blogService from '../services/blogs'
import authService from '../services/auth'
import { showError } from './notificationReducer'

const authReducer = (state = null, { type, payload }) => {
  switch (type) {
  case '@auth/login':
    return payload

  case '@auth/logout':
    return null

  case '@auth/retrieve':
    return payload

  default:
    return state
  }
}

export const login = (credentials) => async (dispatch) => {
  try {
    const user = await authService.login(credentials)

    const parsedUser = JSON.stringify(user)
    localStorage.setItem('user', parsedUser)
    blogService.setToken(user.token)

    dispatch({
      type: '@auth/login',
      payload: user,
    })
  } catch (error) {
    showError(error.message)
  }
}

export const removeAuth = () => {
  localStorage.removeItem('user')
  return {
    type: '@auth/logout',
  }
}

export const retrieveSession = () => {

  const dataStorage = localStorage.getItem('user')
  const authUser = dataStorage ? JSON.parse(dataStorage) : null

  if (authUser) {
    blogService.setToken(authUser)
  }

  return {
    type: '@auth/retrieve',
    payload: authUser
  }
}

export default authReducer

