import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/editor/mode-edit'

import ProgressPomodoro from '../Pomodoros/ProgressPomodoro';


const styles = {
  root: {
    fontSize: '1.1em',
    flex: 1,
    minHeight: '1.1em',
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    padding: '20px 0',
    width: '100%',
  },
  edit: {
    button: {
      width: 30,
      height: 30,
      padding: 0,
      position: 'absolute',
      top: -7,
      right: 180,
    },
    icon: {
      width: 15,
      height: 15,
    },
  },
};

const Task = ({
  active,
  editingTask,
  completedPomodoros,
  pomodoroGoal,
  title,
  breaking,
  editingTitle,
  showEditIcon,
  onEdit,
  onEditTitle,
}) => {
  return (
    <div style={ styles.root }>
      <div
        style={ styles.title }
        onDoubleClick={ onEditTitle }>
        { title }
      </div>

      {showEditIcon &&
      <IconButton
        style={ styles.edit.button }
        iconStyle={ styles.edit.icon }
        onClick={ onEdit }>
        <Edit />
      </IconButton> }

      <ProgressPomodoro
        active={ active }
        completedPomodoros={ completedPomodoros }
        editing={ !editingTitle && editingTask }
        pomodoroGoal={ pomodoroGoal }
        breaking={ breaking }/>
      </div>
  );
};

Task.propTypes = {
  active: PropTypes.bool.isRequired,
  editingTask: PropTypes.bool.isRequired,
  completedPomodoros: PropTypes.number,
  pomodoroGoal: PropTypes.number,
  title: PropTypes.string.isRequired,
  breaking: PropTypes.bool,
  editingTitle: PropTypes.bool,
  showEditIcon: PropTypes.bool,
  onEdit: PropTypes.func,
  onEditTitle: PropTypes.func,
};

export default Task;