import React, {Component} from 'react';
import styled from 'styled-components';
import Completed from './components/Completed';
import Todo from './components/Todo';
import Task from './components/Task';

const TaskList = styled.div`
  margin: 0 auto 30px;
  max-width: 700px;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [
        {
          title:     'Make that pomodoro app',
          id: 1,
          completed: false
        },
        {
          title:     'Should be in to-do list',
          id: 2,
          completed: false
        },
        {
          title:     'Do laundry',
          id: 3,
          completed: false
        },
        {
          title:     'Wash dishes',
          id: 4,
          completed: true
        },
        {
          title:     'In completed list',
          id: 5,
          completed: true
        }
      ]
    };
  }


  render() {
    return (
      <div>
        <TaskList>
          <h2>Completed:</h2>
          <Completed>
            {this.state.tasks
              .map(({title, id, completed}, index) => {
                if (completed) {
                  return (
                    <Task
                      key={id}
                      index={index}
                      title={title}/>
                  );
                }
                return null;
            })}
          </Completed>
        </TaskList>

        <TaskList>
          <h2>To do:</h2>
          <Todo>
            {this.state.tasks
              .map(({title, id, completed}, index) => {
                if (!completed) {
                  return (
                    <Task
                      key={id}
                      index={index}
                      title={title}/>
                  );
                }
                return null;
            })}
          </Todo>
        </TaskList>
      </div>
    )
  }
}

export default App;