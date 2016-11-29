import React, { PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';
import { grey600 } from 'material-ui/styles/colors';
import Pomodoros from './Pomodoros/Pomodoros';
import TaskPrimaryButton from './TaskPrimaryButton';
import Timebar from './Timebar';
import CreatePomodoros from './Pomodoros/CreatePomodoros';
import ProgressPomodoro from './Pomodoros/ProgressPomodoro';


const styles = {
  taskItem: {
    padding: '20px 220px 20px 20px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
  title: {
    fontSize: '1.1em',
    flex: '1',
  },
  pomodoro: {
    display: 'inline-block',
  },
};

const TaskItem = ({
  active,
  complete,
  elapsed,
  id,
  pomodoros,
  title,
  removeTask,
  toggleComplete,
  toggleActive,
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
          checked={complete}
          onCheck={toggleComplete}/>

        <div style={styles.title}>
          {title}
        </div>


        <TaskPrimaryButton
            active={active}
            complete={complete}
            id={id}
            removeTask={removeTask}
            toggleActive={toggleActive}/>


        <Pomodoros>
          <CreatePomodoros amount={5}>
            {index => {
              return (
                <li
                  key={index}
                  style={styles.pomodoro}>
                  <ProgressPomodoro
                    isComplete={index < completedPomodoros}
                    isActive={index === completedPomodoros && active}
                    isTarget={index <= pomodoros - 1}/>
                </li>
              );
            }}
          </CreatePomodoros>
        </Pomodoros>
      </div>

      {active && <Timebar
          completedPomodoros={completedPomodoros}
          elapsed={elapsed}
          onePomodoro={onePomodoro}/>}
    </li>
  );
};

TaskItem.propTypes = {
  active: PropTypes.bool,
  complete: PropTypes.bool,
  elapsed: PropTypes.number,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  pomodoros: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  toggleActive: PropTypes.func,
  toggleComplete: PropTypes.func.isRequired,
};

export default TaskItem;