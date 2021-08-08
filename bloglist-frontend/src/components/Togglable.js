import React, { useState } from 'react';

const Togglable = (props) => {
  const { children, buttonLabel = 'show' } = props;

  const [visible, setVisible] = useState(false);

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
        <button onClick={changeVisible}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;
