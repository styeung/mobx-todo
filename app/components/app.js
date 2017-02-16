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
      return (<li data-test="item" key={index}>{toDo}</li>);
    });
  }

  addTodo(e) {
    e.preventDefault();
    const item = e.target.elements[0].value;
    this.props.store.addTodo(item);
  }

  render() {
    return (
      <div>
        <div>Todo List</div>
        <ul>
          {this.todos()}
        </ul>
        <form data-test="item-form" onSubmit={this.addTodo}>
          <input data-test="item-field" type="text" placeholder="Item here..."/>
          <input data-test="add-item" type="submit" value="Add Item"/>
        </form>
      </div>
    );
  }
}

export default App;

