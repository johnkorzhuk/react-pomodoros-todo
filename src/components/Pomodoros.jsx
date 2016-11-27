import React, { PropTypes } from 'react';
import Pomodoro from './Pomodoro';


const styles = {
  pomodoros: {
    position: 'absolute',
    right: '20px',
    marginTop: '2px'
  },
  pomodoro: {
    display: 'inline-block',
  },
};

const Pomodoros = ({
  completedPomodoros,
  pomodoros,
  taskIsActive,
  taskIsComplete,
}) => {
  const Pomodoros = [];
  for (let i = 0; i < 5; i++) {
    Pomodoros[i] = (
      <li
        style={styles.pomodoro}
        key={i}>
        <Pomodoro
          taskIsComplete={taskIsComplete}
          isComplete={i < completedPomodoros}
          isActive={i === completedPomodoros && taskIsActive}
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
  completedPomodoros: PropTypes.number.isRequired,
  pomodoros: PropTypes.number.isRequired,
  taskIsActive: PropTypes.bool.isRequired,
  taskIsComplete: PropTypes.bool.isRequired,
};

export default Pomodoros;

