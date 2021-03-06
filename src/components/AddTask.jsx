import React, { Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { red500 } from 'material-ui/styles/colors';
import uuid from 'uuid';

import TaskInput from './TaskItem/TaskInput/TaskInput';


const styles = {
  root: {
    padding: '0 140px 0 60px',
    position: 'relative',
  },
  button: {
    root: {
      position: 'absolute',
      left: 10,
      top: 10,
    },
    icon: {
      height: 40,
      width: 40,
    },
  },
};

class AddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pomodoros: 0,
      submitted: false,
    }
  }

  render() {
    return (
      <div style={ styles.root }>
        <TaskInput
          completedPomodoros={ this.state.pomodoros }
          submitted={ this.state.submitted }
          textFieldPlaceHolder="New Task"
          handleKeyInput={ this.handleKeyInput.bind(this) }
          updatePomodoros={ this.updatePomodoros }
          updateTitle={ this.updateTitle }/>

        <FloatingActionButton
          style={ styles.button.root }
          backgroundColor={ red500 }
          iconStyle={ styles.button.icon }
          onClick={ () =>
            this.createItem() }>
          <ContentAdd style={ {width: 24} }/>
        </FloatingActionButton>
      </div>
    );
  }

  handleKeyInput(event, type, value) {
    if (event.key === 'Enter') {
      switch (type) {
        case 'pomodoros':
          this.pomodoros = value;
          break;

        case 'title':
          this.title = value;
          break;

        default:
          break;
      }

      this.createItem();
    }
  }

  updatePomodoros = (pomodoroIndex) => {
    this.setState({ submitted: false });

    pomodoroIndex === this.state.pomodoros
      ? this.setState({ pomodoros: 0 })
      : this.setState({ pomodoros: pomodoroIndex });
  };

  updateTitle = (title) => {
    this.setState({ submitted: false });
    this.title = title;
  };

  createItem = () => {
    const newTask = {
      added: Date.now(),
      active: false,
      breaking: false,
      complete: false,
      editing: false,
      elapsed: 0,
      id: uuid.v4(),
      pomodoroGoal:
        this.pomodoros ||
        this.state.pomodoros ||
        0,
      title: this.title || "",
    };

    this.props.addTask(newTask);

    this.pomodoros = 0;
    this.title = "";
    this.setState({
      submitted: true,
      pomodoros: 0,
    });
  };
}

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default AddTask;
