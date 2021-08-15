import React, { useState } from 'react'

const initialBlogForm = {
  title: '',
  author: '',
  url: '',
}

const BlogForm = (props) => {
  const { createNewBlog } = props

  const [blog, setBlog] = useState(initialBlogForm)

  const handleBlogInput = (e) => {
    const { value, name } = e.target
    setBlog((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const addNewBlog = (e) => {
    e.preventDefault()
    createNewBlog(blog)

    setBlog(initialBlogForm)
  }

  return (
    <div>
      <h2>create new</h2>
      <form id="note-form" onSubmit={addNewBlog}>
        <div>
          <label>title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={blog.title}
            onChange={handleBlogInput}
          />
        </div>
        <div>
          <label>author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={blog.author}
            onChange={handleBlogInput}
          />
        </div>
        <div>
          <label>url</label>
          <input
            type="text"
            id="url"
            name="url"
            value={blog.url}
            onChange={handleBlogInput}
          />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default BlogForm
