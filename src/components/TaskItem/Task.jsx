import React, { PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui/svg-icons/editor/mode-edit'

import ProgressPomodoro from '../Pomodoros/ProgressPomodoro';
import Title from './Title';


const styles = {
  root: {
    flex: 1,
    minHeight: '1.1em',
    display: 'flex',
    alignItems: 'center',
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
  onEditPomodoros,
  onEditTitle,
}) => {
  return (
    <div style={ styles.root }>
      <Title
        title={ title }
        onDoubleClick={ onEditTitle }/>

      {showEditIcon &&
      <IconButton
        style={ styles.edit.button }
        tooltipStyles={ { top: 0, left: 25 } }
        tooltip="edit"
        iconStyle={ styles.edit.icon }
        onClick={ onEdit }>
        <Edit />
      </IconButton> }

      <ProgressPomodoro
        active={ active }
        completedPomodoros={ completedPomodoros }
        editing={ !editingTitle && editingTask }
        pomodoroGoal={ pomodoroGoal }
        breaking={ breaking }
        onEditPomodoros={ onEditPomodoros }/>
      </div>
  );
};

Task.propTypes = {
  active: PropTypes.bool,
  editingTask: PropTypes.bool,
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