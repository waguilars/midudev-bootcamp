import * as blogService from '../services/blogs'
import { showError } from './notificationReducer'

const blogReducer = (state = [], { type, payload }) => {
  switch (type) {
  case '@blog/init':
    return payload

  case '@blog/add':
    return [...state, payload]

  case '@blog/like':
    return state.map((blog) => {
      if (blog.id === payload.id) {
        return payload
      }

      return blog
    })

  case '@blog/delete':
    return state.filter(b => b.id !== payload)

  default:
    return state
  }
}

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll()

  dispatch({
    type: '@blog/init',
    payload: blogs,
  })
}

export const addNewBlog = (blog) => async (dispatch) => {
  try {
    const newBlog = await blogService.createNew(blog)
    delete newBlog.user

    dispatch({
      type: '@notify/success',
      payload: `a new blog ${newBlog.title} by ${newBlog.author}`,
    })

    dispatch({
      type: '@blog/add',
      payload: newBlog,
    })
  } catch (err) {
    const { error } = err.response.data
    dispatch({
      type: '@notify/error',
      payload: error,
    })
  }

  setTimeout(() => {
    dispatch({
      type: '@notify/clear',
    })
  }, 3000)
}

export const likeBlog = (id) => async (dispatch, getState) => {
  try {
    const allBlogs = getState().blog
    const blog = allBlogs.find(b => b.id === id)
    blog.likes +=  1
    await blogService.updateBlog({ id, likes: blog.likes })

    dispatch({
      type: '@blog/like',
      payload: blog
    })
  } catch (error) {
    dispatch(showError(error.message))
  }

}

export const deleteBlog = id => async (dispatch) => {
  try {
    await blogService.deleteBlog(id)
    dispatch({
      type: '@blog/delete',
      payload: id
    })
  } catch (error) {
    console.log(error.message)
  }
}

export default blogReducer
