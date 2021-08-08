import React, { useState } from 'react';
import * as blogService from '../services/blogs'

const Blog = ({ blog, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [fullView, setFullView] = useState(false);

  const makeLike = () => {
    const { likes, id } = blog
    blogService.updateBlog( {id, likes: likes + 1} )
      .then(resp => {
        setBlogs(blogs => {
          const blogToUpdate = blogs.find(blog => blog.id === id )
          blogToUpdate.likes = likes + 1
          return [...blogs]
        })
      })
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
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
          <div>
            {blog.author}
          </div>
        </>
      )}
    </div>
  );
};

export default Blog;
