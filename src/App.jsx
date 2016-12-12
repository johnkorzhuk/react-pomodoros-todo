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
import PomodoroTimer from './components/PomodoroTimer';
// import TaskItem from './components/TaskItem/TaskItem';


const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

const styles = {
  root: {
    margin: '0 auto',
    width: '50em',
  },
  tab: {
    fontWeight: 'bolder',
    letterSpacing: '.5px',
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inverseSort: {
        added: false,
        pomodoroGoal: false,
        elapsed: false,
      },
      slideIndex: 0,
      tasks: samples,
      value: 'added',
    };

    this.editing = false;
  }

  /*
   Todo: Store complete, elapsed, pomodoroGoal, and title for persistent state.
   */

  render() {
    const {
      slideIndex,
      tasks,
      value,
    } = this.state;

    return (
      <div>
        <Paper
          style={ styles.root }
          zDepth={ 3 }>
          <DropDownMenu
            value={ value }
            onChange={ this.onSort }>

            <MenuItem value="added" primaryText="Added" />
            <MenuItem value="pomodoroGoal" primaryText="Pomodoros" />
            <MenuItem value="elapsed" primaryText="Time" />
          </DropDownMenu>

          <Tabs
            tabItemContainerStyle={ {backgroundColor: grey400} }
            inkBarStyle={ {backgroundColor: red500} }
            onChange={ this.onSwip }
            value={ slideIndex }>

            <Tab
              label="To do"
              value={0}
              style={slideIndex === 0
                ? Object.assign({color: red500}, styles.tab)
                : styles.tab}/>

            <Tab
              label="Completed"
              value={ 1 }
              style={
                slideIndex === 1
                  ? Object.assign({color: red500}, styles.tab)
                  : styles.tab }/>
          </Tabs>

          <BindKeyboardSwipeableViews
            slideStyle={ {overflowX: 'hidden'} }
            index={ slideIndex }
            animateHeight
            onChangeIndex={
              this.editing
                ? () => null
                : this.onSwip }>

            <TaskList>
              {tasks.filter(({ complete }) =>
                !complete
              ).map(task =>
                <PomodoroTimer
                  key={ task.id }
                  active={ task.active }
                  breaking={ task.breaking }
                  complete={ task.complete }
                  editing={ task.editing }
                  elapsed={ task.elapsed }
                  intervalDelay={ 1000 }
                  pomodoroGoal={ task.pomodoroGoal }
                  title={ task.title }
                  breakTime={ 300000 }
                  onePomodoroTime={ 1500000 }
                  toggleActive={this.toggleActive.bind(null, task.id) }
                  updateTask={this.updateTask.bind(null, task.id) }/> )}
            </TaskList>

            {/*Todo does the completed list need PomodoroTimer? Will TaskItem suffice?*/}
            <TaskList>
              {tasks.filter(({ complete }) =>
                complete
              ).map(task =>
                <PomodoroTimer
                  key={ task.id }
                  active={ task.active }
                  breaking={ task.breaking }
                  complete={ task.complete }
                  editing={ task.editing }
                  elapsed={ task.elapsed }
                  intervalDelay={ 1000 }
                  pomodoroGoal={ task.pomodoroGoal }
                  title={ task.title }
                  breakTime={ 300000 }
                  onePomodoroTime={ 1500000 }
                  removeTask={ this.removeTask.bind(null, task.id) }
                  updateTask={this.updateTask.bind(null, task.id) }/> )}
            </TaskList>
          </BindKeyboardSwipeableViews>
        </Paper>

        <Paper
          style={
            Object.assign({},
              styles.root,
              { margin: '20px auto 0' }) }
          zDepth={ 3 }>
          <AddTask addTask={ this.addTask }/>
        </Paper>
      </div>
    )
  }

  onSort = (event, index, value) => {
    this.setState({ value });

    const tasks = [ ...this.state.tasks ];
    const inverseSort = { ...this.state.inverseSort };

    inverseSort[value]
      ? tasks.sort((a, b) =>
          a[value]-b[value])
      : tasks.sort((a, b) =>
          b[value]-a[value]);

    inverseSort[value] = !inverseSort[value];

    this.setState(prevSate => {
      prevSate.inverseSort = inverseSort;
      prevSate.tasks = tasks;
    });
  };

  onSwip = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  removeTask = (id) => {
    const tasks = this.state.tasks
      .filter(task =>
        task.id !== id
    );

    this.setState({ tasks });

    if (this.checkCompletedTasks()) {
      this.onSwip(0);
    }
  };

  updateTask = (id, updatedTask) => {
    const tasks = this.state.tasks
      .map(task => {
        if (task.id === id) {
          return Object.assign(
            task,
            updatedTask,
          )
        }
        return task;
    });


    if (typeof updatedTask.complete !== 'undefined' &&
      !updatedTask.complete && !this.checkCompletedTasks()) {
        this.onSwip(0);
    }

    this.editing = tasks.some(task =>
      task.editing
    );

    this.setState({ tasks })
  };

  toggleActive = (id) => {
    this.setState(prevState =>
      prevState.tasks.map(task => {
        if (task.id === id) {
          if (!task.active) {
            return task.active = true;
          }
        }
        task.active = false;
        task.breaking = false;
        return task;
      })
    );
  };

  addTask = (task) => {
    const tasks = [...this.state.tasks, task];

    this.setState(prevState =>
      prevState.tasks = tasks
    );

    this.onSwip(0);
  };

  checkCompletedTasks = () => {
    return this.state.tasks
      .some(({
        complete
      }) => complete);
  };
}

export default App;