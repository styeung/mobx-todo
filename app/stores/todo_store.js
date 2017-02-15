import {observable} from 'mobx';

class TodoStore {
  @observable todos = [];

  addTodo(task) {
    this.todos.push(task);
  }
}

export default TodoStore;
