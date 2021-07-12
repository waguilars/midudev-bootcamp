import React from 'react';

const Notification = ({ message, type = 'success', hidden }) => {
  const style = {
    backgroundColor: 'lightgrey',
    color: type === 'success' ? 'green' : 'red',
    border: type === 'success' ? '2px solid green' : '2px solid red',
    padding: 5
  };
  return hidden ? null : (
    <div style={style}>
      <h2>{message}</h2>
    </div>
  );
};

export default Notification;
