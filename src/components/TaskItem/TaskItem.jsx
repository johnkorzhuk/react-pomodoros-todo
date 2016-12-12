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
import ElapsedInput from './ElapsedInput';
import { msToHMS, msFromHMS } from '../../helpers';


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
      editedElapsed: 0,
      editingTitle: false,
      showEditIcon: false,
    };

    this.active = false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active) {
      if (this.props.editingTask && !this.state.editingTitle) {
        this.setState(prevState =>
          prevState.editedElapsed += nextProps.elapsed - this.props.elapsed
        );
      }
    }

    /* Set state.editedElapsed upon editingTask so that InputPomodoros
    and Timebar can accurately represent the changes in state.editedElapsed */
    if (this.props.editingTask !== nextProps.editingTask) {
      if (this.props.active) {
        this.active = true;
      }

      this.title = this.props.title;
      if (nextProps.editingTask) {
        this.setState({
          editedElapsed: this.props.elapsed,
          showEditIcon: false,
        });
      }
    }
  }

  render() {
    const {
      active,
      breaking,
      complete,
      editingTask,
      pomodoroGoal,
      title,
      breakElapsed,
      breakTime,
      onePomodoroTime,
      onBreakEnd,
      onDelete,
      toggleActive,
    } = this.props;

    const {
      showEditIcon,
      editingTitle,
      editedElapsed,
    } = this.state;

    let editing = editingTask && !editingTitle;

    let completedPomodoros = editing
      ? Math.floor(editedElapsed / onePomodoroTime)
      : this.props.completedPomodoros;

    // eslint-disable-next-line
    let renderTimeBar = active || editing || breaking;

    let elapsed = breaking
      ? breakElapsed
      : editing
        ? editedElapsed % onePomodoroTime
        : this.props.elapsed % onePomodoroTime;

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
            showEditIcon={ showEditIcon }
            onEdit={ this.onEdit }
            onEditComplete={ this.onTaskEditComplete }
            onEditTitle={ this.onEditTitle }
            handleKeyInput={ this.handleKeyInput.bind(this) }
            updateHMSPom={ this.updateHMSPom }
            updateTitle={ this.updateTitle }/>

          {editing
            ? <ElapsedInput
                editing={ editing }
                hms={
                  this.hms = msToHMS(this.state.editedElapsed) }
                handleKeyInput={ this.handleKeyInput.bind(this) }
                updateEditedElapsed={ this.updateEditedElapsed }/>
            : <PrimaryButton
                active={ active }
                complete={ complete }
                breaking={ this.props.breaking }
                onActiveToggle={ toggleActive }
                onBreakEnd={ onBreakEnd }
                onDelete={ onDelete }/> }

          {editing
            ? <FloatingActionButton
                style={ styles.button.root }
                backgroundColor={ red500 }
                iconStyle={ styles.button.icon }
                onClick={ () =>
                  this.onTaskEditComplete('button') }>
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
            elapsed={ elapsed }
            breaking={ breaking }
            breakTime={ breakTime }
            onePomodoroTime={ onePomodoroTime }/> }
      </li>
    );
  }

  onTaskMouseLeave = () => {
    if (!this.props.editingTask) {
      this.setState({ showEditIcon: false });
    }
  };

  onTaskMouseOver = () => {
    if (!this.state.showEditIcon &&
      !this.props.editingTask) {
        this.setState({ showEditIcon: true });
    }
  };

  toggleComplete = () => {
    const updatedTask = {
      active: false,
      breaking: false,
      complete: !this.props.complete,
      editing: false,
      elapsed: this.props.elapsed,
    };

    this.props.updateTask(updatedTask);
  };

  updateTitle = (title) => {
    this.title = title;
  };

  onTaskEditComplete = (type, value) => {
    let elapsed = this.state.editedElapsed;
    let title = this.title;

    if (type === 'hms' || 'button') {
      Object.keys(this.hms)
        .filter(key =>
          this.hms[key] < 0
        ).map(key =>
          this.hms[key] = 0
      );

      elapsed = msFromHMS(this.hms)
    }

    switch (type) {
      case 'index':
        // use this.completedPomodoros calculated in render?
        value === Math.floor(
          this.state.editedElapsed / this.props.onePomodoroTime
        )
          ? elapsed = 0
          : elapsed = (value+1) * this.props.onePomodoroTime;
        break;

      case 'title':
        title = value;
        break;

      default:
        break;
    }

    let updatedTask = {};
    if (this.props.editingTask && !this.state.editingTitle) {
      updatedTask = {
        active: this.active,
        editing: false,
        elapsed,
        title,
      };
    }else {
      updatedTask = {
        editing: false,
        title,
      };
    }

    this.props.updateTask(updatedTask);

    this.active = false;

    this.setState({
      editingTitle: false
    });
  };

  onEdit = () => {
    const updatedTask = {
      active: false,
      editing: true,
    };

    this.props.updateTask(updatedTask);
  };

  onEditTitle = () => {
    this.setState({
      editingTitle: true
    });

    const updatedTask = {
      editing: true
    };

    this.props.updateTask(updatedTask);
  };

  updateEditedElapsed = (newVal) => {
    this.hms = {
      ...this.hms,
      ...newVal,
    };

    const setEditedElapsed = Object.keys(this.hms)
      .some(key =>
        this.hms[key] === -1 ||
        this.hms[key] === 60
      );

     if (setEditedElapsed) {
       this.setState({
         editedElapsed: msFromHMS(this.hms)
       })
     }
  };

  // updateHMSPom = (pomodoroIndex) => {
  //   const elapsed = this.props.editingTask && !this.state.editingTitle
  //     ? msFromHMS(this.state.hms)
  //     : this.props.elapsed;
  //
  //   const pomodoros = Math.floor(
  //     elapsed / this.props.onePomodoroTime
  //   );
  //
  //   let hms;
  //   if (pomodoroIndex+1 === pomodoros) {
  //     hms = {
  //       hh: 0,
  //       mm: 0,
  //       ss: 0,
  //     };
  //   }else {
  //     hms = pomodoroIndexToHMS(pomodoroIndex, this.props.onePomodoroTime);
  //   }
  //
  //   this.setState({ hms });
  // };

  handleKeyInput = (event, type, value) => {
    switch (event.key) {
      case 'ArrowUp':
        this.setState({
          editedElapsed: msFromHMS(this.hms)
        });
        break;

      case 'ArrowDown':
        this.setState({
          editedElapsed: msFromHMS(this.hms)
        });
        break;

      case 'Enter':
        this.onTaskEditComplete(type, value);
        break;

      case 'Escape':
        this.props.updateTask({editing: false});
        break;

      default:
        break;
    }
  }
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
  updateTask: PropTypes.func.isRequired,
};

export default TaskItem;