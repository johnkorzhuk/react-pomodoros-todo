import React, { Component, PropTypes } from 'react';
import TaskItem from './TaskItem/TaskItem';

class PomodoroTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breaking: false,
      breakTime: 5000,
      onePomodoroTime: 1500000,
      elapsed: 0,
      prevTime: 0,
    };
  }
  //300000

  componentWillReceiveProps(nextProps) {
    if (nextProps.active !== this.props.active) {
      if (this.props.editingComponent) {
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

    const {
      breaking,
      onePomodoroTime,
      breakTime,
    } = this.state;

    const totalElapsed =
      this.state.breaking
        ? elapsed
        : this.state.elapsed + elapsed;

    return (
      <TaskItem
        active={active}
        complete={complete}
        editing={editing}
        elapsed={
          breaking
            ? this.state.elapsed
            : totalElapsed
        }
        pomodoros={pomodoros}
        title={title}
        breaking={breaking}
        completedPomodoros={
          Math.floor(totalElapsed/onePomodoroTime)
        }
        breakTime={breakTime}
        onePomodoroTime={onePomodoroTime}
        onBreakEnd={this.onBreakEnd}
        onBreakInit={this.onBreakInit}
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

  onBreakEnd = () => {
    clearInterval(this.interval);

    this.setState({
      breaking: false,
      elapsed: 0,
      prevTime: Date.now()
    });

    this.interval = setInterval(this.onTick, 1000)
  };

  onBreakInit = () => {
    clearInterval(this.interval);
    this.props.updateElapsed(this.state.elapsed + this.props.elapsed);

    this.setState({
      breaking: true,
      elapsed: 0,
      prevTime: Date.now()
    });

    this.interval = setInterval(this.onTick, 1000)
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
  editingComponent: PropTypes.bool.isRequired,
  removeTask: PropTypes.func,
  onEdit: PropTypes.func,
  onEditComplete: PropTypes.func,
  toggleActive: PropTypes.func,
  toggleComplete: PropTypes.func.isRequired,
  updateElapsed: PropTypes.func,
};

export default PomodoroTimer;