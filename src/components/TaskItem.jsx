import React, { PropTypes } from 'react';
import Pomodoros from './Pomodoros';


const styles = {
  taskItem: {
    padding: '20px 220px 20px 70px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    alignSelf: 'flex-start',
    flex: '1',
    fontSize: '1.2em'
  }
};

const TaskItem = ({task}) => {
  return (
    <li
      style={styles.taskItem}>
      {/*TODO uuid shouldn't be generated here. Store it in state*/}
      <span style={styles.title}>{task.title}</span>
      <Pomodoros
        elapsed={task.elapsed}
        taskIsActive={task.active}
        taskIsComplete={task.complete}
        pomodoros={task.pomodoros}/>
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