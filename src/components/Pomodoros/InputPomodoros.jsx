import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import Lens from 'material-ui/svg-icons/image/lens';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import { red500 } from 'material-ui/styles/colors';

import CreatePomodoros from './CreatePomodoros';


const styles = {
  pomodoro: {
    display: 'inline-block',
  },
  icon: {
    fill: red500,
    marginRight: 0,
  },
};

const InputPomodoros = ({
  completedPomodoros,
  rootStyles,
  handleKeyInput,
  updatePomodoros,
}) => {
  return (
    <CreatePomodoros
      amount={ 5 }
      rootStyles={ rootStyles }>
      {index => {
        return (
          <div
            key={ index }
            style={ styles.pomodoro }>
            <Checkbox
              iconStyle={ styles.icon }
              checkedIcon={ <Lens /> }
              uncheckedIcon={ <RadioButtonUnchecked /> }
              name="Pomodoroindex"
              checked={
                index+1 <= completedPomodoros }
              onCheck={ () =>
                updatePomodoros(index) }
              onKeyUp={ event =>
                handleKeyInput(event, 'index', index) }/>
          </div>
        );
      }}
    </CreatePomodoros>
  );
};

InputPomodoros.propTypes = {
  completedPomodoros: PropTypes.number.isRequired,
  rootStyles: PropTypes.object,
  handleKeyInput: PropTypes.func.isRequired,
  updatePomodoros: PropTypes.func.isRequired,
};

export default InputPomodoros;