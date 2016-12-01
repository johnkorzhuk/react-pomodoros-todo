import React, { Component, PropTypes } from 'react';
import Checkbox from 'material-ui/Checkbox';
import { grey600 } from 'material-ui/styles/colors';
import EditableTaskTitle from './EditableTaskTitle'
import Pomodoros from '../Pomodoros/Pomodoros';
import Timebar from '../Timebar';
import PrimaryButton from './PrimaryButton';
import CreatePomodoros from '../Pomodoros/CreatePomodoros';
import ProgressPomodoro from '../Pomodoros/ProgressPomodoro';


const styles = {
  taskItem: {
    padding: '0 220px 0 20px',
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

class TaskItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevTime: 0,
      elapsed: this.props.elapsed,
      breaking: false,
    };

    this.onePomodoro = 1500000;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      if (nextProps.active) {
        this.interval = setInterval(this.onTick, 1000)
      }else {
        clearInterval(this.interval);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      active,
      complete,
      editing,
      pomodoros,
      title,
      removeTask,
      onEdit,
      onEditComplete,
      toggleComplete,
    } = this.props;

    const completedPomodoros = Math.floor(this.state.elapsed/this.onePomodoro);

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

          <EditableTaskTitle
            editing={editing}
            title={title}
            onEdit={onEdit}
            onEditComplete={onEditComplete}/>

          <PrimaryButton
            active={active}
            complete={complete}
            onActiveToggle={this.onActiveToggle}
            removeTask={removeTask}/>

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
                      isTarget={index < pomodoros}/>
                  </li>
                );
              }}
            </CreatePomodoros>
          </Pomodoros>
        </div>

        {active && <Timebar
          completedPomodoros={completedPomodoros}
          elapsed={this.state.elapsed}
          onePomodoro={this.onePomodoro}/>}
      </li>
    );
  }

  onActiveToggle = () => {
    if (this.props.active) {
      clearInterval(this.interval);
      this.props.updateElapsed(this.state.elapsed);
    }else {
      this.setState({
        prevTime: Date.now()
      });
    }
    this.props.toggleActive(this.props.active);
  };

  onTick = () => {
    const now = Date.now();
    this.setState({
      prevTime: now,
      elapsed: this.state.elapsed + (now - this.state.prevTime),
    });
  };
}

TaskItem.propTypes = {
  active: PropTypes.bool,
  complete: PropTypes.bool,
  editing: PropTypes.bool,
  elapsed: PropTypes.number,
  pomodoros: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  removeTask: PropTypes.func,
  onEdit: PropTypes.func,
  onEditComplete: PropTypes.func,
  toggleActive: PropTypes.func,
  toggleComplete: PropTypes.func.isRequired,
  updateElapsed: PropTypes.func,
};

export default TaskItem;