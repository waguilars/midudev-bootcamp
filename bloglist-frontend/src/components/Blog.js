import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog, authUser }) => {
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const removeButtonStyle = {
    backgroundColor: '#547EF5',
    borderRadius: '5px',
  }

  const [fullView, setFullView] = useState(false)

  const makeLike = () => {
    const { id } = blog
    dispatch(likeBlog(id))
  }

  const removeBlog = () => {
    const canRemove = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (canRemove) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setFullView((prev) => !prev)}>
          {fullView ? 'hide' : 'show'}
        </button>
      </div>
      {fullView && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={makeLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {authUser.username === blog.user.username && (
            <button style={removeButtonStyle} onClick={removeBlog}>
              remove
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default Blog
