import {observable} from 'mobx';
import _ from 'lodash';

class TodoStore {
  increment = 0;

  @observable todos = [];

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
