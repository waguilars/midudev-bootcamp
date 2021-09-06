import React, { useEffect } from 'react'
import Blog from './components/Blog'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { addNewBlog, initializeBlogs } from './reducers/blogReducer'
import LoginForm from './components/LoginForm'
import { removeAuth, retrieveSession } from './reducers/authReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blog)
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(retrieveSession())
  }, [])


  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(removeAuth())

  }

  const createBlog = (blog) => {
    dispatch(addNewBlog(blog))
  }

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
        <LoginForm />
      </div>
    )
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
        <BlogForm createNewBlog={createBlog} />
      </Togglable>

      <div data-test-id="blogs-list">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} authUser={user} />
          ))}
      </div>
    </div>
  )
}

export default App
