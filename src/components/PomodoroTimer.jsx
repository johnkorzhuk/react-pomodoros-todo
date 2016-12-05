import React, { Component, PropTypes } from 'react';

import TaskItem from './TaskItem/TaskItem';
import Timebar from './Timebar';

class PomodoroTimer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breaking: false,
      breakSkipped: false,
      breakTime: 300000,
      onePomodoroTime: 1500000,
      elapsed: 0,
      prevTime: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    /* Any time active is toggled, update previous time */
    if (nextProps.active !== this.props.active) {
      if (this.props.editingComponent) {
        this.setState({
          prevTime: Date.now()
        });
      }

      /* Toggling active on another task during a break ends the
      break. */
      if (this.props.active && !nextProps.active) {
        if (this.state.breaking && !nextProps.editing) {
          console.log('yo');
          clearInterval(this.interval);
          this.setState({
            breaking: false
          });
        }
      }

      /* Start the interval if the task is set to active. Clear it
      if we're not editing and active has been set to false,
      otherwise editing will clear the interval, even if breaking */
      if (nextProps.active) {
        this.interval = setInterval(this.onTick, 1000);
      }else if(!nextProps.editing){
        clearInterval(this.interval);
      }
    }

    /* During a break and during editing, toggling another task to active
    ends the break */
    if (this.props.elapsed !== nextProps.elapsed) {
      if (this.state.breaking && this.props.editing) {
        clearInterval(this.interval);
        this.setState({
          breaking: false
        });
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
      onEdit,
      onEditComplete,
      removeTask,
      toggleComplete,
      updateElapsed,
    } = this.props;

    const {
      breaking,
      onePomodoroTime,
      breakTime,
    } = this.state;

    const totalElapsed = this.state.breaking
      ? elapsed
      : this.state.elapsed + elapsed;

    const completedPomodoros = Math.floor(totalElapsed / onePomodoroTime);

    let renderTimeBar = false;
    if (active || this.state.breaking) {
      renderTimeBar = true;
    }

    return (
      <li className="task-item">
        <TaskItem
          active={ active }
          complete={ complete }
          completedPomodoros={  completedPomodoros }
          editingTask={ editing }
          elapsed={ totalElapsed }
          pomodoroGoal={ pomodoroGoal }
          title={ title }
          breaking={ breaking && !this.state.breakSkipped }
          breakElapsed={ this.state.elapsed }
          breakTime={ breakTime }
          onePomodoroTime={ onePomodoroTime }
          onBreakEnd={ this.onBreakEnd }
          onBreakInit={ this.onBreakInit }
          onDelete={ removeTask }
          onEdit={ onEdit }
          onEditComplete={ onEditComplete }
          toggleActive={ this.onActiveToggle }
          toggleComplete={ toggleComplete }
          updateElapsed={ updateElapsed }/>

        {renderTimeBar &&
        <Timebar
          elapsed={
            breaking
              ? this.state.elapsed
              : totalElapsed-(completedPomodoros*onePomodoroTime) }
          breaking={ breaking }
          breakTime={ breakTime }
          onePomodoroTime={ onePomodoroTime }/> }
      </li>

    );
  }

  onTick = () => {
    const now = Date.now();
    this.setState({
      prevTime: now,
      elapsed: this.state.elapsed + (now - this.state.prevTime),
    });
  };

  onBreakEnd = (skip) => {
    if (skip) {
      this.setState({
        breakSkipped: true
      })
    }

    clearInterval(this.interval);

    this.setState({
      breaking: false,
      elapsed: 0,
      prevTime: Date.now()
    });

    this.interval = setInterval(this.onTick, 1000);
  };

  onBreakInit = () => {
    clearInterval(this.interval);

    this.setState({
      breaking: true,
      breakSkipped: false,
      elapsed: 0,
      prevTime: Date.now(),
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
  editingComponent: PropTypes.bool.isRequired,
  onEdit: PropTypes.func,
  onEditComplete: PropTypes.func,
  removeTask: PropTypes.func,
  toggleActive: PropTypes.func,
  toggleComplete: PropTypes.func.isRequired,
  updateElapsed: PropTypes.func,
};

export default PomodoroTimer;