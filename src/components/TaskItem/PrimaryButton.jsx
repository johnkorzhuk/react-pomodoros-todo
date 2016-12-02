import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Play from 'material-ui/svg-icons/av/play-arrow';
import Pause from 'material-ui/svg-icons/av/pause';
import Skip from 'material-ui/svg-icons/av/skip-next';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import { red500, grey500, green500 } from 'material-ui/styles/colors';


const styles = {
  primaryButton: {
    icon: {
      width: '25px',
      height: '25px',
      marginBottom: '2px',
    },
    button: {
      position: 'absolute',
      right: '150px',
      minHeight: '40px',
      minWidth: '40px',
      borderRadius: '50%'
    },
  },
};

const PrimaryButton = ({
  active,
  complete,
  breaking,
  removeTask,
  onActiveToggle,
}) => {
  const rippleColor =
    active
      ? breaking
        ? green500
        : grey500
      : red500;

  const ToggleActive =
    active
      ? <Pause style={styles.primaryButton.icon}/>
      : <Play style={styles.primaryButton.icon}/>;

  const Icon =
    breaking
      ? <Skip style={Object.assign({fill: green500}, styles.primaryButton.icon)}/>
      : ToggleActive;

  return complete
    ? <IconButton
        style={styles.primaryButton.button}
        onClick={removeTask}>
        <Delete/>
      </IconButton>
    : <FlatButton
        style={styles.primaryButton.button}
        icon={Icon}
        rippleColor={rippleColor}
        onClick={onActiveToggle}/>;
};

PrimaryButton.propTypes = {
  active: PropTypes.bool.isRequired,
  complete: PropTypes.bool.isRequired,
  breaking: PropTypes.bool.isRequired,
  onActiveToggle: PropTypes.func,
  removeTask: PropTypes.func,
};

export default PrimaryButton;