import {observable} from 'mobx';
import _ from 'lodash';
import axios from 'axios';


class TodoStore {
  increment = 0;

  @observable todos = [];

  constructor() {
    axios.get('http://localhost:4567/items').then((response) => {
      this.todos = response.data
    });
  }

  addTodo(task) {
    this.increment++;
    this.todos.push({id: this.increment, content: task});
  }

  removeTodo(id) {
    _.remove(this.todos, (todo) => {
      return todo.id === id;
    });
  }
}

export default TodoStore;
