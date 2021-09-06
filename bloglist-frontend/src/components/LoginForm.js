import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import authService from '../services/auth'
import * as blogService from '../services/blogs'
import { showError } from '../reducers/notificationReducer'

const LoginForm = ({ setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    const credentials = { username, password }

    authService
      .login(credentials)
      .then((user) => {
        setUser(user)
        const parsedUser = JSON.stringify(user)
        localStorage.setItem('user', parsedUser)
        blogService.setToken(user.token)
      })
      .catch((err) => {
        const { error } = err.response.data
        dispatch(showError(error))
      })
  }


  return (
    <form id="login-form" onSubmit={handleLogin}>
      <div>
        <label>username</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button>login</button>
    </form>
  )
}

export default LoginForm
