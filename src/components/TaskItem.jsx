import React, { PropTypes } from 'react';
import Pomodoros from './Pomodoros';
import ToggleActiveTask from './ToggleActiveTask';
import Timebar from './Timebar';


const styles = {
  taskItem: {
    padding: '20px 220px 20px 70px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  alignCenter: {
    flex: '1',
  },
  title: {
    fontSize: '1.2em'
  }
};

const TaskItem = ({task}) => {
  const onePomodoro = 1500000;
  const completedPomodoros = Math.floor(task.elapsed/onePomodoro);

  return (
    <div className="task-item">
      <li style={styles.taskItem}>
        <div style={Object.assign({}, styles.alignCenter, styles.title)}>
          {task.title}
        </div>

        <ToggleActiveTask active={task.active}/>

        <Pomodoros
          completedPomodoros={completedPomodoros}
          elapsed={task.elapsed}
          taskIsActive={task.active}
          taskIsComplete={task.complete}
          pomodoros={task.pomodoros}/>
      </li>
      {task.active ?
        <Timebar
          completedPomodoros={completedPomodoros}
          elapsed={task.elapsed}
          onePomodoro={onePomodoro}/>
        : null}

    </div>
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
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskItem;