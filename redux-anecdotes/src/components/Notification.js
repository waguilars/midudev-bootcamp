
import React from 'react'
import { connect } from 'react-redux'

const Notification = ({notification}) => {
  // const notification = useSelector(state => state.notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return notification.hidden ? null : (
    <div style={style}>
      {notification.message}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    notification: state.notification
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification