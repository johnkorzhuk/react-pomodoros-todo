import React, { PropTypes } from 'react';
import Pomodoro from './Pomodoro';
import CreatePomodoros from './CreatePomodoros';

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
  taskIsActive,
  taskIsComplete,
  pomodoros,
}) => {
  return (
    <ul style={styles.pomodoros}>
      <CreatePomodoros amount={5}>
        {(index) =>
          <Pomodoro
            key={index}
            taskIsComplete={taskIsComplete}
            isComplete={index < completedPomodoros}
            isActive={index === completedPomodoros && taskIsActive}
            isTarget={index <= pomodoros-1}/>
        }
      </CreatePomodoros>
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

