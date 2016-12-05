import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { grey500 } from 'material-ui/styles/colors';

import ProgressPomodoro from './Pomodoros/ProgressPomodoro';
import InputPomodoros from './Pomodoros/InputPomodoros';


const styles = {
  root: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    root: {
      padding: '20px 0',
      height: '100%',
      lineHeight: '1.1em',
      fontSize: '1.1em',
    },
    underLine: {
      bottom: 18
    }
  },
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

const TaskInput = ({
  completedPomodoros,
  editingTask,
  title,
  editingTitle,
  editingElapsed,
  pomodoroGoal,
  pomodoros,
  submitted,
  textFieldPlaceHolder,
  onKeyEnter,
  updatePomodoros,
  updateTitle,
}) => {

  return (
      <div style={styles.root}>

        {!editingElapsed &&
        <TextField
          ref={ textfield => {
            if (submitted && textfield) {
              textfield.input.value = "";
            }}}
          style={ styles.textField.root }
          underlineFocusStyle={
            Object.assign(
              {borderColor: grey500},
              styles.textField.underLine) }
          underlineStyle={ styles.textField.underLine }
          defaultValue={ title ? title : "" }
          name="title"
          placeholder={ textFieldPlaceHolder }
          autoFocus
          fullWidth
          underlineShow
          onBlur={ e =>
            updateTitle(e.target.value) }
          onKeyUp={ e =>
            onKeyEnter(e) }/> }

        {editingTask
          ? !editingTitle
            ? <div style={ styles.pomodoros.root }>
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

            : <ProgressPomodoro
                completedPomodoros={ completedPomodoros }
                editing={ !editingTitle && editingTask }
                pomodoroGoal={ pomodoroGoal }/>

          : <InputPomodoros
              pomodoros={pomodoros}
              onKeyEnter={ onKeyEnter }
              updatePomodoros={ updatePomodoros }/> }
      </div>
  );
};

TaskInput.propTypes = {
  completedPomodoros: PropTypes.number,
  editingTask: PropTypes.bool,
  title: PropTypes.string,
  editingTitle: PropTypes.bool,
  editingElapsed: PropTypes.bool,
  pomodoroGoal: PropTypes.number,
  pomodoros: PropTypes.number,
  submitted: PropTypes.bool,
  textFieldPlaceHolder: PropTypes.string,
  onKeyEnter: PropTypes.func,
  updatePomodoros: PropTypes.func,
  updateTitle: PropTypes.func,
};

export default TaskInput;