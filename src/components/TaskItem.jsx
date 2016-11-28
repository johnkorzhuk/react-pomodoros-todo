import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import { grey600 } from 'material-ui/styles/colors';
import Pomodoros from './Pomodoros';
import ToggleActiveTask from './ToggleActiveTask';
import Timebar from './Timebar';
import CreatePomodoros from './CreatePomodoros';
import PomodoroProgress from './PomodoroProgress';
import Pomodoro from './Pomodoro';


const styles = {
  taskItem: {
    padding: '20px 220px 20px 20px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: '1.1em',
    flex: '1',
  },
  toggleComplete: {
    root: {
      width: '30px',
    },
    icon: {
      marginRight: '20px',
      fill: grey600,
    },
    input: {
      height: '40px', width: '40px'
    }
  },
};

const TaskItem = ({
  task
}) => {
  const onePomodoro = 1500000;
  const completedPomodoros = Math.floor(task.elapsed/onePomodoro);

  return (
    <li className="task-item">
      <div
        style={styles.taskItem}
        className="task-item">

        <Checkbox
          style={styles.toggleComplete.root}
          iconStyle={styles.toggleComplete.icon}
          inputStyle={styles.toggleComplete.input}
          checked={task.complete}/>

        <div style={styles.title}>
          {task.title}
        </div>

        <ToggleActiveTask
          active={task.active}
          complete={task.complete}/>

        <Pomodoros>
          <CreatePomodoros amount={5}>
            {index => {
              return (
                <Pomodoro key={index}>
                  <PomodoroProgress
                    isComplete={index < completedPomodoros}
                    isActive={index === completedPomodoros && task.active}
                    isTarget={index <= task.pomodoros - 1}/>
                </Pomodoro>
              );
            }}
          </CreatePomodoros>
        </Pomodoros>
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
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskItem;