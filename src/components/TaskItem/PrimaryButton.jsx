import React, { PropTypes } from 'react';
import Pause from 'material-ui/svg-icons/av/pause';
import Play from 'material-ui/svg-icons/av/play-arrow';
import IconButton from 'material-ui/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import Skip from 'material-ui/svg-icons/av/skip-next';
import { green500 } from 'material-ui/styles/colors';


const styles = {
  root: {
    borderRadius: '50%',
    padding: '0 10px',
  },
  button: {
    root: {
      marginBottom: 2,
      padding: 8,
      height: 40,
      width: 40,
    },
  },
};

const PrimaryButton = ({
  active,
  complete,
  breaking,
  onActiveToggle,
  onBreakEnd,
  onDelete,
}) => {
  const Icon = active
      ? <Pause />
      : <Play />;

  return (
    <div style={ styles.root }>
      {complete
        ? <IconButton
            style={ styles.button.root }
            onClick={ onDelete }>
            <Delete />
          </IconButton>

        : breaking
          ? <IconButton
              style={ styles.button.root }
              onClick={ onBreakEnd }>
              <Skip color={ green500 }/>
            </IconButton>

          : <IconButton
              style={ styles.button.root }
              onClick={ onActiveToggle }>
              { Icon }
            </IconButton> }
      </div>
  );
};

PrimaryButton.propTypes = {
  active: PropTypes.bool,
  complete: PropTypes.bool,
  breaking: PropTypes.bool.isRequired,
  onActiveToggle: PropTypes.func,
  onBreakEnd: PropTypes.func,
  onDelete: PropTypes.func,
};

export default PrimaryButton;