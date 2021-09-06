import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'
import authReducer from './reducers/authReducer'

const mainReducer = combineReducers({
  blog: blogReducer,
  notification: notificationReducer,
  user: authReducer
})

const store = createStore(mainReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store
