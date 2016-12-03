import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

import Pomodoros from './Pomodoros/Pomodoros';
import InputPomodoros from './Pomodoros/InputPomodoros';

const TaskInput = () => {
  return (
    <form>
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
    </form>
  );
};

TaskInput.propTypes = {

};

export default TaskInput;