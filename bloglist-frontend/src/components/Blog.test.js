import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'

import Blog from './Blog'

test('should render displaying blog\'s title and author', () => {
  const blog = {
    title: 'Structure based in components',
    author: 'Wilson Aguilar',
    url: 'https://...',
    likes: 24,
    user: {
      username: 'will',
      name: 'Wilson',
      id: '610859a4ededbefa616a658f',
    },
    id: '610859f3bb7707fb27458d41',
  }

  const component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(blog.likes)



})
