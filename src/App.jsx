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
                  complete={ task.complete }
                  editing={ task.editing }
                  elapsed={ task.elapsed }
                  pomodoroGoal={ task.pomodoroGoal }
                  title={ task.title }
                  breakTime={ 300000 }
                  onePomodoroTime={ 1500000 }
                  onEdit={this.onEdit.bind(null, task.id) }
                  onEditComplete={this.onEditComplete.bind(null, task.id) }
                  toggleActive={this.toggleActive.bind(null, task.id) }
                  toggleComplete={this.toggleComplete.bind(null, task.id) }
                  updateElapsed={this.updateElapsed.bind(null, task.id) }/> )}
            </TaskList>

            {/*Todo does the completed list need PomodoroTimer? Will TaskItem suffice?*/}
            <TaskList>
              {tasks.filter(({ complete }) =>
                complete
              ).map(task =>
                <PomodoroTimer
                  key={ task.id }
                  active={ task.active }
                  complete={ task.complete }
                  editing={ task.editing }
                  elapsed={ task.elapsed }
                  pomodoroGoal={ task.pomodoroGoal }
                  title={ task.title }
                  breakTime={ 300000 }
                  onePomodoroTime={ 1500000 }
                  onEdit={ this.onEdit.bind(null, task.id) }
                  onEditComplete={ this.onEditComplete.bind(null, task.id) }
                  removeTask={ this.removeTask.bind(null, task.id) }
                  toggleComplete={ this.toggleComplete.bind(null, task.id) }
                  updateElapsed={ this.updateElapsed.bind(null, task.id) }/> )}
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

    this.setState(prevState =>
      prevState.tasks = tasks
    );

    this.checkCompletedTasks();
  };

  onEdit = (id) => {
    this.editing = true;

    this.setState(prevState =>
      prevState.tasks.map(task => {
        if (task.id === id) {
          task.editing = true;
        }
        return task;
      })
    );
  };

  onEditComplete = (id, newTitle, newElapsed) => {
    this.editing = false;
    this.setState(prevState =>
      prevState.tasks.map(task => {
        if (task.id === id) {
          if (newElapsed) {
            task.elapsed = newElapsed;
          }
          if (newTitle) {
            task.title = newTitle;
          }
          task.editing = false;
        }
        return task;
      })
    );
  };

  toggleActive = (id, active) => {
    this.editing = false;

    if (!active) {
      this.setState(prevState =>
        prevState.tasks.map(task => {
            task.active = false;
            task.editing = false;
            return task;
          })
      );
    }

    this.setState(prevState => {
      prevState.tasks
        .filter(task =>
          task.id === id
        ).map(task =>
          task.active = !task.active
      );
    });
  };

  toggleComplete = (id, elapsed) => {
    this.setState(prevState => {
      prevState.tasks
        .filter(task =>
          task.id === id
        ).map(task => {
          if (!task.complete) {
            task.active = false;
            if (elapsed) {
              task.elapsed = elapsed;
            }
          }
          task.editing = false;
          task.complete = !task.complete;
          return task;
        })
    });
    this.checkCompletedTasks();
  };

  addTask = (task) => {
    const tasks = [ ...this.state.tasks, task ];

    this.setState(prevState =>
      prevState.tasks = tasks
    );

    this.onSwip(0);
  };

  checkCompletedTasks = () => {
    this.setState(prevState => {
      if (!prevState.tasks
          .some(({ complete }) =>
            complete)) {

        prevState.slideIndex = 0;
      }
    });
  };

  updateElapsed = (id, newTime) => {
    this.setState(prevState =>
      prevState.tasks
        .map(task => {
          if (task.id === id) {
            task.elapsed = newTime;
          }
          return task;
        })
    );
  };
}

export default App;