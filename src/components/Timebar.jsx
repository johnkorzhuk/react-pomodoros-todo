import React, { PropTypes } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import { red500, green500 } from 'material-ui/styles/colors';

const Timebar = ({
  breaking,
  elapsed,
  breakTime,
  onePomodoroTime,
}) => {
  return (
    <LinearProgress
      color={breaking ? green500 : red500}
      mode='determinate'
      max={breaking ? breakTime : onePomodoroTime}
      value={elapsed}/>
  );
};

Timebar.propTypes = {
  breaking: PropTypes.bool.isRequired,
  elapsed: PropTypes.number.isRequired,
  breakTime: PropTypes.number.isRequired,
  onePomodoroTime: PropTypes.number.isRequired,
};

export default Timebar;
