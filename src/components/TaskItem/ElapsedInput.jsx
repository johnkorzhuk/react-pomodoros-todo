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
  updateNewElapsed,
}) => {
  return (
    <div
      style={ styles.root }>
      <NumericInput
        style={ styles.numericInput }
        max={ 99 }
        min={ 0 }
        size={ 2 }
        value={ hms.hh }
        onChange={ e => updateNewElapsed({hh: e}) }/>
      :
      <NumericInput
        style={ styles.numericInput }
        max={ hms.hh === 99 ? 59 : 60 }
        min={ hms.hh ? -1 : 0 }
        size={ 2 }
        value={ hms.mm }
        onChange={ e => updateNewElapsed({mm: e}) }/>
      :
      <NumericInput
        style={ styles.numericInput }
        max={ hms.hh === 99 ? 59 : 60 }
        min={ hms.mm ? -1 : 0 }
        size={ 2 }
        value={ hms.ss }
        onChange={ e => updateNewElapsed({ss: e}) }/>
    </div>
  );
};

ElapsedInput.propTypes = {
  hms: PropTypes.shape({
    hh: PropTypes.number.isRequired,
    mm: PropTypes.number.isRequired,
    ss: PropTypes.number.isRequired,
  }).isRequired
};

export default ElapsedInput;