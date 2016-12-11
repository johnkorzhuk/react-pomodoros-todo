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
  active,
  completedPomodoros,
  editingTitle,
  editingTask,
  pomodoroGoal,
  handleKeyInput,
  updatePomodoros,
}) => {
  return (
    <div style={ styles.pomodoros.root }>
      <ProgressPomodoro
        active={ active }
        rootStyles={ styles.pomodoros.progress }
        completedPomodoros={ completedPomodoros }
        editing={ !editingTitle && editingTask }
        pomodoroGoal={ pomodoroGoal }/>

      <InputPomodoros
        rootStyles={ {} }
        completedPomodoros={ completedPomodoros }
        handleKeyInput={ handleKeyInput }
        updatePomodoros={ updatePomodoros }/>
    </div>
  );
};

EditablePomodoros.propTypes = {
  active: PropTypes.bool,
  completedPomodoros: PropTypes.number,
  editingTitle: PropTypes.bool,
  editingTask: PropTypes.bool,
  pomodoroGoal: PropTypes.number,
  handleKeyInput: PropTypes.func,
  updatePomodoros: PropTypes.func,
};

export default EditablePomodoros;