import React, { PropTypes } from 'react';


const styles = {
  root: {
    position: 'absolute',
    right: 20,
    flex: 1,
    marginTop: 2,
  }
};

const CreatePomodoros = ({
  children,
  amount,
  rootStyles=styles.root,
}) => {
  let items = [];
  for (let i = 0; i < amount; i++) {
    items.push(children(i));
  }
  return (
    <div style={ rootStyles }>
      {items}
    </div>
  );
};

CreatePomodoros.propTypes = {
  amount: PropTypes.number.isRequired,
  rootStyles: PropTypes.object,
  children: PropTypes.func.isRequired,
};

export default CreatePomodoros;