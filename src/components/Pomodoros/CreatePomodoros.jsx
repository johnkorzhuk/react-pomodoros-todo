import React, { PropTypes } from 'react';


const CreatePomodoros = ({
  children,
  amount,
}) => {
  let items = [];
  for (let i = 0; i < amount; i++) {
    items.push(children(i));
  }
  return <div>{items}</div>
};

CreatePomodoros.propTypes = {
  children: PropTypes.func.isRequired,
  amount: PropTypes.number.isRequired,
};

export default CreatePomodoros;