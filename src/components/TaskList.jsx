import React, { PropTypes } from 'react';
import Pomodoros from './Pomodoros';
import './TaskList.css';
import uuid from 'uuid';
// import AddItem from './AddItem';


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

const TaskList = ({todoTasks}) => {
  return (
    <div>
      <ul
        style={styles.taskList}
        className="taskList">
          {todoTasks.map(({
            title,
            elapsed,
            complete,
            pomodoros,
            id,
            activePomodoro,
            active,
          }) =>
            <li
              style={styles.taskItem}
              key={id || uuid.v4()}>
              {/*TODO uuid shouldn't be generated here. Store it in state*/}
              <span style={styles.title}>{title}</span>
              <Pomodoros
                elapsed={elapsed}
                taskIsActive={active}
                taskIsComplete={complete}
                pomodoros={pomodoros}
                activePomodoro={activePomodoro}/>
            </li>
          )}
    </ul>


    </div>
  );
};

TaskList.propTypes = {
  todoTasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      complete: PropTypes.bool.isRequired,
      elapsed: PropTypes.number.isRequired,
      pomodoros: PropTypes.number.isRequired
  }))
};

export default TaskList;