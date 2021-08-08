import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import authService from './services/auth';
import * as blogService from './services/blogs';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      const userData = JSON.parse(userStorage);
      setUser(userData);
      blogService.setToken(userData.token)
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const credentials = { username, password };

    authService
      .login(credentials)
      .then((user) => {
        setUser(user);
        const parsedUser = JSON.stringify(user);
        localStorage.setItem('user', parsedUser);
        blogService.setToken(user.token)
        setNotification(null);
      })
      .catch((err) => {
        const { error } = err.response.data;
        setNotification({
          type: 'error',
          message: error,
        });
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('user');
    setUser(null);
  };

  const createBlog = (blog) => {
    blogService
      .createNew(blog)
      .then((resp) => {
        const { user, ...newBlog } = resp;
        delete user.blogs
        setBlogs((blogs) => blogs.concat({user, ...newBlog}));
        setNotification({
          message: `a new blog ${newBlog.title} by ${newBlog.author}`,
        });
      })
      .catch((err) => {
        const { error } = err.response.data;
        setNotification({
          type: 'error',
          message: error,
        });
      })
      .finally(() => {
        setTimeout(() => {
          setNotification(null);
        }, 3000);
      });
  };

  if (!user) {
    return (
      <div>
        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
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
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog">
        <NoteForm createNewBlog={createBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} authUser={user} />
        ))}
    </div>
  );
};

export default App;
