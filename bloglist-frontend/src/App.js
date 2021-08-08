import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import authService from './services/auth';
import * as blogService from './services/blogs';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const initialBlogForm = {
  title: '',
  author: '',
  url: '',
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [blog, setBlog] = useState(initialBlogForm);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage) {
      const userData = JSON.parse(userStorage);
      setUser(userData);
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

  const handleBlogInput = (e) => {
    const { value, name } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewNote = (e) => {
    e.preventDefault();
    blogService.createNew(blog, user.token).then((resp) => {
      const { user, ...newBlog } = resp;
      setBlog(initialBlogForm);
      setBlogs((blogs) => blogs.concat(newBlog));
      setNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author}`
      })
      setTimeout(() => {
        setNotification(null)
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
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}
      <h2>blogs</h2>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable>
        <h2>create new</h2>
        <form onSubmit={handleNewNote}>
        <div>
          <label>title</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleBlogInput}
          />
        </div>
        <div>
          <label>author</label>
          <input
            type="text"
            name="author"
            value={blog.author}
            onChange={handleBlogInput}
          />
        </div>
        <div>
          <label>url</label>
          <input
            type="text"
            name="url"
            value={blog.url}
            onChange={handleBlogInput}
          />
        </div>
        <button>create</button>
      </form>
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
