/// <reference types="jest" />

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  it('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  it('when list has only one blog, equals the likes of that', () => {
    const listWithOneBlog = listHelper.listWithOneBlog
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})

describe('favorite blog', () => {
  it('of a list is the first one with more likes', () => {
    const mostVotedBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    const blogs = listHelper.blogs
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(mostVotedBlog)
  })
})

describe('The most author', () => {
  it('is who has the largest amount of blogs', () => {
    const blogs = listHelper.blogs
    const mostAuthor = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(mostAuthor)
  })
})

describe('The author with most likes', () => {
  it('is who have the max number of likes', () => {
    const blogs = listHelper.blogs
    const mostAuthor = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(mostAuthor)
  })
})
