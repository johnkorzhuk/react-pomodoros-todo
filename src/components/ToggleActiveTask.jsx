import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import { red500 } from 'material-ui/styles/colors';

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

const ToggleActiveTask = ({active}) => {
  const rippleColor = active ? null : red500;

  const Icon = active ?
    <Pause style={styles.icon}/> :
    <Play style={styles.icon}/>;

  return (
    <FlatButton
      style={styles.button}
      icon={Icon}
      rippleColor={rippleColor}/>
  );
};

ToggleActiveTask.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default ToggleActiveTask;