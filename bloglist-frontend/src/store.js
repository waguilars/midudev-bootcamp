import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import blogReducer from './reducers/blogReducer'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/notificationReducer'

const mainReducer = combineReducers({
  blog: blogReducer,
  notification: notificationReducer
})

const store = createStore(mainReducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store
