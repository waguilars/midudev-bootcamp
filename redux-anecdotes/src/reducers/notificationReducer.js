const initialState = {
  message: "render here notification...",
  hidden: true,
}

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case '@NOTIFICATION/SET_MESSAGE':
      return { message: payload, hidden: false }

    case '@NOTIFICATION/REMOVE_MESSAGE':
      return initialState

    default:
      return state
  }
}

export const showNotification = (message) => {
  return {
    type: '@NOTIFICATION/SET_MESSAGE',
    payload: message
  }
}

export const hideNotification = () => {
  return {
    type: '@NOTIFICATION/REMOVE_MESSAGE',
    payload: null
  }
}


export default notificationReducer;