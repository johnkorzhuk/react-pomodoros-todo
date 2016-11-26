import React, { PropTypes } from 'react';
import Pomodoro from './Pomodoro';

const styles = {
  pomodoros: {
    position: 'absolute',
    right: '20px',
  },
  pomodoro: {
    display: 'inline-block',
  },
};

const Pomodoros = ({
  elapsed,
  taskIsActive,
  taskIsComplete,
  pomodoros,
}) => {
  const onePomodoro = 1500000;
  const activePomodoro = Math.trunc(elapsed / onePomodoro);


  const Pomodoros = [];
  for (let i = 0; i < 5; i++) {
    Pomodoros[i] = (
      <li
        style={styles.pomodoro}
        key={i}>
        <Pomodoro
          taskIsComplete={taskIsComplete}
          isComplete={i < activePomodoro}
          isActive={i === activePomodoro && taskIsActive}
          isTarget={i <= pomodoros-1}/>
      </li>
    );
  }

  return (
    <ul style={styles.pomodoros}>
      {Pomodoros}
    </ul>
  );
};

Pomodoros.propTypes = {
  elapsed: PropTypes.number.isRequired,
  taskIsActive: PropTypes.bool.isRequired,
  taskIsComplete: PropTypes.bool.isRequired,
  pomodoros: PropTypes.number.isRequired,
};

export default Pomodoros;

