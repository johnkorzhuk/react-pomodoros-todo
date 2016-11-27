import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import Lens from 'material-ui/svg-icons/image/lens';
import CreatePomodoros from './CreatePomodoros';
import Pomodoros from './Pomodoros';
import { grey600 } from 'material-ui/styles/colors';


const styles = {
  icon: {
    fill: grey600,
    marginRight: 0
  },
};

class AddItem extends Component {
  renderPomodoros() {
    return (
    <Pomodoros>
      <CreatePomodoros amount={5}>
        {index => {
          return (
            <li
              key={index}
              style={{display: 'inline-block'}}>
              <Checkbox
                checkedIcon={<Lens/>}
                uncheckedIcon={<RadioButtonUnchecked/>}
                iconStyle={styles.icon}
                style={{}}/>
            </li>
          );
        }}
      </CreatePomodoros>
    </Pomodoros>
    );
  }


  render() {
    return (
      <div style={this.props.taskItemStyles}>
        {this.renderPomodoros()}

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
