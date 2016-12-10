import React, { PropTypes } from 'react';
import NumericInput from 'react-numeric-input';
import { red500 } from 'material-ui/styles/colors';

const styles = {
  root: {
    padding: '0 10px',
    fontSize: '.8em'
  },
  numericInput: {
    wrap: {
      padding: '0 1px'
    },
    btn: {
      display: 'none'
    },
    input: {
      boxSizing: 'border-box',
      width: '2em',
      padding: 0,
      textAlign: 'center',
      fontSize: '1em'
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
  hms,
  handleKeyInput,
  updateNewElapsed,
}) => {
  return (
    <div style={ styles.root }>
      <NumericInput
        style={ styles.numericInput }
        max={ 99 }
        min={ 0 }
        size={ 2 }
        defaultValue={ hms.hh }
        onKeyUp={ (e) => handleKeyInput(e, 'hh', e.target.value) }/>
      :
      <NumericInput
        style={ styles.numericInput }
        max={ hms.hh === 99 ? 59 : 60 }
        min={ hms.hh ? -1 : 0 }
        size={ 2 }
        defaultValue={ hms.mm }
        onKeyUp={ (e) => handleKeyInput(e, 'mm', e.target.value) }/>
      :
      <NumericInput
        style={ styles.numericInput }
        max={ hms.hh === 99 ? 59 : 60 }
        min={ hms.mm ? -1 : 0 }
        size={ 2 }
        defaultValue={ hms.ss }
        onKeyUp={ (e) => handleKeyInput(e, 'ss', e.target.value) }/>
    </div>
  );
};

ElapsedInput.propTypes = {
  hms: PropTypes.shape({
    hh: PropTypes.number.isRequired,
    mm: PropTypes.number.isRequired,
    ss: PropTypes.number.isRequired,
  }).isRequired,
  handleKeyInput: PropTypes.func.isRequired,

};

export default ElapsedInput;