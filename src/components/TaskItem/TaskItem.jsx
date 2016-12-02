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
    if (nextProps.editing !== this.props.editing) {
      this.setState(prevState =>
        prevState.showEditIcon = false
      );
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
      completedPomodoros,
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
            onCheck={toggleComplete}/>

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
            onActiveToggle={toggleActive}
            removeTask={onDelete}/>

          <Pomodoros>
            <CreatePomodoros amount={5}>
              {index => {
                return (
                  <li
                    key={index}
                    style={styles.pomodoro}>
                    <ProgressPomodoro
                      isComplete={index < completedPomodoros}
                      isActive={index === completedPomodoros && active}
                      isTarget={index < pomodoros}/>
                  </li>
                );
              }}
            </CreatePomodoros>
          </Pomodoros>
        </div>

        {active && <Timebar
          completedPomodoros={completedPomodoros}
          elapsed={elapsed}/>}
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
  completedPomodoros: PropTypes.number.isRequired,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onEditComplete: PropTypes.func,
  toggleActive: PropTypes.func,
  toggleComplete: PropTypes.func.isRequired,
  updateElapsed: PropTypes.func,
};

export default TaskItem;