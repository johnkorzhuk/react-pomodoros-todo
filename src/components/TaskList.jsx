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

const TaskList = ({
  tasks,
  toggleActive,
  toggleComplete,
}) => {
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
          title
        }) =>
          <TaskItem
            key={id}
            active={active}
            complete={complete}
            elapsed={elapsed}
            id={id}
            pomodoros={pomodoros}
            title={title}
            toggleActive={toggleActive}
            toggleComplete={toggleComplete.bind(null, id)}/>
        )}
    </ul>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool,
      complete: PropTypes.bool,
      editing: PropTypes.bool,
      elapsed: PropTypes.number,
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
      pomodoros: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
  })),
  toggleActive: PropTypes.func,
  toggleComplete: PropTypes.func.isRequired,
};

export default TaskList;