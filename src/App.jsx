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
    fontWeight: 'bolder',
    letterSpacing: '.5px'
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideIndex: 0,
      inverseSort: {
        ADDED: false,
        POMODOROS: false,
        DURATION: false,
      },
      tasks: samples,
      value: 'ADDED',
    }
  }

  render() {
    const {
      slideIndex,
      sort,
      tasks,
      value,
    } = this.state;


    return (
      <Paper
        style={styles.root}
        zDepth={3}>
        <DropDownMenu
          value={value}
          onChange={this.onSort}>

          <MenuItem value={'ADDED'} primaryText="Added" />
          <MenuItem value={'POMODOROS'} primaryText="Pomodoros" />
          <MenuItem value={'DURATION'} primaryText="Duration" />
        </DropDownMenu>

        <Tabs
          tabItemContainerStyle={{backgroundColor: grey400}}
          inkBarStyle={{backgroundColor: red500}}
          onChange={this.onSwip}
          value={slideIndex}>

          <Tab
            label="To do"
            value={0}
            style={slideIndex === 0
              ? Object.assign({color: red500}, styles.tab)
              : styles.tab}/>

          <Tab
            label="Completed"
            value={1}
            style={slideIndex === 1
              ? Object.assign({color: red500}, styles.tab)
              : styles.tab}/>
        </Tabs>

        <BindKeyboardSwipeableViews
          style={{height: "100%"}}
          animateHeight={true}
          index={slideIndex}
          onChangeIndex={this.onSwip}>

          <div>
            <TaskList tasks={tasks.filter(({complete}) => !complete)}/>

            <AddItem/>
          </div>

          <TaskList tasks={tasks.filter(({complete}) => complete)}/>
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
    this.setState({ value });

    switch (this.state.value) {
      case 'ADDED':
        const tasks = [...this.state.tasks];
        const inverseSort = {...this.state.inverseSort};

        if (inverseSort.ADDED) {
          tasks.sort((a, b) => b.added-a.added)
        }else {
          tasks.sort((a, b) => a.added-b.added);
        }

        inverseSort.ADDED = !inverseSort.ADDED;
        this.setState({ inverseSort });
        this.setState({ tasks });
        break;

      case 'POMODOROS':
        break;

      case 'DURATION':
        break;
    }
  };
}


export default App;