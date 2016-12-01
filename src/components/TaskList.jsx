import React from 'react';
import './TaskList.css';


const styles = {
  taskList: {
    listStyle: 'none',
    paddingLeft: '0px',
    margin: '0px'
  },
};

const TaskList = ({
  children,
}) => {
  return (
    <ul
      className="task-list"
      style={styles.taskList}>
      {children}
    </ul>
  );
};

export default TaskList;