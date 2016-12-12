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

class ElapsedInput extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !(this.props.editing);
  }

  render() {
    const {
      hms,
      handleKeyInput,
      updateEditedElapsed,
    } = this.props;

    let hhMax = 99;
    let hhMin = hms.mm <= 0 && hms.ss <= 0
      ? 0
      : -1;
    let mmssMax = hms.hh === hhMax
      ? 59
      : 60;
    let mmMin = hms.mm <= 0 && hms.ss <= 0
      ? 0
      : -1;
    let ssMin = hms.mm <= 0 && hms.hh <= 0
      ? 0
      : -1;
    return (
      <div style={ styles.root }>
        <NumericInput
          style={ styles.numericInput }
          max={ hhMax }
          min={ hhMin }
          size={ 2 }
          value={ hms.hh }
          name="elapsed input"
          onChange={ e => updateEditedElapsed({ hh: e }) }
          onKeyUp={ e => handleKeyInput(e, 'hms') }/>
        :
        <NumericInput
          style={ styles.numericInput }
          max={ mmssMax }
          min={ mmMin }
          size={ 2 }
          value={ hms.mm }
          name="elapsed input"
          onChange={ e => updateEditedElapsed({ mm: e }) }
          onKeyUp={ e => handleKeyInput(e, 'hms') }/>
        :
        <NumericInput
          style={ styles.numericInput }
          max={ mmssMax }
          min={ ssMin }
          size={ 2 }
          value={ hms.ss }
          name="elapsed input"
          onChange={ e => updateEditedElapsed({ ss: e }) }
          onKeyUp={ e => handleKeyInput(e, 'hms') }/>
      </div>
    );
  }
}

const ElapsedInput2 = ({
  hms,
  handleKeyInput,
  updateEditedElapsed,
}) => {
  let hhMax = 99;
  let hhMin = hms.mm <= 0 && hms.ss <= 0
    ? 0
    : -1;
  let mmssMax = hms.hh === hhMax
    ? 59
    : 60;
  let mmMin = hms.mm <= 0 && hms.ss <= 0
    ? 0
    : -1;
  let ssMin = hms.mm <= 0 && hms.hh <= 0
    ? 0
    : -1;

  return (
    <div style={ styles.root }>
      <NumericInput
        style={ styles.numericInput }
        max={ hhMax }
        min={ hhMin }
        size={ 2 }
        value={ hms.hh }
        name="elapsed input"
        onChange={ e => updateEditedElapsed({ hh: e }) }
        onKeyUp={ e => handleKeyInput(e, 'hms') }/>
      :
      <NumericInput
        style={ styles.numericInput }
        max={ mmssMax }
        min={ mmMin }
        size={ 2 }
        value={ hms.mm }
        name="elapsed input"
        onChange={ e => updateEditedElapsed({ mm: e }) }
        onKeyUp={ e => handleKeyInput(e, 'hms') }/>
      :
      <NumericInput
        style={ styles.numericInput }
        max={ mmssMax }
        min={ ssMin }
        size={ 2 }
        value={ hms.ss }
        name="elapsed input"
        onChange={ e => updateEditedElapsed({ ss: e }) }
        onKeyUp={ e => handleKeyInput(e, 'hms') }/>
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
  updateEditedElapsed: PropTypes.func.isRequired,
};

export default ElapsedInput;