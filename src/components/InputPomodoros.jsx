import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import Lens from 'material-ui/svg-icons/image/lens';
import { red500 } from 'material-ui/styles/colors';
import CreatePomodoros from './CreatePomodoros';
import Pomodoro from './Pomodoro';


const styles = {
  icon: {
    fill: red500,
    marginRight: 0
  },
};

const InputPomodoros = ({
  pomodoros,
  onCheck,
  onKeyEnter,
}) => {
  return (
    <CreatePomodoros amount={5}>
      {index => {
        return (
          <Pomodoro key={index}>
            <Checkbox
              iconStyle={styles.icon}
              checkedIcon={<Lens/>}
              uncheckedIcon={<RadioButtonUnchecked/>}
              checked={index+1 <= pomodoros}
              onKeyDown={event => onKeyEnter(event, () => onCheck(event, index+1))}
              onCheck={event => onCheck(event, index+1)}/>
          </Pomodoro>
        );
      }}
    </CreatePomodoros>
  );
};

InputPomodoros.propTypes = {
  pomodoros: PropTypes.number.isRequired,
  onCheck: PropTypes.func.isRequired,
  onKeyEnter: PropTypes.func.isRequired,
};

export default InputPomodoros;