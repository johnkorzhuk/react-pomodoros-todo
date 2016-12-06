import React, { PropTypes } from 'react';


const styles = {
  title: {
    padding: '20px 0',
    width: '100%',
    minHeight: 20,
    fontSize: '1.1em',
  },
};

const Title = ({
  title,
  ...props,
}) => {
  return (
    <div
      style={ styles.title }
      {...props}>

      { title }
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired
};

export default Title;