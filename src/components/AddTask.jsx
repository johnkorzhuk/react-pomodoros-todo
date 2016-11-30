import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { grey500, red500 } from 'material-ui/styles/colors';
import Pomodoros from './Pomodoros/Pomodoros';
import InputPomodoros from './Pomodoros/InputPomodoros';
import { newId } from '../helpers';


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
      height: '36px',
    },
    hint: {
      bottom: '4px',
    },
    underLine: {
      bottom: '4px'
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
  constructor() {
    super();

    this.state = {
      pomodoros: 0
    }
  }

  render() {
    return (
      <div style={styles.root}>

        <TextField
          ref={(input) => this.textField = input}
          style={styles.textField.root}
          hintStyle={styles.textField.hint}
          hintText="New Task"
          underlineStyle={styles.textField.underLine}
          underlineFocusStyle={
            Object.assign(
              {borderColor: grey500},
              styles.textField.underLine)}
          underlineShow={true}
          fullWidth={true}
          onKeyDown={event => this.onKeyEnter(event, this.createItem)}/>

        <Pomodoros>
          <InputPomodoros
            pomodoros={this.state.pomodoros}
            onCheck={this.onCheck}
            onKeyEnter={this.onKeyEnter}/>
        </Pomodoros>

        <FloatingActionButton
          style={styles.button.root}
          backgroundColor={red500}
          iconStyle={styles.button.icon}
          onClick={this.createItem}>
          <ContentAdd style={{width: '24px'}}/>
        </FloatingActionButton>
      </div>
    );
  }

  onCheck = (event, index) => {
    index === this.state.pomodoros
      ? this.setState(prevState => prevState.pomodoros = 0)
      : this.setState({pomodoros: index});
  };

  createItem = () => {
    const newTask = {
      added: Date.now(),
      elapsed: 0,
      id: newId.next().value,
      pomodoros: this.state.pomodoros,
      title: this.textField.input.value,
    };

    this.props.addTask(newTask);

    this.textField.input.value = "";
    this.setState(prevState =>
      prevState.pomodoros = 0);
  };

  onKeyEnter(event, callback) {
    if (event.key === 'Enter') {
      callback();
    }
  }

}

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default AddTask;