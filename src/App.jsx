import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { grey300, red500 } from 'material-ui/styles/colors';
import './App.css';
import samples from './samples';
import TaskList from './components/TaskList';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: red500,
  },
});

const styles = {
  paper: {
    backgroundColor: grey300,
    margin: '0 auto',
    width: '50em',
  }
};

const App = () => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Paper
        style={styles.paper}
        zDepth={3}>
        <TaskList tasks={samples}/>
      </Paper>
    </MuiThemeProvider>
  );
};

export default App;