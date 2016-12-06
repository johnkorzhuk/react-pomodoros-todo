import React, { PropTypes } from 'react';

import TaskInput from '../TaskInput';
import Task from './Task';


const EditableTaskTitle = ({
  active,
  completedPomodoros,
  editingTask,
  pomodoroGoal,
  title,
  breaking,
  editingTitle,
  pomodoros,
  showEditIcon,
  onEdit,
  onEditComplete,
  onEditPomodoros,
  onEditTitle,
  onKeyEnter,
  updateNewElapsedPom,
  updateTitle,
}) => {

  return (
    editingTask
      ? <TaskInput
          completedPomodoros={ completedPomodoros }
          editingTask={ editingTask }
          title={ title }
          editingTitle={ editingTitle }
          pomodoroGoal={ pomodoroGoal }
          pomodoros={ pomodoros }
          onKeyEnter={ onKeyEnter }
          updatePomodoros={ updateNewElapsedPom }
          updateTitle={ editingTitle ? onEditComplete : updateTitle }/>

      : <Task
          active={ active }
          editingTask={ editingTask }
          completedPomodoros={ completedPomodoros }
          pomodoroGoal={ pomodoroGoal }
          title={ title }
          breaking={ breaking }
          editingTitle={ editingTitle }
          showEditIcon={ showEditIcon }
          onEdit={ onEdit }
          onEditPomodoros={ onEditPomodoros }
          onEditTitle={ onEditTitle }/>
  );
};

EditableTaskTitle.propTypes = {
  active: PropTypes.bool,
  completedPomodoros: PropTypes.number,
  editingTask: PropTypes.bool,
  pomodoroGoal: PropTypes.number,
  title: PropTypes.string.isRequired,
  breaking: PropTypes.bool,
  editingTitle: PropTypes.bool,
  pomodoros: PropTypes.number,
  showEditIcon: PropTypes.bool,
  onEdit: PropTypes.func,
  onEditComplete: PropTypes.func.isRequired,
  onEditTitle: PropTypes.func,
  onKeyEnter: PropTypes.func,
  updateNewElapsedPom: PropTypes.func,
  updateTitle: PropTypes.func,
};

export default EditableTaskTitle;