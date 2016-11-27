import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import { grey600 } from 'material-ui/styles/colors';
import Pomodoros from './Pomodoros';
import ToggleActiveTask from './ToggleActiveTask';
import Timebar from './Timebar';
import Pomodoro from './Pomodoro';

/*{
 completedPomodoros,
 pomodoros,
 taskIsActive,
 taskIsComplete,
 }*/
/*<Pomodoro
  taskIsComplete={taskIsComplete}
  isComplete={i < completedPomodoros}
  isActive={i === completedPomodoros && taskIsActive}
  isTarget={i <= pomodoros-1}/>*/
const styles = {
  align: {
    flex: '1',
  },
  title: {
    fontSize: '1.2em'
  },
  toggleComplete: {
    root: {
      width: '30px',
    },
    icon: {
      marginRight: '20px', fill: grey600
    },
    input: {
      height: '40px', width: '40px'
    }
  },
};

const TaskItem = ({task, taskItemStyles}) => {
  const onePomodoro = 1500000;
  const completedPomodoros = Math.floor(task.elapsed/onePomodoro);

  return (
    <li className="task-item">
      <div
        style={taskItemStyles}
        className="task-item">
        <Checkbox
          style={styles.toggleComplete.root}
          iconStyle={styles.toggleComplete.icon}
          inputStyle={styles.toggleComplete.input}
          checked={task.complete}/>

        <div style={Object.assign({}, styles.align, styles.title)}>
          {task.title}
        </div>

        <ToggleActiveTask active={task.active}/>

        <Pomodoros
          completedPomodoros={completedPomodoros}
          taskIsActive={task.active}
          taskIsComplete={task.complete}
          pomodoros={task.pomodoros}/>
      </div>
      {task.active
        ? <Timebar
          completedPomodoros={completedPomodoros}
          elapsed={task.elapsed}
          onePomodoro={onePomodoro}/>
        : null}
    </li>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    active: PropTypes.bool,
    complete: PropTypes.bool.isRequired,
    editing: PropTypes.bool,
    elapsed: PropTypes.number.isRequired,
    id: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]),
    pomodoros: PropTypes.number.isRequired,
    taskItemStyles: PropTypes.object,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskItem;