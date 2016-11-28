import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { grey400, red500 } from 'material-ui/styles/colors';
import './App.css';
import samples from './samples';
import AddItem from './components/AddItem';
import TaskList from './components/TaskList';

const muiTheme = getMuiTheme({
  menuItem: {
    selectedTextColor: red500
  }
});

const styles = {
  root: {
    margin: '0 auto',
    width: '50em',
  },
  menu: {
    label: {
      margin: '0 25px 0 0',
      padding: '0 25px 0 0',
      fontSize: '1.2em',
      color: 'black',
      lineHeight: '50px',
      fontWeight: 'bolder',
      letterSpacing: '1px'
    }
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1,
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>

        <Paper
          style={styles.root}
          zDepth={3}>

          <Toolbar style={{backgroundColor: grey400, height: '50px'}}>
            <ToolbarGroup>
              <DropDownMenu
                selectedMenuItemStyle={{color: red500}}
                value={this.state.value}
                onChange={this.handleChange}
                iconStyle={{fill: 'black', marginLeft: '20px', top: '13px'}}
                labelStyle={styles.menu.label}>
                <MenuItem value={1} primaryText="All" />
                <MenuItem value={2} primaryText="Completed" />
                <MenuItem value={3} primaryText="Started" />
                <MenuItem value={4} primaryText="Pomodoros" />
                <MenuItem value={5} primaryText="Elapsed" />
              </DropDownMenu>
            </ToolbarGroup>
          </Toolbar>

          <TaskList tasks={samples}/>

          <AddItem/>
        </Paper>
      </MuiThemeProvider>
    )
  }

  handleChange = (event, index, value) =>
    this.setState({value});
}


export default App;