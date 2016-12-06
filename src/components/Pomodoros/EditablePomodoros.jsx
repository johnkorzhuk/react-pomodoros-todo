import React, { PropTypes } from 'react';

import ProgressPomodoro from './ProgressPomodoro';
import InputPomodoros from './InputPomodoros';

const styles = {
  pomodoros: {
    root: {
      position: 'absolute',
      right: 20,
      flex: 1,
      marginTop: 2,
    },
    progress: {
      position: 'absolute',
      flex: 1,
    },
  },
};

const EditablePomodoros = ({
  completedPomodoros,
  editingTitle,
  editingTask,
  pomodoroGoal,
  pomodoros,
  onKeyEnter,
  updatePomodoros,
}) => {
  return (
    <div style={ styles.pomodoros.root }>
      <ProgressPomodoro
        rootStyles={ styles.pomodoros.progress }
        completedPomodoros={ completedPomodoros }
        editing={ !editingTitle && editingTask }
        pomodoroGoal={ pomodoroGoal }/>

      <InputPomodoros
        rootStyles={ {} }
        pomodoros={ pomodoros }
        onKeyEnter={ onKeyEnter }
        updatePomodoros={ updatePomodoros }/>
    </div>
  );
};

EditablePomodoros.propTypes = {
  completedPomodoros: PropTypes.number,
  editingTitle: PropTypes.bool,
  editingTask: PropTypes.bool,
  pomodoroGoal: PropTypes.number,
  onKeyEnter: PropTypes.func,
  updatePomodoros: PropTypes.func,
};

export default EditablePomodoros;