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
  pomodoros,
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
              checked={
                index+1 <= (pomodoros) }
              onCheck={ () =>
                updatePomodoros(index+1) }
              onKeyUp={ event =>
                handleKeyInput(event, 'index', index + 1) }/>
          </div>
        );
      }}
    </CreatePomodoros>
  );
};

InputPomodoros.propTypes = {
  pomodoros: PropTypes.number.isRequired,
  rootStyles: PropTypes.object,
  handleKeyInput: PropTypes.func.isRequired,
  updatePomodoros: PropTypes.func.isRequired,
};

export default InputPomodoros;