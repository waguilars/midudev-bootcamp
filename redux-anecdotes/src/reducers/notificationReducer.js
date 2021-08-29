const initialState = {
  message: "render here notification...",
  hidden: true
}

let timeout

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case '@NOTIFICATION/SET_MESSAGE':
      return payload

    case '@NOTIFICATION/CLEAR':
      return initialState;

    default:
      return state
  }
}

export const showNotification = (message, time) => {
  const seconds = time * 1000;
  return async dispatch => {
    timeout
      && clearTimeout(timeout)

    dispatch({
      type: '@NOTIFICATION/SET_MESSAGE',
      payload: { message, hidden: false }
    })

    timeout = setTimeout(() => dispatch({
      type: '@NOTIFICATION/CLEAR',
    }), seconds)
  }
}

export default notificationReducer;