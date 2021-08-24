const initialState = "render here notification..."

const notificationReducer = (state = initialState, { type, payload }) => {
  switch (type) {

    case '@notification/message':
      return { ...state, ...payload }

    default:
      return state
  }
}


export default notificationReducer;