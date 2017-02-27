import React from 'react';
import _ from 'lodash';
import {observer} from 'mobx-react';

@observer
class App extends React.Component {
  constructor(props) {
    super(props);

    this.addTodo = this.addTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
  }

  componentDidMount() {
    this.props.store.fetchTodos();
  }

  addTodo(e) {
    e.preventDefault();
    const item = e.target.elements[0].value;
    this.props.store.addTodo(item);
  }

  removeTodo(e) {
    const id = e.target.parentNode.getAttribute('data-item-id');
    this.props.store.removeTodo(id);
  }

  todos() {
    const todos = _.get(this.props, 'store.todos', []);
    return _.map(todos, (toDo) => {
      return (
        <li key={toDo.id} data-item-id={toDo.id}>
          <span data-test="item">
            {toDo.content}
          </span>
          <button data-test="delete-button" onClick={this.removeTodo}>
            Delete
          </button>
        </li>
      );
    });
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

