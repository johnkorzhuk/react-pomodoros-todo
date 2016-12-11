/* eslint-disable */
import React, { PropTypes } from 'react';
import Lens from 'material-ui/svg-icons/image/lens';
import CircularProgress from 'material-ui/CircularProgress';
import RadioButtonUnchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import { red500, grey500 } from 'material-ui/styles/colors';

import CreatePomodoros from './CreatePomodoros';


const styles = {
  pomodoro: {
    display: 'inline-block',
  },
  active: {
    inner: {
      position: 'absolute',
      bottom: '2px',
      boxShadow: `0 0 0 2px ${ grey500 } inset`,
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

const Progress = (props) => {
  const {
    isActive,
    isComplete,
    isTarget,
  } = props;

  return (
    <div style={ styles.pomodoro }>
      {isComplete &&
        <Lens style={ {color: red500} }/> ||

      isActive &&
        <CircularProgress
          style={ styles.active.root }
          color={ red500 }
          size={ 20 }
          thickness={ 2 }
          innerStyle={
            isTarget
              ? Object.assign({},
                  styles.active.target,
                  styles.active.inner)
              : styles.active.inner }/> ||

      isTarget &&
        <Lens style={ {color: grey500} }/> ||

      <RadioButtonUnchecked style={ {color: grey500} }/> }
    </div>
  );
};

const ProgressPomodoro = ({
  active,
  breaking,
  completedPomodoros,
  pomodoroGoal,
  editing,
  rootStyles,
}) => {
  return (
    <CreatePomodoros
      amount={ 5 }
      rootStyles={ rootStyles }>

      {index => {
        return (
          <Progress
            key={ index }
            isActive={
              index === completedPomodoros &&
              active &&
              !breaking }
            isComplete={
              index < completedPomodoros &&
              !editing }
            isTarget={ index < pomodoroGoal }/>
        );
      }}
    </CreatePomodoros>
  );
};

ProgressPomodoro.propTypes = {
  active: PropTypes.bool,
  completedPomodoros: PropTypes.number.isRequired,
  pomodoroGoal: PropTypes.number.isRequired,
  editing: PropTypes.bool,
  breaking: PropTypes.bool,
  rootStyles: PropTypes.object,
};

export default ProgressPomodoro;