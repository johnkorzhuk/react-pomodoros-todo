import React, { PropTypes } from 'react';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import Lens from 'material-ui/svg-icons/image/lens';
import CircularProgress from 'material-ui/CircularProgress';
import { red500, grey500 } from 'material-ui/styles/colors';

const styles = {
  active: {
    inner: {
      position: 'absolute',
      bottom: '2px',
      boxShadow: `0 0 0 2px ${grey500} inset`,
      borderRadius: '50%'
    },
    root: {
      margin: '0 2px'
    },
    target: {
      backgroundColor: grey500,
      borderRadius: '50%'
    }
  }
};

const ProgressPomodoro = (props) => {
  const {
    isActive,
    isTarget,
    isComplete,
  } = props;

  if (isComplete) {
    return <Lens style={{color: red500}}/>;
  }

  if (isActive) {
    return <CircularProgress
      color={red500}
      size={20}
      thickness={2}
      innerStyle={isTarget ?
        Object.assign({}, styles.active.target, styles.active.inner) :
        styles.active.inner}
      style={styles.active.root}/>
  }

  if (isTarget) {
    return <Lens style={{color: grey500}}/>;
  }

  return <RadioButtonUnchecked style={{color: grey500}}/>;

};

ProgressPomodoro.propTypes = {
  isActive: PropTypes.bool,
  isTarget: PropTypes.bool,
  isComplete: PropTypes.bool
};

export default ProgressPomodoro;