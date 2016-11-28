import React, { Component } from 'react';
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


const styles = {
  addItem: {
    padding: '20px 160px 20px 65px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fill: red500,
    marginRight: 0
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
  }
};

class AddItem extends Component {
  renderPomodoros() {
    return (
    <Pomodoros>
      <CreatePomodoros amount={5}>
        {index => {
          return (
            <Pomodoro key={index}>
              <Checkbox
                checkedIcon={<Lens/>}
                uncheckedIcon={<RadioButtonUnchecked/>}
                iconStyle={styles.icon}/>
            </Pomodoro>
          );
        }}
      </CreatePomodoros>
    </Pomodoros>
    );
  }

  render() {
    return (
      <div style={styles.addItem}>

        <TextField
          hintText="New Task"
          fullWidth={true}
          style={styles.textField.root}
          hintStyle={styles.textField.hint}
          underlineShow={true}
          underlineFocusStyle={Object.assign({borderColor: grey500}, styles.textField.underLine)}
          underlineStyle={styles.textField.underLine}/>

        {this.renderPomodoros()}

        <FloatingActionButton
          backgroundColor={red500}
          iconStyle={{height: '45px', width: '45px'}}
          style={{position: 'absolute', left: '10px'}}>
          <ContentAdd style={{width: '24px'}}/>
        </FloatingActionButton>
      </div>
    );
  }
}


export default AddItem;
