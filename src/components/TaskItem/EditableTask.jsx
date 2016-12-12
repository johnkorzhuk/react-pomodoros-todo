import React, { PropTypes } from 'react';

import TaskInput from './TaskInput/TaskInput';
import TaskInfo from './TaskInfo';


const EditableTaskTitle = ({
  active,
  completedPomodoros,
  editingTask,
  pomodoroGoal,
  intervalDelay,
  title,
  breaking,
  editedElapsed,
  editingTitle,
  pomodoros,
  showEditIcon,
  onEdit,
  onEditCancel,
  onEditComplete,
  onEditTitle,
  handleKeyInput,
  updateElapsedPom,
  updateEditedElapsed,
  updateTitle,
}) => {

  return (
    editingTask
      ? <TaskInput
          active={ active }
          completedPomodoros={ completedPomodoros }
          editingTask={ editingTask }
          title={ title }
          editedElapsed={ editedElapsed }
          editingTitle={ editingTitle }
          pomodoroGoal={ pomodoroGoal }
          intervalDelay={ intervalDelay }
          pomodoros={ pomodoros }
          onEditCancel={ onEditCancel }
          onEditComplete={ onEditComplete }
          handleKeyInput={ handleKeyInput }
          updateEditedElapsed={ updateEditedElapsed }
          updatePomodoros={ updateElapsedPom }
          updateTitle={ editingTitle ? onEditComplete : updateTitle }/>

      : <TaskInfo
          active={ active }
          editingTask={ editingTask }
          completedPomodoros={ completedPomodoros }
          pomodoroGoal={ pomodoroGoal }
          title={ title }
          breaking={ breaking }
          editingTitle={ editingTitle }
          showEditIcon={ showEditIcon }
          onEdit={ onEdit }
          onEditTitle={ onEditTitle }/>
  );
};

EditableTaskTitle.propTypes = {
  active: PropTypes.bool,
  completedPomodoros: PropTypes.number,
  editingTask: PropTypes.bool,
  pomodoroGoal: PropTypes.number,
  intervalDelay: PropTypes.number,
  title: PropTypes.string.isRequired,
  breaking: PropTypes.bool,
  editingTitle: PropTypes.bool,
  pomodoros: PropTypes.number,
  showEditIcon: PropTypes.bool,
  handleKeyInput: PropTypes.func,
  onEdit: PropTypes.func,
  onEditCancel: PropTypes.func,
  onEditComplete: PropTypes.func.isRequired,
  onEditTitle: PropTypes.func,
  updateElapsedPom: PropTypes.func,
  updateTitle: PropTypes.func,
};

export default EditableTaskTitle;