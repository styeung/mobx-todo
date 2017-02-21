import TodoStore from 'stores/todo_store.js';
import axios from 'axios';

describe('TodoStore', () => {
  let todoStore,
      promiseHelper;

  beforeEach(() => {
    const fakePromise = new Promise((resolve, reject) => {
      promiseHelper = {
        resolve: resolve
      }
    });

    spyOn(axios, 'get').and.returnValue(fakePromise);
  });

  describe('initialization', () => {
    it('fetches the list of todos from the api', () => {
      todoStore = new TodoStore();
      expect(axios.get).toHaveBeenCalledWith('http://localhost:4567/items');
    });

    it('assigns the response from the api to the store todos', (done) => {
      todoStore = new TodoStore();
      promiseHelper.resolve({data: 'stuff'});

      _.defer(() => {
        expect(todoStore.todos).toEqual('stuff');
        done();
      });
    });
  });

  describe('addTodo', () => {
    beforeEach(() => {
      todoStore = new TodoStore();
    });
    it('adds the passed in value to the list of todos, assigning a unique id', () => {
      todoStore.addTodo('eat lunch');
      todoStore.addTodo('take a shower');

      const todos = todoStore.todos.slice();
      expect(todos).toContain(jasmine.objectContaining({content: 'eat lunch'}));
      expect(todos).toContain(jasmine.objectContaining({content: 'take a shower'}));

      const ids = _.map(todos, (todo) => {
        return todo.id;
      });

      expect(_.uniq(ids).length).toEqual(ids.length);
    });
  });

  describe('removeTodo', () => {
    it('removes the todo with the passed in id', () => {
      todoStore.todos = [{id: 1, content: 'first one'}, {id: 2, content: 'second one'}];
      todoStore.removeTodo(1);

      expect(todoStore.todos.slice()).toEqual([{id: 2, content: 'second one'}]);
    });
  });
});
