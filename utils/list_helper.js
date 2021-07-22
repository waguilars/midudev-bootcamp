const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const likes = blogs.map(blog => blog.likes)
  const totalLikes = likes.reduce((total, likes) => total + likes, 0)
  return totalLikes
}

const favoriteBlog = blogs => {
  const blogLikes = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...blogLikes)
  const mostVotedBlog = blogs.find(blog => blog.likes === maxLikes)
  const { author, likes, title } = mostVotedBlog
  return { author, likes, title }
}

const mostBlogs = blogs => {
  const authors = [...new Set(blogs.map(blog => blog.author))]

  const authorBlogs = authors.map(author => {
    const totalBlogs = blogs.filter(blog => blog.author === author).length
    return {
      author,
      blogs: totalBlogs
    }
  })

  const maxBlogs = Math.max(...authorBlogs.map(item => item.blogs))

  return authorBlogs.find(item => item.blogs === maxBlogs)
}

const mostLikes = blogs => {
  const authors = [...new Set(blogs.map(blog => blog.author))]

  const authorLikes = authors.map(author => {
    const authorBlogs = blogs.filter(blog => blog.author === author)
    const likes = authorBlogs.map(blog => blog.likes)
      .reduce((total, like) => total + like, 0)

    return {
      author,
      likes
    }
  })

  const maxLikes = Math.max(...authorLikes.map(author => author.likes))

  return authorLikes.find(author => author.likes === maxLikes)
}

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  blogs,
  listWithOneBlog,
  mostBlogs,
  mostLikes
}
