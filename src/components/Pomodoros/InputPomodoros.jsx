import React, { Component, PropTypes } from 'react';
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
    marginRight: 0,
  },
};

class InputPomodoros extends Component {
  constructor(props) {
    super(props);

    this.pomodoros = 0;
    this.state = {
      pomodoros: this.pomodoros
    }
  }

  render() {
    const {
      submitted
    } = this.props;

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
                  index+1 <= this.pomodoros && !submitted
                }
                onCheck={event => this.onCheck(event, index+1)}
                onKeyPress={event => this.onCheck(event, index+1)}/>
            </div>
          );
        }}
      </CreatePomodoros>
    );
  }

  onSubmitPomodoros = () => {
    this.props.submitPomodoros(
      this.pomodoros
        ? this.pomodoros
        : this.state.pomodoros);

    this.pomodoros = 0;
    this.setState({ pomodoros: 0});
  };

  onCheck = (event, index) => {
    index === this.pomodoros
      ? this.pomodoros = 0
      : this.pomodoros = index;

    this.setState({pomodoros: this.pomodoros});

    this.props.updatePomodoros(this.pomodoros);

    if (event.key === 'Enter') {
      this.onSubmitPomodoros();
    }
  };
}

InputPomodoros.propTypes = {
  submitted: PropTypes.bool,
  submitPomodoros: PropTypes.func,
  updatePomodoros: PropTypes.func,
};

export default InputPomodoros;