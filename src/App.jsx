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
import AddTask from './components/AddTask';
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
        added: false,
        pomodoros: false,
        elapsed: false,
      },
      tasks: samples,
      value: 'added',
    }
  }

  render() {
    const {
      slideIndex,
      tasks,
      value,
    } = this.state;

    return (
      <div>
        <Paper
          style={styles.root}
          zDepth={3}>
          <DropDownMenu
            value={value}
            onChange={this.onSort}>

            <MenuItem value={'added'} primaryText="Added" />
            <MenuItem value={'pomodoros'} primaryText="Pomodoros" />
            <MenuItem value={'elapsed'} primaryText="Time" />
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
              <TaskList
                tasks={tasks.filter(({complete}) =>
                  !complete)}
                toggleActive={this.toggleActive}
                updateElapsed={this.updateElapsed}
                toggleComplete={this.toggleComplete}/>
            </div>

            <TaskList
              tasks={tasks.filter(({complete}) =>
                complete)}
              removeTask={this.removeTask}
              toggleComplete={this.toggleComplete}/>

          </BindKeyboardSwipeableViews>
        </Paper>

        <Paper
          style={Object.assign(
            {},
            styles.root,
            {margin: '20px auto 0'},
          )}
          zDepth={3}>
          <AddTask addTask={this.addTask}/>
        </Paper>
      </div>
    )
  }

  onSort = (event, index, value) => {
    this.setState({ value });

    const tasks = [...this.state.tasks];
    const inverseSort = {...this.state.inverseSort};

    inverseSort[value]
      ? tasks.sort((a, b) =>
          a[value]-b[value])
      : tasks.sort((a, b) =>
          b[value]-a[value]);

    inverseSort[value] = !inverseSort[value];
    this.setState(prevSate =>
      prevSate.inverseSort = inverseSort);
    this.setState(prevSate =>
      prevSate.tasks = tasks);
  };

  onSwip = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  removeTask = (id) => {
    const tasks = this.state.tasks.filter(task =>
      task.id !== id
    );

    this.setState(prevState =>
      prevState.tasks = tasks
    );

    this.checkCompleted();
  };

  toggleActive = (id, active) => {
    if (!active) {
      this.setState(prevState =>
        prevState.tasks.map(task =>
          task.active = false
        )
      );
    }

    this.setState(prevState => {
      prevState.tasks
        .filter(task =>
          task.id === id
        ).map(task =>
          task.active = !task.active
      )
    });
  };

  updateElapsed = (id, newTime) => {
    this.setState(prevState =>
      prevState.tasks.map(task => {
        if (task.id === id) {
          task.elapsed = newTime;
        }
        return null;
      })
    );
  };

  toggleComplete = (id) => {
    console.log();
    this.setState(prevState => {
      prevState.tasks
        .filter(task =>
          task.id === id)
        .map(task => {
          if (task.active) {
            task.active = false;
          }
          return task.complete = !task.complete;
      })
    });
    this.checkCompleted();
  };

  addTask = (task) => {
    const tasks = [...this.state.tasks, task];

    this.setState(prevState =>
      prevState.tasks = tasks);

    this.onSwip(0);
  };

  checkCompleted = () => {
    this.setState(prevState => {
      if (!prevState.tasks
        .filter(({complete}) =>
          complete
        ).some(({complete}) =>
          complete)) {

        prevState.slideIndex = 0;
      }
    });
  };
}


export default App;