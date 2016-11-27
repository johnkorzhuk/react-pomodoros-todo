import React, { PropTypes } from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';


const styles = {
  taskList: {
    listStyle: 'none',
    paddingLeft: 0,
  },
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

const TaskList = ({tasks}) => {
  return (
    <div>
      <ul
        style={styles.taskList}
        className="task-list">
          {tasks.map((task) =>
            <TaskItem
              key={task.id}
              task={task}/>
          )}
      </ul>
    </div>
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