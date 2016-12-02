import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { grey500, red500 } from 'material-ui/styles/colors';
import uuid from 'uuid';

import Pomodoros from './Pomodoros/Pomodoros';
import InputPomodoros from './Pomodoros/InputPomodoros';


const styles = {
  root: {
    padding: '20px 160px 20px 65px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textField: {
    root: {
      fontSize: '1.1em',
      height: '100%',
    },
    hint: {
      bottom: 0,
    },
    underLine: {
      bottom: 0
    }
  },
  button: {
    root: {
      position: 'absolute',
      left: '10px',
    },
    icon: {
      height: '45px',
      width: '45px',
    }
  },
};

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
    }
  }

  render() {
    return (
      <div style={styles.root}>
        <TextField
          ref={(input) => this.textField = input}
          style={styles.textField.root}
          hintStyle={styles.textField.hint}
          underlineFocusStyle={
            Object.assign(
              {borderColor: grey500},
              styles.textField.underLine)}
          underlineStyle={styles.textField.underLine}
          name="title"
          placeholder="New Task"
          fullWidth
          underlineShow
          onKeyUp={(event) => this.onKeyEnter(event)}/>

        <Pomodoros>
          <InputPomodoros
            submitted={this.state.submitted}
            submitPomodoros={this.createItem}
            updatePomodoros={this.updatePomodoros}/>
        </Pomodoros>

        <FloatingActionButton
          style={styles.button.root}
          backgroundColor={red500}
          iconStyle={styles.button.icon}
          onClick={() => this.createItem()}>
          <ContentAdd style={{width: 24}}/>
        </FloatingActionButton>
      </div>
    );
  }

  updatePomodoros = (pomodoros) => {
    this.pomodoros = pomodoros;
    this.setState({submitted: false});
  };

  createItem = (pomodoros) => {
    const newTask = {
      added: Date.now(),
      elapsed: 0,
      id: uuid.v4(),
      pomodoros: pomodoros || this.pomodoros,
      title: this.textField.input.value,
    };

    this.props.addTask(newTask);

    this.textField.input.value = "";
    this.pomodoros = 0;
    this.setState({ submitted: true});
  };

  onKeyEnter(event) {
    if (event.key === 'Enter') {
      this.createItem();
    }
  }
}

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default AddTask;
