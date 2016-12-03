import React, { Component, PropTypes } from 'react';
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
  onKeyEnter,
  updatePomodoros,
}) => {
  return (
    <CreatePomodoros amount={5}>
      {index => {
        return (
          <div
            key={index}
            style={styles.pomodoro}>
            <Checkbox
              iconStyle={styles.icon}
              checkedIcon={<Lens/>}
              uncheckedIcon={<RadioButtonUnchecked/>}
              checked={
                index+1 <= pomodoros
              }
              onCheck={() => updatePomodoros(index+1)}
              onKeyPress={event => onKeyEnter(event, index+1)}/>
          </div>
        );
      }}
    </CreatePomodoros>
  );
};

InputPomodoros.propTypes = {
  pomodoros: PropTypes.number.isRequired,
  onKeyEnter: PropTypes.func,
  updatePomodoros: PropTypes.func,
};

export default InputPomodoros;