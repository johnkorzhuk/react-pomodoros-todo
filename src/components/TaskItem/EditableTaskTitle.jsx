import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import { grey500 } from 'material-ui/styles/colors';


const styles = {
  textField: {
    root: {
      fontSize: '1.1em',
      height: '100%',
      lineHeight: '1.1em',
    },
    underLine: {
      bottom: 18,
    },
  },
  title: {
    padding: '20px 0 20px 0',
    fontSize: '1.1em',
    flex: 1,
    minHeight: '1.1em',
    marginRight: 200,
  },
  edit: {
    wrap: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      top: 0,
      right: 190
    },
    button: {
      width: 35,
      height: 35,
      padding: 0,
      position: 'absolute',
      top: -5,
      right: 0,
    },
    icon: {
      width: 15,
      height: 15,
    },
  },
};

const EditableTaskTitle = ({
  editing,
  title,
  showEditIcon,
  onEdit,
  onEditComplete,
  onTitleMouseOver,
  onTitleMouseLeave,
}) => {
  return editing
    ? <EditTaskTitle
        style={styles.title}
        title={title}
        onEditComplete={onEditComplete}/>
    : <div
        style={styles.title}
        onDoubleClick={onEdit}>
        {title}
        <div
          style={styles.edit.wrap}
          onMouseOver={onTitleMouseOver}
          onMouseLeave={onTitleMouseLeave}>
          {showEditIcon
            ? <IconButton
                style={styles.edit.button}
                iconStyle={styles.edit.icon}
                onClick={onEdit}>
                <Edit/>
              </IconButton>
            : null}
        </div>
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
          styles.title,
          styles.textField.root)}
        textareaStyle={{border: '1px solid blue', margin: 0}}
        underlineStyle={styles.textField.underLine}
        underlineFocusStyle={
          Object.assign(
            {borderColor: grey500},
            styles.textField.underLine)}
        name="title"
        defaultValue={title}
        autoFocus
        fullWidth
        underlineShow
        onBlur={event => this.editNote(event)}
        onKeyUp={event => this.onKeyEnter(event)}/>
    );
  }

  editNote = (event) => {
    this.props.onEditComplete(event.target.value)
  };

  onKeyEnter = (event) => {
    if (event.key === 'Enter') {
      this.editNote(event);
    }
  };
}

EditableTaskTitle.propTypes = {
  editing: PropTypes.bool,
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  onEditComplete: PropTypes.func.isRequired,
  onTitleMouseOver: PropTypes.func.isRequired,
  onTitleMouseLeave: PropTypes.func.isRequired,
};

export default EditableTaskTitle;