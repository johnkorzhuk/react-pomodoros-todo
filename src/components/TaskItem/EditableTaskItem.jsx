import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { grey500 } from 'material-ui/styles/colors';


const styles = {
  textField: {
    root: {
      fontSize: '1.1em',
      height: '36px',
    },
    underLine: {
      bottom: '4px'
    }
  }
};

class EditableTaskItem extends Component {
  render() {
    const {
      title
    } = this.props;
    return (
      <TextField
        style={styles.textField.root}
        underlineStyle={styles.textField.underLine}
        underlineFocusStyle={
          Object.assign(
            {borderColor: grey500},
            styles.textField.underLine)}
        value={title}
        underlineShow
        fullWidth/>
    );
  }
}

export default EditableTaskItem;