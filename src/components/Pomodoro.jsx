import React, { PropTypes } from 'react';

const styles = {
  pomodoro: {
    display: 'inline-block',
  },
};

const Pomodoro = ({
  children
}) => {
  return (
    <li style={styles.pomodoro}>
      {children}
    </li>
  );
};

Pomodoro.propTypes = {
  children: PropTypes.shape(
    PropTypes.func.isRequired
  ).isRequired,
};

export default Pomodoro;