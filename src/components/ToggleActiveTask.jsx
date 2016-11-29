import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
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

const ToggleActiveTask = ({
  active,
  complete,
  id,
  toggleActive,
}) => {

  let rippleColor = active
    ? grey500
    : red500;

  let Icon = active
    ? <Pause style={styles.icon}/>
    : <Play style={styles.icon}/>;

  if (!complete) {
    return (
      <FlatButton
        style={styles.button}
        icon={Icon}
        rippleColor={rippleColor}
        onClick={() => toggleActive(id, active)}/>
    );
  }
  return null;

};

ToggleActiveTask.propTypes = {
  active: PropTypes.bool,
  complete: PropTypes.bool,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  toggleActive: PropTypes.func,
};

export default ToggleActiveTask;