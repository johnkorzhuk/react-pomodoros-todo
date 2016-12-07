import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import CancelEdit from 'material-ui/svg-icons/navigation/close'
import TextField from 'material-ui/TextField';
import { grey500 } from 'material-ui/styles/colors';

import EditablePomodoros from './Pomodoros/EditablePomodoros';
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
  cancelEdit: {
    button: {
      width: 30,
      height: 30,
      padding: 0,
      position: 'absolute',
      top: -5,
      right: -5,
    },
    icon: {
      width: 15,
      height: 15,
    },
  },
};



const TaskInput = ({
  completedPomodoros,
  editingTask,
  title,
  editingTitle,
  pomodoroGoal,
  pomodoros,
  submitted,
  textFieldPlaceHolder,
  onEditComplete,
  onKeyEnter,
  updatePomodoros,
  updateTitle,
}) => {

  return (
      <div style={ styles.root }>

        {editingTask && !editingTitle &&
        <IconButton
          style={ styles.cancelEdit.button }
          tooltipStyles={ {top: -10, right: 25} }
          tooltip="cancel"
          tooltipPosition="bottom-left"
          iconStyle={ styles.cancelEdit.icon }
          onClick={ () => onEditComplete() }>
          <CancelEdit />
        </IconButton> }

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
            onKeyEnter(e) }/>

        {editingTask
          ? !editingTitle
            ? <EditablePomodoros
                completedPomodoros={ completedPomodoros }
                editingTitle={ editingTitle }
                editingTask={ editingTask }
                pomodoroGoal={ pomodoroGoal }
                pomodoros={ pomodoros }
                onKeyEnter={ onKeyEnter }
                updatePomodoros={ updatePomodoros }/>

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
  pomodoroGoal: PropTypes.number,
  pomodoros: PropTypes.number,
  submitted: PropTypes.bool,
  textFieldPlaceHolder: PropTypes.string,
  onEditComplete: PropTypes.func,
  onKeyEnter: PropTypes.func,
  updatePomodoros: PropTypes.func,
  updateTitle: PropTypes.func,
};

export default TaskInput;