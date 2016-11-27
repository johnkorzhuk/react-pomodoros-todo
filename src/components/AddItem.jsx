import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import Lens from 'material-ui/svg-icons/image/lens';
import { grey600 } from 'material-ui/styles/colors';


const styles = {
  pomodoros: {
    position: 'absolute',
    right: '20px',
    marginTop: '2px'
  },
  pomodoro: {
    display: 'inline-block',
  },
  icon: {
    fill: grey600,
    marginRight: 0
  },
};

class AddItem extends Component {
  renderPomodoros() {
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
  }

  render() {
    return (
      <div>
        <ul style={styles.pomodoros}>
          {Pomodoros}
        </ul>
        <TextField
          hintText="Hint Text"
          floatingLabelText="Floating Label Text"
        />
      </div>
    );
  }
}



AddItem.propTypes = {

};

export default AddItem;
