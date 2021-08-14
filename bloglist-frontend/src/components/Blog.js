import React, { useState } from 'react'
import * as blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, authUser }) => {
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
    const { likes, id } = blog
    blogService.updateBlog({ id, likes: likes + 1 })
      .then(() => {
        setBlogs((blogs) => {
          const blogToUpdate = blogs.find((blog) => blog.id === id)
          blogToUpdate.likes = likes + 1
          return [...blogs]
        })
      })
      .catch(e => console.error(e.message))
  }

  const removeBlog = () => {
    const canRemove = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`
    )
    if (canRemove) {
      blogService.deleteBlog(blog.id).then(() => {
        setBlogs((blogs) => blogs.filter((b) => b.id !== blog.id))
      })
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
