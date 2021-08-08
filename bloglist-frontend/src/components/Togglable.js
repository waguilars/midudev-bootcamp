import React, { useState } from 'react';

const Togglable = (props) => {
  const {
    children,
    buttonLabel = 'show',
    cancelButtonLabel = 'hide',
    visibleStatus = false,
  } = props;

  const [visible, setVisible] = useState(visibleStatus);

  const showOnVisible = { display: visible ? '' : 'none' };
  const hideOnVisible = { display: visible ? 'none' : '' };

  const changeVisible = () => setVisible((prev) => !prev);

  return (
    <div>
      <button style={hideOnVisible} onClick={changeVisible}>
        {buttonLabel}
      </button>

      <div style={showOnVisible}>
        {children}
        <button onClick={changeVisible}>{cancelButtonLabel}</button>
      </div>
    </div>
  );
};

export default Togglable;
