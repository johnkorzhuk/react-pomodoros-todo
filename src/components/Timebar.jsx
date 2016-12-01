import React, { PropTypes } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import { red500 } from 'material-ui/styles/colors';

const Timebar = ({
  completedPomodoros,
  elapsed,
  onePomodoro,
}) => {
  const remainingTime = elapsed-(completedPomodoros*onePomodoro);

  return (
    <LinearProgress
      color={red500}
      mode='determinate'
      max={onePomodoro}
      value={remainingTime}/>
  );
};

Timebar.propTypes = {
  completedPomodoros: PropTypes.number.isRequired,
  elapsed: PropTypes.number.isRequired,
  onePomodoro: PropTypes.number.isRequired,
};

export default Timebar;
