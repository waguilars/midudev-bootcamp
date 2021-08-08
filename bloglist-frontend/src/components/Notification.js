import React from 'react'
import PropTypes from 'prop-types'


const Notification = ({ message, type = 'success' }) => {
  const style = {
    backgroundColor: 'lightgrey',
    color: type === 'success' ? 'green' : 'red',
    border: type === 'success' ? '2px solid green' : '2px solid red',
    padding: 5
  }
  return (
    <div style={style}>
      <h2>{message}</h2>
    </div>
  )
}


Notification.propTypes = {
  message: PropTypes.string.isRequired
}


export default Notification