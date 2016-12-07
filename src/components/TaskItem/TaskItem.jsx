import React, { Component, PropTypes } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Checkmark from 'material-ui/svg-icons/action/done';
import IconButton from 'material-ui/IconButton';
import CheckboxComplete from 'material-ui/svg-icons/toggle/check-box';
import Checkbox from 'material-ui/svg-icons/toggle/check-box-outline-blank';
import { grey600, red500 } from 'material-ui/styles/colors';

import EditableTask from './EditableTask'
import PrimaryButton from './PrimaryButton';
import Timebar from '../Timebar';


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
  },
  button: {
    root: {
      position: 'absolute',
      left: 15,
      flex: 1
    },
    icon: {
      height: 30,
      width: 30,
    },
  },
};

class TaskItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newElapsed: 0,
      editingTitle: false,
      showEditIcon: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.breaking) {
      if (nextProps.breakElapsed >= this.props.breakTime) {
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
    if (this.props.editingTask !== nextProps.editingTask) {
      this.title = this.props.title;

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
      elapsed,
      pomodoroGoal,
      title,
      breaking,
      breakElapsed,
      breakTime,
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
      newElapsed,
    } = this.state;

    let renderTimeBar;
    if (active || editingTask) {
      renderTimeBar = true;
    }

    return (
    <li className="task-item">
      <div
        style={ styles.root }
        onMouseLeave={ this.onTaskMouseLeave }
        onMouseOver={ this.onTaskMouseOver }>

        <EditableTask
          active={ active }
          completedPomodoros={ completedPomodoros }
          editingTask={ editingTask }
          pomodoroGoal={ pomodoroGoal }
          title={ title }
          breaking={ breaking }
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

        {editingTask && !this.state.editingTitle
          ? <FloatingActionButton
          style={ styles.button.root }
          backgroundColor={ red500 }
          iconStyle={ styles.button.icon }
          onClick={ () =>
            this.onTaskEditComplete(this.title, this.state.newElapsed) }>
          <Checkmark style={ {width: 24} }/>
        </FloatingActionButton>

          : <IconButton
          style={ styles.toggleComplete.root }
          onClick={ this.toggleComplete }>
          {complete
            ? <CheckboxComplete color={ grey600 } />
            : <Checkbox color={ grey600 }/> }
        </IconButton> }

      </div>

      {renderTimeBar &&
      <Timebar
        elapsed={
          breaking
            ? breakElapsed
            : elapsed - (completedPomodoros * onePomodoroTime) }
        breaking={ breaking }
        breakTime={ breakTime }
        onePomodoroTime={ onePomodoroTime }/> }
    </li>


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
    let elapsed = this.props.elapsed;
    if (this.props.editingTask) {
      elapsed = this.state.newElapsed;
    }

    this.props.toggleComplete(elapsed);
  };

  updateTitle = (title) => {
    this.title = title;
  };

  onTaskEditComplete = (newTitle, newElapsed, pomodoroIndex) => {
    if (pomodoroIndex) {
      this.props.completedPomodoros === pomodoroIndex
        ? newElapsed = 0
        : newElapsed = this.props.onePomodoroTime * pomodoroIndex
    }

    this.props.onEditComplete(newTitle, newElapsed);
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

  onKeyEnter = (event, pomodoroIndex) => {
    if (event.key === 'Enter') {
      pomodoroIndex
        ? this.onTaskEditComplete(this.title, null, pomodoroIndex)
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
  breakElapsed: PropTypes.number,
  breakTime: PropTypes.number.isRequired,
  onePomodoroTime: PropTypes.number.isRequired,
  onBreakEnd: PropTypes.func,
  onBreakInit: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onEditComplete: PropTypes.func,
  toggleActive: PropTypes.func,
  toggleComplete: PropTypes.func.isRequired,
};

export default TaskItem;