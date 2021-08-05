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

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = { username, password };

    authService.login(credentials).then(user => {
      setUser(user)
      const parsedUser = JSON.stringify(user)
      localStorage.setItem('')
    });
  };

  if (!user) {
    return (
      <div>
        <h2>Log in to Aplication</h2>
        <form onSubmit={handleSubmit}>
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
      <p> {user.name} logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
