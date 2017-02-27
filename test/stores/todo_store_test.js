import TodoStore from 'stores/todo_store.js';
import axios from 'axios';

describe('TodoStore', () => {
  let todoStore,
      promiseHelper,
      promisePostHelper,
      promiseDeleteHelper;

  beforeEach(() => {
    const fakePromise = new Promise((resolve, reject) => {
      promiseHelper = {
        resolve: resolve
      }
    });

    const fakePostPromise = new Promise((resolve, reject) => {
      promisePostHelper = {
        resolve: resolve
      }
    });

    const fakeDeletePromise = new Promise((resolve, reject) => {
      promiseDeleteHelper = {
        resolve: resolve
      }
    });

    spyOn(axios, 'get').and.returnValue(fakePromise);
    spyOn(axios, 'post').and.returnValue(fakePostPromise);
    spyOn(axios, 'delete').and.returnValue(fakeDeletePromise);
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

    it('makes a post to the api with the id and item', () => {
      todoStore.addTodo('eat lunch');

      expect(axios.post).toHaveBeenCalledWith('http://localhost:4567/item', {id: '1', content: 'eat lunch'});
    });

    describe('when post is successful', () => {
      it('adds the passed in value to the list of todos, assigning a unique id', (done) => {
        todoStore.addTodo('eat lunch');
        promisePostHelper.resolve();

        _.defer(() => {
          const todos = todoStore.todos.slice();
          expect(todos).toContain(jasmine.objectContaining({content: 'eat lunch'}));

          const ids = _.map(todos, (todo) => {
            return todo.id;
          });

          expect(_.uniq(ids).length).toEqual(ids.length);
          done();
        });
      });
    });
  });

  describe('removeTodo', () => {
    beforeEach(() => {
      todoStore = new TodoStore();
    });

    it('makes a delete to the api with the id', () => {
      todoStore.removeTodo('1');

      expect(axios.delete).toHaveBeenCalledWith('http://localhost:4567/item/1');
    });

    it('removes the todo with the passed in id', (done) => {
      todoStore.todos = [{id: '1', content: 'do homework'}, {id: '2', content: 'watch tv'}]
      todoStore.removeTodo('1');
      promiseDeleteHelper.resolve();

      _.defer(() => {
        const todos = todoStore.todos.slice();
        expect(todos).not.toContain(jasmine.objectContaining({content: 'do homework'}));

        done();
      });
    });
  });
});
