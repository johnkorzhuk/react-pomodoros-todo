import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import { grey500 } from 'material-ui/styles/colors';


const styles = {
  textField: {
    root: {
      fontSize: '1.1em',
      height: '100%',
      lineHeight: '1.1em'
    },
    underLine: {
      bottom: 18
    },
  },
  title: {
    padding: '20px 0 20px 0',
    fontSize: '1.1em',
    flex: '1',
    minHeight: '1.1em',
  },
};

const EditableTaskTitle = ({
  editing,
  id,
  title,
  onEdit,
  onEditComplete,
}) => {
  return editing
    ? <EditTaskTitle
        style={styles.title}
        id={id}
        title={title}
        onEditComplete={onEditComplete}/>
    : <div
        style={styles.title}
        onDoubleClick={() => onEdit(id)}>
        {title}
      </div>

};

class EditTaskTitle extends Component {
  render() {
    const {
      title,
    } = this.props;
    return (
      <TextField
        style={Object.assign(
          {},
          styles.textField.root,
          styles.title, )}
        name="task"
        underlineStyle={styles.textField.underLine}
        underlineFocusStyle={
          Object.assign(
            {borderColor: grey500},
            styles.textField.underLine)}
        defaultValue={title}
        autoFocus
        fullWidth
        underlineShow
        onKeyUp={event => this.onKeyEnter(event)}
        onBlur={event => this.editNote(event)}/>
    );
  }

  editNote = (event) => {
    this.props.onEditComplete(this.props.id, event.target.value)
  };

  onKeyEnter = (event) => {
    if (event.key === 'Enter') {
      this.editNote(event);
    }
  };
}

export default EditableTaskTitle;