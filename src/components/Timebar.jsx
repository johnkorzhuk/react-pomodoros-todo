import React, { PropTypes } from 'react';
import LinearProgress from 'material-ui/LinearProgress';

const Timebar = ({
  completedPomodoros,
  elapsed,
  onePomodoro,
}) => {
  const remainingTime = elapsed-(completedPomodoros*onePomodoro);
  return (
    <LinearProgress
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
