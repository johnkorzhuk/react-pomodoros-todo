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

/* Memoize {hms} for given index of an InputPomodor. */
const pomodoroIndexToHMS = (index, onePomodoroTime) => {
  if (!pomodoroIndexToHMS.pomodorosHMS) {
    pomodoroIndexToHMS.pomodorosHMS = [];
  }

  if (pomodoroIndexToHMS.pomodorosHMS[index] !== undefined) {
    return pomodoroIndexToHMS.pomodorosHMS[index];
  }

  return pomodoroIndexToHMS.pomodorosHMS[index] = msToHMS(
    (index+1) * onePomodoroTime
  );
};

class TaskItem extends Component {
  constructor(props) {
    super(props);
    /* I chose to use the hh:mm:ss format for props.elapsed
    instead of ms because changes in ElapsedInput are more expensive
    than changes in InputPomodoros. Additionally, the user can use arrow
    keys to change elapsed in ElapsedInput, which can cause >16 fps and
    hangs. */
    this.state = {
      hms: {},
      editingTitle: false,
      showEditIcon: false,
    };

    this.diff = 0;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.active) {
      if (this.props.editingTask && !this.state.editingTitle) {
        this.diff += nextProps.elapsed - this.props.elapsed;
        this.setState(prevState =>
          prevState.hms = {
            ...prevState.hms,
            ...msToHMS(this.diff)
          }
        );
      }
    }

    /* Set state.hms upon editingTask so that InputPomodoros
    and Timebar can accurately represent the changes in state.hms */
    if (this.props.editingTask !== nextProps.editingTask) {
      if (nextProps.editingTask) {
        this.title = this.props.title;

        this.setState({
          hms: msToHMS(this.props.elapsed),
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
      onEdit,
      toggleActive,
    } = this.props;

    const {
      showEditIcon,
      editingTitle,
      hms,
    } = this.state;

    const editing = editingTask && !editingTitle;

    const completedPomodoros = editing
      ? Math.floor(msFromHMS(hms) / onePomodoroTime)
      : this.props.completedPomodoros;

    // eslint-disable-next-line
    const renderTimeBar = active || editing || breaking;

    let elapsed = breaking
      ? breakElapsed
      : editing
        ? msFromHMS(hms) % onePomodoroTime
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
            onEdit={ onEdit }
            onEditComplete={ this.onTaskEditComplete }
            onEditTitle={ this.onEditTitle }
            handleKeyInput={ this.handleKeyInput.bind(this) }
            updateHMSPom={ this.updateHMSPom }
            updateTitle={ this.updateTitle }/>

          {editing
            ? <ElapsedInput
                hms={ this.state.hms }
                handleKeyInput={ this.handleKeyInput.bind(this) }
                updateHMS={ this.updateHMS }/>
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
                  this.onTaskEditComplete(this.title) }>
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
    let elapsed = msFromHMS(this.state.hms);
    let title = this.title;

    switch (type) {
      case 'index':
        value === Math.floor(
          msFromHMS(this.state.hms) / this.props.onePomodoroTime
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
          editing: false,
          elapsed,
          title,
        };

        this.diff = 0;
      }else {
        updatedTask = {
          editing: false,
          title,
        };
      }

    this.props.updateTask(updatedTask);

    this.setState({
      editingTitle: false
    });
  };

  onEditTitle = () => {
    this.setState({
      editingTitle: true
    });

    this.props.onEdit();
  };

  updateHMS = (newVal) => {
    const hms = {
      ...this.state.hms,
      ...newVal
    };

    console.log(Object.values(hms));


    this.setState({ hms })
  };

  updateHMSPom = (pomodoroIndex) => {
    const elapsed = this.props.editingTask && !this.state.editingTitle
      ? msFromHMS(this.state.hms)
      : this.props.elapsed;

    const pomodoros = Math.floor(
      elapsed / this.props.onePomodoroTime
    );

    let hms;
    if (pomodoroIndex+1 === pomodoros) {
      hms = {
        hh: 0,
        mm: 0,
        ss: 0,
      };
    }else {
      hms = pomodoroIndexToHMS(pomodoroIndex, this.props.onePomodoroTime);
    }

    this.setState({ hms });
  };

  handleKeyInput(event, type, value) {
    switch (event.key) {

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