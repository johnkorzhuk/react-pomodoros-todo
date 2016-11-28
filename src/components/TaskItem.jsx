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
  active,
  complete,
  elapsed,
  pomodoros,
  title,

}) => {
  const onePomodoro = 1500000;
  const completedPomodoros = Math.floor(elapsed/onePomodoro);

  return (
    <li className="task-item">
      <div
        style={styles.taskItem}
        className="task-item">

        <Checkbox
          style={styles.toggleComplete.root}
          iconStyle={styles.toggleComplete.icon}
          inputStyle={styles.toggleComplete.input}
          checked={complete}/>

        <div style={styles.title}>
          {title}
        </div>

        <ToggleActiveTask
          active={active}
          complete={complete}/>

        <Pomodoros>
          <CreatePomodoros amount={5}>
            {index => {
              return (
                <Pomodoro key={index}>
                  <PomodoroProgress
                    isComplete={index < completedPomodoros}
                    isActive={index === completedPomodoros && active}
                    isTarget={index <= pomodoros - 1}/>
                </Pomodoro>
              );
            }}
          </CreatePomodoros>
        </Pomodoros>
      </div>
      {active
        ? <Timebar
          completedPomodoros={completedPomodoros}
          elapsed={elapsed}
          onePomodoro={onePomodoro}/>
        : null}
    </li>
  );
};

TaskItem.propTypes = {
  active: PropTypes.bool.isRequired,
  complete: PropTypes.bool.isRequired,
  elapsed: PropTypes.number.isRequired,
  pomodoros: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default TaskItem;