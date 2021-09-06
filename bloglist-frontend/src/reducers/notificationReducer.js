const notificationReducer = (state = null, { type, payload }) => {
  switch (type) {
  case '@notify/success':
    return {
      message: payload,
      type: 'success'
    }

  case '@notify/error':
    return {
      message: payload,
      type: 'error'
    }

  case '@notify/clear':
    return null

  default:
    return state
  }

}


export const showSuccess = (message) => async dispatch => {

  dispatch({
    type: '@notify/success',
    payload: message
  })

  setTimeout(() => {
    dispatch(clearNotification())
  }, 3000)
}

export const showError = message => async dispatch => {
  dispatch({
    type: '@notify/error',
    payload: message
  })

  setTimeout(() => {
    dispatch(clearNotification())
  }, 3000)
}

export const clearNotification = () => async dispatch => {
  dispatch({
    type: '@notify/clear'
  })
}

export default notificationReducer