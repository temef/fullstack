import { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };

  const toggleVisibility = () => {
    setVisible((prev) => !prev);
  };

  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { visible, setVisible });
    }
    return child;
  });

  return (
    <div>
      {visible ? (
        <div className="togglableContent">
          {childrenWithProps}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      ) : (
        <div>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      )}
    </div>
  );
});

export default Togglable;
