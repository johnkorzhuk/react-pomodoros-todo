import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import Lens from 'material-ui/svg-icons/image/lens';
import { grey600 } from 'material-ui/styles/colors';


const styles = {
  icon: {
    fill: grey600,
    marginRight: 0
  },
  pomodoro: {
    display: 'inline-block',
  },
};

const AddItem = (props) => {
  const Pomodoros = [];
  for (let i = 1; i < 6; i++) {
    Pomodoros[i] = (
      <li
        style={styles.pomodoro}
        key={i}>
        <Checkbox
          checkedIcon={<Lens/>}
          uncheckedIcon={<RadioButtonUnchecked/>}
          iconStyle={styles.icon}/>
      </li>
    );
  }
  return (
    <ul>
      {Pomodoros}
    </ul>
  );
};

AddItem.propTypes = {

};

export default AddItem;
