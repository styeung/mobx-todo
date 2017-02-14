import {observable} from 'mobx';

class TodoStore {
  @observable todos = ['default 1', 'default 2'];

  addTodo(task) {
   this.todos.push('something');
  }
}

export default TodoStore;
