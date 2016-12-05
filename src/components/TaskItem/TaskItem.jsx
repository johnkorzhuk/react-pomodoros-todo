import React, { Component, PropTypes } from 'react';
import IconButton from 'material-ui/IconButton';
import CheckboxComplete from 'material-ui/svg-icons/toggle/check-box';
import Checkbox from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import { grey600 } from 'material-ui/styles/colors';

import EditableTask from './EditableTask'
import PrimaryButton from './PrimaryButton';


const styles = {
  root: {
    padding: '0 140px 0 60px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  toggleComplete: {
    root: {
      position: 'absolute',
      left: 10,
      padding: 8,
      width: 40,
      height: 40,
    }
  }
};

class TaskItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newElapsed: 0,
      editingElapsed: false,
      editingTitle: false,
      showEditIcon: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.breaking) {
      if (nextProps.elapsed >= this.props.breakTime) {
        this.props.onBreakEnd();
      }
    }

    /* Included !this.props.editingTask so that when changing elapsed,
    a break isn't initialized */
    if (!this.props.breaking && !this.props.editingTask) {
      if (nextProps.completedPomodoros > this.props.completedPomodoros) {
        this.props.onBreakInit();
      }
    }

    /* Update state editingTask is toggled so checked in InputPomodoros
    can accurately represent the current elapsed time */
    if (nextProps.editingTask !== this.props.editingTask) {
      this.setState({
        newElapsed: this.props.elapsed,
        showEditIcon: false,
      });

      if (!nextProps.editingTask) {
        this.setState({
          editingTitle: false
        });
      }
    }
  }

  render() {
    const {
      active,
      complete,
      editingTask,
      pomodoroGoal,
      title,
      breaking,
      completedPomodoros,
      onePomodoroTime,
      onBreakEnd,
      onDelete,
      onEdit,
      onEditComplete,
      toggleActive,
    } = this.props;

    const {
      showEditIcon,
      editingTitle,
      editingElapsed,
      newElapsed,
    } = this.state;

    return (
      <div
        style={ styles.root }
        onMouseLeave={ this.onTaskMouseLeave }
        onMouseOver={ this.onTaskMouseOver }>

        <IconButton
          style={ styles.toggleComplete.root }
          onClick={ this.toggleComplete }>

          {complete
            ? <CheckboxComplete color={ grey600 } />
            : <Checkbox color={ grey600 }/> }
        </IconButton>

        <EditableTask
          active={ active }
          completedPomodoros={ completedPomodoros }
          editingTask={ editingTask }
          pomodoroGoal={ pomodoroGoal }
          title={ title }
          breaking={ breaking }
          editingElapsed={ editingElapsed }
          editingTitle={ editingTitle }
          pomodoros={ newElapsed/onePomodoroTime }
          showEditIcon={ showEditIcon }
          onEdit={ onEdit }
          onEditComplete={ onEditComplete }
          onEditTitle={ this.onEditTitle }
          onKeyEnter={ this.onKeyEnter.bind(this) }
          updateNewElapsedPom={ this.updateNewElapsedPom }
          updateTitle={ this.updateTitle }/>

        <PrimaryButton
          active={ active }
          complete={ complete }
          breaking={ breaking }
          onActiveToggle={ toggleActive }
          onBreakEnd={ onBreakEnd }
          onDelete={ onDelete }/>
      </div>
    );
  }

  onTaskMouseLeave = () => {
    this.setState({ showEditIcon: false })
  };

  onTaskMouseOver = () => {
    if (!this.state.showEditIcon) {
      this.setState({ showEditIcon: true });
    }
  };

  toggleComplete = () => {
    let elapsed = null;
    if (this.props.editingTask || this.state.editingElapsed) {
      elapsed = this.state.newElapsed;
    }

    this.props.toggleComplete(elapsed);
  };

  updateTitle = (title) => {
    this.title = title;
  };

  onTaskEditComplete = (title, elapsed, pomodoros) => {
    if (pomodoros) {
      pomodoros === this.props.completedPomodoros
        ? elapsed = 0
        : elapsed = pomodoros * this.props.onePomodoroTime
    }

    this.props.onEditComplete(title, elapsed);
  };

  onEditTitle = () => {
    this.setState({
      editingTitle: true
    });

    this.props.onEdit();
  };

  updateNewElapsedPom = (pomodoroIndex) => {
    const pomodoros = Math.floor(this.state.newElapsed / this.props.onePomodoroTime);

    if (pomodoroIndex === pomodoros) {
      this.setState({ newElapsed: 0 })
    }else {
      this.setState({
        newElapsed: pomodoroIndex * this.props.onePomodoroTime
      });
    }
  };

  onKeyEnter = (event, pomodoros) => {
    if (event.key === 'Enter') {
      pomodoros
        ? this.onTaskEditComplete(this.title, this.state.newElapsed, pomodoros)
        : this.onTaskEditComplete(event.target.value, this.state.newElapsed);
    }
  };
}

TaskItem.propTypes = {
  active: PropTypes.bool,
  complete: PropTypes.bool,
  completedPomodoros: PropTypes.number.isRequired,
  editingTask: PropTypes.bool,
  elapsed: PropTypes.number,
  pomodoroGoal: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  breaking: PropTypes.bool,
  breakTime: PropTypes.number.isRequired,
  onePomodoroTime: PropTypes.number.isRequired,
  onBreakEnd: PropTypes.func,
  onBreakInit: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onEditComplete: PropTypes.func,
  toggleActive: PropTypes.func,
  toggleComplete: PropTypes.func.isRequired,
  updateElapsed: PropTypes.func,
};

export default TaskItem;