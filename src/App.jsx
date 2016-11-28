import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import bindKeyboard from 'react-swipeable-views/lib/bindKeyboard';
import Paper from 'material-ui/Paper';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import {Tabs, Tab} from 'material-ui/Tabs';
import { grey400, red500 } from 'material-ui/styles/colors';
import './App.css';
import samples from './samples';
import AddItem from './components/AddItem';
import TaskList from './components/TaskList';


const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const styles = {
  root: {
    margin: '0 auto',
    width: '50em',
  },
  tab: {
    color: red500,
    fontWeight: 'bolder',
    letterSpacing: '.5px'
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'ADDED',
      slideIndex: 0,
    }
  }

  render() {
    return (
      <Paper
        style={styles.root}
        zDepth={3}>
        {console.log(Date.now())}
        <DropDownMenu
          value={this.state.value}
          onChange={this.onSort}>

          <MenuItem value={'ADDED'} primaryText="Added" />
          <MenuItem value={'POMODOROS'} primaryText="Pomodoros" />
          <MenuItem value={'DURATION'} primaryText="Duration" />
        </DropDownMenu>

        <Tabs
          tabItemContainerStyle={{backgroundColor: grey400}}
          inkBarStyle={{backgroundColor: red500}}
          onChange={this.onSwip}
          value={this.state.slideIndex}>

          <Tab
            label="To do"
            value={0}
            style={styles.tab}/>

          <Tab
            label="Completed"
            value={1}
            style={styles.tab}/>
        </Tabs>

        <BindKeyboardSwipeableViews
          style={{height: "100%"}}
          animateHeight={true}
          index={this.state.slideIndex}
          onChangeIndex={this.onSwip}>

          <div>
            <TaskList tasks={samples.filter(({complete}) => !complete)}/>

            <AddItem/>
          </div>

          <TaskList tasks={samples.filter(({complete}) => complete)}/>
        </BindKeyboardSwipeableViews>
      </Paper>
    )
  }

  onSwip = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  onSort = (event, index, value) => {
    this.setState({value});
  };
}


export default App;