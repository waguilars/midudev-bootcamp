import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [fullView, setFullView] = useState(false);

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
            <button>like</button>
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
