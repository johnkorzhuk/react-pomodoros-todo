import React, { PropTypes } from 'react';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import Lens from 'material-ui/svg-icons/image/lens';
import CircularProgress from 'material-ui/CircularProgress';
import { red500, grey300, grey600 } from 'material-ui/styles/colors';

const styles = {
  active: {
    inner: {
      position: 'absolute',
      bottom: '2px',
      boxShadow: `0 0 0 2px ${grey600} inset`,
      borderRadius: '50%'
    },
    root: {
      margin: '0 2px'
    }
  }
};

const Pomodoro = (props) => {
  const {
    taskIsComplete,
    isActive,
    isTarget,
    isComplete,
  } = props;


  if (isComplete) {
    return <Lens style={{color: red500}}/>;
  }

  if (isActive) {
    return <CircularProgress
      size={20}
      thickness={2}
      innerStyle={isTarget ?
        Object.assign({backgroundColor: grey600, borderRadius: '50%'}, styles.active.inner) :
        styles.active.inner}
      style={styles.active.root}/>
  }

  if (isTarget) {
    return <Lens style={{color: taskIsComplete ? grey300 : grey600}}/>;
  }

  return <RadioButtonUnchecked style={{color: taskIsComplete ? grey300 : grey600}}/>;

};

Pomodoro.propTypes = {
  taskIsComplete: PropTypes.bool,
  isActive: PropTypes.bool,
  isTarget: PropTypes.bool,
  isComplete: PropTypes.bool
};

export default Pomodoro;