import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Lens from 'material-ui/svg-icons/image/lens';
import { grey500, red500 } from 'material-ui/styles/colors';
import CreatePomodoros from './CreatePomodoros';
import Pomodoros from './Pomodoros';
import Pomodoro from './Pomodoro';
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
  icon: {
    fill: red500,
    marginRight: 0
  },
};

class AddTask extends Component {
  constructor() {
    super();

    this.state = {
      pomodoros: 0
    }
  }

  renderPomodoros() {
    return (
      <Pomodoros>
        <CreatePomodoros amount={5}>
          {index => {
            return (
              <Pomodoro key={index}>
                <Checkbox
                  iconStyle={styles.icon}
                  checkedIcon={<Lens/>}
                  uncheckedIcon={<RadioButtonUnchecked/>}
                  data-index={index}
                  checked={index+1 <= this.state.pomodoros}
                  onKeyDown={event => this.onKeyEnter(event, this.onCheck)}
                  onCheck={this.onCheck}/>
              </Pomodoro>
            );
          }}
        </CreatePomodoros>
      </Pomodoros>
    );
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
          onKeyDown={event => this.onKeyEnter(event, null)}/>

        {this.renderPomodoros()}

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

  // TODO figure out why I can't addnew item and updated pomodoros at the same time
  onCheck = (event) => {
    const index = (parseInt(event.target.getAttribute('data-index')))+1;
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
    this.setState(prevState => prevState.pomodoros = 0);
  };

  onKeyEnter(event, callback) {
    if (event.key === 'Enter') {
      const keyEnter = true;

      callback
        ? callback(event, keyEnter)
        : this.createItem();
    }
  }

}

AddTask.propTypes = {
  addTask: PropTypes.func.isRequired,
};

export default AddTask;
