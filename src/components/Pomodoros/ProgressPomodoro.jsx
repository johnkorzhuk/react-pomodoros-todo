/* eslint-disable */
import React, { PropTypes } from 'react';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import Lens from 'material-ui/svg-icons/image/lens';
import CircularProgress from 'material-ui/CircularProgress';
import { red500, grey500 } from 'material-ui/styles/colors';
import CreatePomodoros from './CreatePomodoros';

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
  },
  pomodoro: {
    display: 'inline-block',
  },
};

const Progress = (props) => {
  const {
    isActive,
    isTarget,
    isComplete,
  } = props;

  return (
    isComplete &&
      <Lens style={{color: red500}}/>
    ||
    isActive &&
      <CircularProgress
        color={red500}
        size={20}
        thickness={2}
        innerStyle={isTarget ?
          Object.assign({}, styles.active.target, styles.active.inner) :
          styles.active.inner}
        style={styles.active.root}/>
    ||
    isTarget &&
      <Lens style={{color: grey500}}/>
    ||
    <RadioButtonUnchecked style={{color: grey500}}/>);
};

const ProgressPomodoro = ({
  active,
  breaking,
  completedPomodoros,
  pomodoros,
  editing,
}) => {
  return (
    <CreatePomodoros amount={5}>
      {index => {
        return (
          <div
            key={index}
            style={styles.pomodoro}>
            <Progress
              isActive={
                index === completedPomodoros &&
                active &&
                !breaking
              }
              isComplete={
                index < completedPomodoros &&
                !editing
              }
              isTarget={
                index < pomodoros
              }/>
          </div>
        );
      }}
    </CreatePomodoros>
  );
};

ProgressPomodoro.propTypes = {
  active: PropTypes.bool,
  breaking: PropTypes.bool,
  completedPomodoros: PropTypes.number,
  pomodoros: PropTypes.number,
};

export default ProgressPomodoro;