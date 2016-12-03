import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { grey500 } from 'material-ui/styles/colors';

import Pomodoros from './Pomodoros/Pomodoros';
import InputPomodoros from './Pomodoros/InputPomodoros';


const styles = {
  root: {
    padding: '20px 160px 20px 60px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textField: {
    root: {
      fontSize: '1.1em',
      height: '100%',
      flex: 1,
      lineHeight: '1.1em',
    },
    underLine: {
      bottom: -2
    }
  },
};

const TaskInput = ({
  pomodoros,
  submitted,
  textFieldName,
  textFieldPlaceHolder,
  onKeyEnter,
  updatePomodoros,
  updateTitle,
}) => {
  return (
      <div style={styles.root}>
        <TextField
          ref={textfield => {
            if (submitted && textfield) {
              textfield.input.value = "";
            }
          }}
          style={styles.textField.root}
          underlineFocusStyle={
            Object.assign(
              {borderColor: grey500},
              styles.textField.underLine)}
          underlineStyle={styles.textField.underLine}
          name={textFieldName}
          placeholder={textFieldPlaceHolder}
          fullWidth
          underlineShow
          onKeyUp={event => onKeyEnter(event)}
          onBlur={event => updateTitle(event)}/>

      <Pomodoros>
        <InputPomodoros
          pomodoros={pomodoros}
          onKeyEnter={onKeyEnter}
          updatePomodoros={updatePomodoros}/>
      </Pomodoros></div>
  );
};

TaskInput.propTypes = {
  pomodoros: PropTypes.number.isRequired,
  submitted: PropTypes.bool,
  textFieldName: PropTypes.string,
  textFieldPlaceHolder: PropTypes.string,
  onKeyEnter: PropTypes.func,
  updatePomodoros: PropTypes.func,
  updateTitle: PropTypes.func,
};

export default TaskInput;