import React from 'react';


const defaultStyles = {
  pomodoros: {
    position: 'absolute',
    right: '20px',
    marginTop: '2px'
  },
};

const Pomodoros = ({
  children,
  styles={},
}) => {
  return (
    <ul style={
      Object.assign({},
        defaultStyles.pomodoros,
        styles)
    }>
      {children}
    </ul>
  );
};

export default Pomodoros;

