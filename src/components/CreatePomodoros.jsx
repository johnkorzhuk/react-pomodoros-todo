import React, { PropTypes } from 'react';


const styles = {
  pomodoro: {
    display: 'inline-block',
  },
};

const CreatePomodoros = ({
  children,
  amount,
}) => {
  let items = [];
  for (let i = 0; i < amount; i++) {
    items.push(children(i));
  }
  return (
    <li style={styles.pomodoro}>
      {items}
    </li>
  );
};

CreatePomodoros.propTypes = {
  children: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
};

export default CreatePomodoros;