import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import Lens from 'material-ui/svg-icons/image/lens';
import { red500 } from 'material-ui/styles/colors';
import CreatePomodoros from './CreatePomodoros';


const styles = {
  pomodoro: {
    display: 'inline-block',
  },
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
          <li
            key={index}
            style={styles.pomodoro}>
            <Checkbox
              iconStyle={styles.icon}
              checkedIcon={<Lens/>}
              data-pomodoro={index+1}
              uncheckedIcon={<RadioButtonUnchecked/>}
              checked={index+1 <= pomodoros}/>
          </li>
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