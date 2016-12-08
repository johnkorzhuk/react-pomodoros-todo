import React, { Component, PropTypes } from 'react';

import TaskItem from './TaskItem/TaskItem';


class PomodoroTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breaking: false,
      elapsed: 0,
      prevTime: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    /* If elapsed has been updated, reset state.elapsed */
    if (this.props.elapsed !== nextProps.elapsed) {
      if (this.state.breaking && !nextProps.editing) {
        this.onBreakEnd();
      }
      this.setState({
        elapsed: 0,
      });
    }

    if (nextProps.active !== this.props.active) {
      /* Toggling active on another task during a break ends the
      break. */
      if (this.props.active && !nextProps.active) {
        if (this.state.breaking && !nextProps.editing) {
          this.onBreakEnd();
        }
      }

      if (nextProps.active) {
        this.interval = setInterval(this.onTick, 1000);
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
      elapsed,
      pomodoroGoal,
      title,
      breakTime,
      onePomodoroTime,
      onEdit,
      onEditComplete,
      removeTask,
      toggleComplete,
    } = this.props;

    const {
      breaking,
    } = this.state;

    const totalElapsed = this.state.breaking
      ? elapsed
      : this.state.elapsed + elapsed;

    const completedPomodoros = Math.floor(totalElapsed / onePomodoroTime);

    return (
      <TaskItem
        active={ active }
        complete={ complete }
        completedPomodoros={ completedPomodoros }
        editingTask={ editing }
        elapsed={ totalElapsed }
        pomodoroGoal={ pomodoroGoal }
        title={ title }
        breaking={ breaking }
        breakElapsed={ this.state.elapsed }
        breakTime={ breakTime }
        onePomodoroTime={ onePomodoroTime }
        onBreakEnd={ this.onBreakEnd }
        onBreakInit={ this.onBreakInit }
        onDelete={ removeTask }
        onEdit={ onEdit }
        onEditComplete={ onEditComplete }
        toggleActive={ this.onActiveToggle }
        toggleComplete={ toggleComplete }/>
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
    });

    // Todo this is a problem. Breakend should not be starting an interval. Error prone.
    this.interval = setInterval(this.onTick, 1000);
  };

  onBreakInit = () => {
    clearInterval(this.interval);

    this.setState({
      breaking: true,
      breakSkipped: false,
      elapsed: 0,
    });

    this.props.updateElapsed(this.state.elapsed + this.props.elapsed);

    this.interval = setInterval(this.onTick, 1000)
  };

  onActiveToggle = () => {
    if (this.props.active) {
      clearInterval(this.interval);

      this.props.updateElapsed(this.state.elapsed + this.props.elapsed);

      this.setState({
        elapsed: 0
      })
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
  pomodoroGoal: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  breakTime: PropTypes.number.isRequired,
  onePomodoroTime: PropTypes.number.isRequired,
  onEdit: PropTypes.func,
  onEditComplete: PropTypes.func,
  removeTask: PropTypes.func,
  toggleActive: PropTypes.func,
  toggleComplete: PropTypes.func.isRequired,
  updateElapsed: PropTypes.func,
};

export default PomodoroTimer;