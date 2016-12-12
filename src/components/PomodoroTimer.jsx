import React, { Component, PropTypes } from 'react';

import TaskItem from './TaskItem/TaskItem';


class PomodoroTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elapsed: 0,
      prevTime: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    /* When we've completed editing in TaskItem, task.elapsed is updated.
    state.elapsed needs to be set to 0. This is an implicit approach. It
    likely would have been better to pass a fn down to TaskItem explicitly
    resetting elapsed and prevTime*/
    if (this.props.elapsed !== nextProps.elapsed) {
      if (!nextProps.editing && !this.props.breaking) {
        this.setState({
          elapsed: 0,
          prevTime: Date.now()
        });
      }
    }

    /* Toggling active on another task sets breaking to false. We need to
    reset the timer. */
    if (this.props.breaking !== nextProps.breaking) {
      console.log(this.props.editing);
      if (nextProps.breaking) {
        this.interval = setInterval(this.onTick, this.props.intervalDelay);
      }else {
        this.resetTimer();
      }
    }

    if (this.props.active !== nextProps.active) {
      /* Setting prevTime here takes care of setting it for task.breaking
      since when a break is initialized, active is set to false,
      triggering this code block. */
      this.setState({ prevTime: Date.now() });

      if (nextProps.active) {
        this.interval = setInterval(this.onTick, this.props.intervalDelay);
      }else
        /* Don't update elapsed or reset the timer if we're going
        to take a break. onBreakInit already does that. */
        if (!nextProps.breaking) {
          this.updateElapsed();
          this.resetTimer();
        }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      active,
      breaking,
      complete,
      editing,
      elapsed,
      intervalDelay,
      pomodoroGoal,
      title,
      breakTime,
      onePomodoroTime,
      onEditComplete,
      removeTask,
      toggleActive,
      updateTask,
    } = this.props;

    this.totalElapsed = breaking
      ? elapsed
      : this.state.elapsed + elapsed;

    const completedPomodoros = Math.floor(this.totalElapsed / onePomodoroTime);

    return (
      <TaskItem
        active={ active }
        breaking={ breaking }
        complete={ complete }
        completedPomodoros={ completedPomodoros }
        editingTask={ editing }
        elapsed={ this.totalElapsed }
        intervalDelay={ intervalDelay }
        pomodoroGoal={ pomodoroGoal }
        title={ title }
        breakElapsed={ this.state.elapsed }
        breakTime={ breakTime }
        onePomodoroTime={ onePomodoroTime }
        onBreakEnd={ this.onBreakEnd }
        onBreakInit={ this.onBreakInit }
        onDelete={ removeTask }
        onEditComplete={ onEditComplete }
        toggleActive={ toggleActive }
        updateTask={ updateTask }/>
    );
  }

  updateElapsed = () => {
    const updatedTask = {
      elapsed: this.totalElapsed
    };

    this.props.updateTask(updatedTask);
  };

  onBreakEnd = () => {
    const updatedTask = {
      active: true,
      breaking: false,
    };

    this.resetTimer();

    this.props.updateTask(updatedTask);
  };

  onBreakInit = () => {
    const updatedTask = {
      active: false,
      breaking: true,
      elapsed: this.totalElapsed
    };

    this.resetTimer();

    this.props.updateTask(updatedTask);
  };

  onTick = () => {
    const now = Date.now();

    this.setState({
      prevTime: now,
      elapsed:  this.state.elapsed + (now - this.state.prevTime),
    });

    if (this.props.active && !this.props.editing &&
      this.totalElapsed % this.props.onePomodoroTime < this.props.intervalDelay) {
        console.log(this.totalElapsed % this.props.onePomodoroTime);
        this.onBreakInit();
    }

    if (this.props.breaking &&
      this.state.elapsed >= this.props.breakTime) {
        this.onBreakEnd();
    }
  };

  resetTimer = () => {
    clearInterval(this.interval);

    this.setState({
      elapsed: 0,
      prevTime: 0,
    });
  };
}

PomodoroTimer.propTypes = {
  active: PropTypes.bool,
  breaking: PropTypes.bool,
  complete: PropTypes.bool,
  editing: PropTypes.bool,
  elapsed: PropTypes.number,
  /* Delay between update of state.elapsed, this will cause a re-render
  by at least this time in ms */
  intervalDelay: PropTypes.number.isRequired,
  pomodoroGoal: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  breakTime: PropTypes.number.isRequired,
  onePomodoroTime: PropTypes.number.isRequired,
  onEditComplete: PropTypes.func,
  removeTask: PropTypes.func,
  toggleActive: PropTypes.func,
  toggleBreaking: PropTypes.func,
  updateTask: PropTypes.func.isRequired,
};

export default PomodoroTimer;