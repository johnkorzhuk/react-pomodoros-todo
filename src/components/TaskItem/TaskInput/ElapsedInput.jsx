import React, { Component, PropTypes } from 'react';
import NumericInput from 'react-numeric-input';
import { red500 } from 'material-ui/styles/colors';

import { msFromHMS, msToHMS } from '../../../helpers';

const styles = {
  root: {
    padding: '0 10px',
    fontSize: '.8em',
    display: 'flex',
    alignItems: 'center',
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

class ElapsedInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hms: {}
    };
  }

  componentWillMount() {
    const {
      editedElapsed,
      intervalDelay,
    } = this.props;

    let hms = {
      hh: 0,
      mm: 0,
      ss: 0,
    };

    if (editedElapsed >= intervalDelay) {
      hms = msToHMS(editedElapsed);
    }

    this.setState({ hms })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editedElapsed !== nextProps.editedElapsed) {
      this.setState({
        hms: msToHMS(nextProps.editedElapsed)
      });
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   return !this.props.editing && this.props.active;
  // }

  render() {
    const {
      hh,
      mm,
      ss,
    } = this.state.hms;

    const hhMax = 99;
    let hhMin = mm <= 0 && ss <= 0
      ? 0
      : -1;
    let mmssMax = hh === hhMax
      ? 59
      : 60;
    let mmMin = hh <= 0 && ss <= 0
      ? 0
      : -1;
    let ssMin = mm <= 0 && hh <= 0
      ? 0
      : -1;

    return (
      <div style={ styles.root }>
        <NumericInput
          style={ styles.numericInput }
          max={ hhMax }
          min={ hhMin }
          size={ 2 }
          value={ hh }
          name="elapsed input"
          onChange={ e => this.updateHMS({ hh: e }) }
          onKeyUp={ this.handleKeyInput }/>

        <span>:</span>

        <NumericInput
          style={ styles.numericInput }
          max={ mmssMax }
          min={ mmMin }
          size={ 2 }
          value={ mm }
          name="elapsed input"
          onChange={ e => this.updateHMS({ mm: e }) }
          onKeyUp={ this.handleKeyInput }/>

        <span>:</span>

        <NumericInput
          style={ styles.numericInput }
          max={ mmssMax }
          min={ ssMin }
          size={ 2 }
          value={ ss }
          name="elapsed input"
          onChange={ e => this.updateHMS({ ss: e }) }
          onKeyUp={ this.handleKeyInput }/>
      </div>
    );
  }

  handleKeyInput = (event) => {
    switch (event.key) {
      case 'Enter':
        this.props.onEditComplete('hms', msFromHMS(this.state.hms));
        break;

      case 'Escape':
        this.props.onEditCancel();
        break;

      default:
        break;
    }
  };

  updateHMS = (newVal) => {
    const hms = {
      ...this.state.hms,
      ...newVal,
    };

    this.props.updateEditedElapsed(msFromHMS(hms));
  };
}

ElapsedInput.propTypes = {
  editedElapsed: PropTypes.number.isRequired,
  intervalDelay: PropTypes.number.isRequired,
  onEditCancel: PropTypes.func.isRequired,
  onEditComplete: PropTypes.func.isRequired,
  updateEditedElapsed: PropTypes.func.isRequired,
};

export default ElapsedInput;