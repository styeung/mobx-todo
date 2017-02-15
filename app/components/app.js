import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';

@observer
class App extends React.Component {
  constructor(props) {
    super(props);

    this.addTodo = this.addTodo.bind(this);
  }

  todos() {
    const todos = _.get(this.props, 'store.todos', []);
    return _.map(todos, (toDo, index) => {
      return (<li key={index}>{toDo}</li>);
    });
  }

  addTodo() {
    this.props.store.addTodo();
  }

  render() {
    return (
      <div>
        <div>Hello World</div>
        <ul>
          {this.todos()}
        </ul>
        <div data-test="add-item" onClick={this.addTodo}>
          Add Item
        </div>
      </div>
    );
  }
}

export default App;

