import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import { grey400 } from 'material-ui/styles/colors';
import './App.css';
import samples from './samples';
import AddItem from './components/AddItem';
import TaskList from './components/TaskList';


const styles = {
  root: {
    margin: '0 auto',
    width: '50em',
  },
  toolbar : {
    backgroundColor: grey400,
    height: '50px',
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
    },
    icon: {
      fill: 'black',
      marginLeft: '20px',
      top: '13px',
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
      <Paper
        style={styles.root}
        zDepth={3}>

        <Toolbar style={styles.toolbar}>
          <ToolbarGroup>
            <DropDownMenu
              iconStyle={styles.menu.icon}
              labelStyle={styles.menu.label}
              value={this.state.value}
              onChange={this.handleChange}>

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
    )
  }

  handleChange = (event, index, value) =>
    this.setState({value});
}


export default App;