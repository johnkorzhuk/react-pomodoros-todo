import React, { PropTypes } from 'react';
import LinearProgress from 'material-ui/LinearProgress';
import { red500, green500 } from 'material-ui/styles/colors';

const Timebar = ({
  elapsed,
  breaking,
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
  elapsed: PropTypes.number.isRequired,
  breaking: PropTypes.bool.isRequired,
  breakTime: PropTypes.number.isRequired,
  onePomodoroTime: PropTypes.number.isRequired,
};

export default Timebar;
