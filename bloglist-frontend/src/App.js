import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import authService from './services/auth';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect( () => {
    const userStorage = localStorage.getItem('user')
    if (userStorage) {
      const userData = JSON.parse(userStorage)
      setUser(userData)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = { username, password };

    authService.login(credentials).then(user => {
      setUser(user)
      const parsedUser = JSON.stringify(user)
      localStorage.setItem('user',parsedUser)
    });
  };

  const handleLogout = e => {
    e.preventDefault()
    localStorage.removeItem('user')
    setUser(null)
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to Aplication</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button>login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
