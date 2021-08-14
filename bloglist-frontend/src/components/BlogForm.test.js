import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import BlogForm from './BlogForm'


test('should call the event handler when new blog is created', () => {
  const newBlogHandler = jest.fn()

  const component = render(<BlogForm createNewBlog={newBlogHandler} />)

  const form = component.container.querySelector('form')
  const title = form.querySelector('#title')
  const author = form.querySelector('#author')
  const url = form.querySelector('#url')

  const blog = {
    title: 'Testing with react testing library',
    author: 'unknown',
    url: 'https://...'
  }

  fireEvent.change(title, { target: { value: blog.title } })
  fireEvent.change(author, { target: { value: blog.author } })
  fireEvent.change(url, { target: { value: blog.url } })

  fireEvent.submit(form)

  expect(newBlogHandler.mock.calls).toHaveLength(1)
  expect(newBlogHandler.mock.calls[0][0]).toMatchObject(blog)
})
