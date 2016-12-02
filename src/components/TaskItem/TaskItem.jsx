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
    padding: '0 20px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
  pomodoro: {
    display: 'inline-block',
  },
};

class TaskItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showEditIcon: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.breaking && nextProps.elapsed >= this.props.breakTime) {
      this.props.onBreakEnd();
    }

    if (!this.props.breaking && nextProps.completedPomodoros !== this.props.completedPomodoros) {
      this.props.onBreakInit();
    }

    if (nextProps.editing !== this.props.editing) {
      this.setState({showEditIcon: false});
    }
  }

  render() {
    const {
      active,
      complete,
      editing,
      elapsed,
      pomodoros,
      title,
      breaking,
      completedPomodoros,
      breakTime,
      onePomodoroTime,
      onBreakEnd,
      onDelete,
      onEdit,
      onEditComplete,
      toggleActive,
      toggleComplete,
    } = this.props;
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
            onCheck={
              () => toggleComplete(breaking ? null : elapsed)
            }/>

          <EditableTaskTitle
            editing={editing}
            title={title}
            showEditIcon={this.state.showEditIcon}
            onEdit={onEdit}
            onEditComplete={onEditComplete}
            onTitleMouseOver={this.onTitleMouseOver}
            onTitleMouseLeave={this.onTitleMouseLeave}/>

          <PrimaryButton
            active={active}
            complete={complete}
            breaking={breaking}
            onActiveToggle={toggleActive}
            onBreakEnd={onBreakEnd}
            onDelete={onDelete}/>

          <Pomodoros>
            <CreatePomodoros amount={5}>
              {index => {
                return (
                  <li
                    key={index}
                    style={styles.pomodoro}>
                    <ProgressPomodoro
                      isActive={
                        index === completedPomodoros
                        && active
                        && !breaking
                      }
                      isComplete={
                        index < completedPomodoros
                      }
                      isTarget={
                        index < pomodoros
                      }/>
                  </li>
                );
              }}
            </CreatePomodoros>
          </Pomodoros>
        </div>

        {active &&
        <Timebar
          breakTime={breakTime}
          onePomodoroTime={onePomodoroTime}
          breaking={breaking}
          elapsed={
            breaking
              ? elapsed
              : elapsed-(completedPomodoros*onePomodoroTime)
          }/>
        }
      </li>
    );
  }

  onTitleMouseLeave = () => {
    this.setState({showEditIcon: false})
  };

  onTitleMouseOver = () => {
    if (!this.state.showEditIcon) {
      this.setState({showEditIcon: true});
    }
  };
}

TaskItem.propTypes = {
  active: PropTypes.bool,
  complete: PropTypes.bool,
  editing: PropTypes.bool,
  elapsed: PropTypes.number,
  pomodoros: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  breakElapsed: PropTypes.number,
  breaking: PropTypes.bool,
  completedPomodoros: PropTypes.number.isRequired,
  breakTime: PropTypes.number.isRequired,
  onePomodoroTime: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onEditComplete: PropTypes.func,
  toggleActive: PropTypes.func,
  toggleComplete: PropTypes.func.isRequired,
  updateElapsed: PropTypes.func,
};

export default TaskItem;