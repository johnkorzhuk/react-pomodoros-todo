import React, { PropTypes } from 'react';
import NumericInput from 'react-numeric-input';
import { red500 } from 'material-ui/styles/colors';

const styles = {
  root: {
    padding: '0 10px'
  },
  numericInput: {
    wrap: {
      padding: '0 2px'
    },
    btn: {
      display: 'none'
    },
    input: {
      boxSizing: 'border-box',
      width: '2em',
      padding: 0,
      textAlign: 'center',
      fontSize: '.8em'
    },
    'input:not(.form-control)': {
      paddingLeft: 0,
    },
    'input:focus': {
      outlineColor: red500,
      outlineWidth: 2
    },
  }
};

const ElapsedInput = ({

}) => {
  return (
    <div style={ styles.root }>
      <NumericInput
        style={ styles.numericInput }
        />
      <NumericInput
        style={ styles.numericInput }
        />
      <NumericInput
        style={ styles.numericInput }
        />
    </div>
  );
};

ElapsedInput.propTypes = {

};

export default ElapsedInput;