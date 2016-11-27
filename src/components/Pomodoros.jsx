import React, { PropTypes } from 'react';


const styles = {
  pomodoros: {
    position: 'absolute',
    right: '20px',
    marginTop: '2px'
  },
};

const Pomodoros = ({
  children
}) => {
  console.log(children);
  return (
    <ul style={styles.pomodoros}>
      {children}
    </ul>
  );
};

Pomodoros.propTypes = {
  children: PropTypes.shape(
    PropTypes.func.isRequired
  ).isRequired,
};

export default Pomodoros;

