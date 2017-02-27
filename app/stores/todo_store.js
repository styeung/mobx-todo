import {observable, action, useStrict} from 'mobx';
import _ from 'lodash';
import axios from 'axios';

useStrict(true);

const apiDomain = 'http://localhost:4567';

const getMaxId = (items) => {
  if(_.isEmpty(items)) {
    return 0;
  }

  return _(items)
    .map((item) => { return parseInt(item.id); })
    .max();
};

class TodoStore {
  currentId = 0;

  @observable todos;

  constructor(todos = []) {
    this.todos = todos;
  }

  @action
  fetchTodos() {
    axios.get(apiDomain + '/items').then(action((response) => {
      this.todos = response.data
      this.currentId = getMaxId(this.todos);
    }));
  }

  @action
  addTodo(task) {
    this.currentId++;
    const newTask = {id: String(this.currentId), content: task};
    axios.post(apiDomain + '/item', newTask).then(action(() => {
      this.todos.push(newTask);
    }));
  }

  @action
  removeTodo(id) {
    axios.delete(apiDomain + `/item/${id}`).then(action(() => {
      _.remove(this.todos, (todo) => {
        return todo.id === id;
      });
    }));
  }
}

export default TodoStore;
