import React, { PropTypes } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';


const styles = {
  taskList: {
    listStyle: 'none',
    paddingLeft: '0px',
    margin: '0px'
  },
};

const TaskList = ({tasks}) => {
  return (
    <ul
      className="task-list"
      style={styles.taskList}>
        {tasks.map(({
          active,
          complete,
          elapsed,
          id,
          pomodoros,
          title,
        }) =>
          <TaskItem
            key={id}
            active={active}
            complete={complete}
            elapsed={elapsed}
            pomodoros={pomodoros}
            title={title}/>
        )}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
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
  }))
};

export default TaskList;