import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/authReducer'


const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (e) => {
    e.preventDefault()
    const credentials = { username, password }

    dispatch(login(credentials))
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
