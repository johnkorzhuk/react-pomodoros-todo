import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { red500 } from 'material-ui/styles/colors';
import App from './App';


const muiTheme = getMuiTheme({
  menuItem: {
    selectedTextColor: red500
  }
});

const Root = () => {
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <App/>
    </MuiThemeProvider>
  );
};

export default Root;