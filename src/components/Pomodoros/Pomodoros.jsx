import React from 'react';


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
  return (
    <ul style={styles.pomodoros}>
      {children}
    </ul>
  );
};

export default Pomodoros;

