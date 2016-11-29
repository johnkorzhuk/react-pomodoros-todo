import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete-forever';
import { red500, grey500 } from 'material-ui/styles/colors';

const styles = {
  icon: {
    width: '25px',
    height: '25px',
    marginBottom: '2px',
  },
  button: {
    position: 'absolute',
    right: '160px',
    minHeight: '40px',
    minWidth: '40px',
    borderRadius: '50%'
  }
};

const TaskPrimaryButton = ({
  active,
  complete,
  id,
  removeTask,
  toggleActive,
}) => {
  let rippleColor = active
    ? grey500
    : red500;

  let Icon = active
    ? <Pause style={styles.icon}/>
    : <Play style={styles.icon}/>;

  return complete
      ? <IconButton
          style={styles.button}
          onClick={() => removeTask(id)}>
          <Delete/>
        </IconButton>
      : <FlatButton
          style={styles.button}
          icon={Icon}
          rippleColor={rippleColor}
          onClick={() => toggleActive(id, active)}/>

};

TaskPrimaryButton.propTypes = {
  active: PropTypes.bool,
  complete: PropTypes.bool,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  toggleActive: PropTypes.func,
};

export default TaskPrimaryButton;