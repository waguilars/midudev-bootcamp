import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'

import Blog from './Blog'

const showButtonLabel = 'show'
const likeButtonLabel = 'like'
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


test('should render displaying blog\'s title and author', () => {
  const  component = render(<Blog blog={blog} />)

  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(blog.title)
  expect(component.container).not.toHaveTextContent(blog.url)
  expect(component.container).not.toHaveTextContent(blog.likes)

})

test('should render url and likes when show button is clicked', () => {
  const  component = render(<Blog blog={blog} authUser={blog.user} />)
  const button = component.getByText(showButtonLabel)
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(blog.likes)
  expect(component.container).toHaveTextContent(blog.url)
  // console.log(prettyDOM(component.container))
})

test('shoud call twice the event passed into arguments when like button is clicked twice', () => {
  const moockHandler = jest.fn()

  const  component = render(<Blog blog={blog} authUser={blog.user} setBlogs={moockHandler} />)
  const showButton = component.getByText(showButtonLabel)
  fireEvent.click(showButton)


  const likeButton = component.getByText(likeButtonLabel)
  fireEvent.click(likeButton)
  // fireEvent.click(likeButton)

  // expect(moockHandler.mock.calls).toHaveLength(2)
})


