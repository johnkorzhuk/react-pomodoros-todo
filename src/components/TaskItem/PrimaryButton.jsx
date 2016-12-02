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
  onActiveToggle,
  onBreakEnd,
  onDelete,
}) => {
  const rippleColor =
    active
      ? grey500
      : red500;

  const Icon =
    active
      ? <Pause style={styles.primaryButton.icon}/>
      : <Play style={styles.primaryButton.icon}/>;

  return complete
    ? <IconButton
        style={styles.primaryButton.button}
        onClick={onDelete}>
        <Delete/>
      </IconButton>
    : breaking
      ? <FlatButton
          style={styles.primaryButton.button}
          icon={<Skip style={Object.assign({fill: green500}, styles.primaryButton.icon)}/>}
          rippleColor={grey500}
          onClick={onBreakEnd}/>
      : <FlatButton
          style={styles.primaryButton.button}
          icon={Icon}
          rippleColor={rippleColor}
          onClick={onActiveToggle}/>;
};

PrimaryButton.propTypes = {
  active: PropTypes.bool,
  complete: PropTypes.bool,
  breaking: PropTypes.bool.isRequired,
  onActiveToggle: PropTypes.func,
  onBreakEnd: PropTypes.func,
  onDelete: PropTypes.func,
};

export default PrimaryButton;