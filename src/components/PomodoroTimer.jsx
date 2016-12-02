import React, { Component, PropTypes } from 'react';
import TaskItem from './TaskItem/TaskItem';

class PomodoroTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevTime: 0,
      elapsed: 0,
      breaking: false,
    };

    this.onePomodoro = 1500000;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      if (this.props.externalEditing) {
        this.setState({
          prevTime: Date.now()
        });
      }

      nextProps.active
        ? this.interval = setInterval(this.onTick, 1000)
        : clearInterval(this.interval);
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
      elapsed,
      pomodoros,
      title,
      onEdit,
      onEditComplete,
      removeTask,
      toggleComplete,
    } = this.props;

    const totalElapsed = this.state.elapsed + elapsed;
    const completedPomodoros = Math.floor(totalElapsed/this.onePomodoro);

    return (
      <TaskItem
        active={active}
        complete={complete}
        editing={editing}
        elapsed={totalElapsed}
        pomodoros={pomodoros}
        title={title}
        completedPomodoros={completedPomodoros}
        onDelete={removeTask}
        onEdit={onEdit}
        onEditComplete={onEditComplete}
        toggleActive={this.onActiveToggle}
        toggleComplete={toggleComplete}/>
    );
  }

  onTick = () => {
    const now = Date.now();
    this.setState({
      prevTime: now,
      elapsed: this.state.elapsed + (now - this.state.prevTime),
    });
  };

  onActiveToggle = () => {
    if (this.props.active) {
      clearInterval(this.interval);
      this.props.updateElapsed(this.state.elapsed + this.props.elapsed);
      this.setState({elapsed: 0})
    }else {
      this.setState({
        prevTime: Date.now()
      });
    }
    this.props.toggleActive(this.props.active);
  };
}

PomodoroTimer.propTypes = {
  active: PropTypes.bool,
  complete: PropTypes.bool,
  editing: PropTypes.bool,
  elapsed: PropTypes.number,
  pomodoros: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  externalEditing: PropTypes.bool.isRequired,
  removeTask: PropTypes.func,
  onEdit: PropTypes.func,
  onEditComplete: PropTypes.func,
  toggleActive: PropTypes.func,
  toggleComplete: PropTypes.func.isRequired,
  updateElapsed: PropTypes.func,
};

export default PomodoroTimer;