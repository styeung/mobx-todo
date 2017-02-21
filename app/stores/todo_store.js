import {observable} from 'mobx';
import _ from 'lodash';
import axios from 'axios';

const apiDomain = 'http://localhost:4567';

class TodoStore {
  increment = 0;

  @observable todos = [];

  constructor() {
    axios.get(apiDomain + '/items').then((response) => {
      this.todos = response.data
    });
  }

  addTodo(task) {
    this.increment++;
    const newTask = {id: this.increment, content: task};
    axios.post(apiDomain + '/item', newTask).then(() => {
      this.todos.push(newTask);
    });
  }

  removeTodo(id) {
    _.remove(this.todos, (todo) => {
      return todo.id === id;
    });
  }
}

export default TodoStore;
