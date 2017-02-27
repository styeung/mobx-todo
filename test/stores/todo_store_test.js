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

  describe('.fetchTodos', () => {
    it('fetches the list of todos from the api', () => {
      todoStore = new TodoStore();
      todoStore.fetchTodos();
      expect(axios.get).toHaveBeenCalledWith('http://localhost:4567/items');
    });

    describe('when fetch is successful', () => {
      it('assigns the response from the api to the store todos', (done) => {
        todoStore = new TodoStore();
        todoStore.fetchTodos();
        promiseHelper.resolve({data: 'stuff'});

        _.defer(() => {
          expect(todoStore.todos).toEqual('stuff');
          done();
        });
      });

      describe('fetch response is non-empty', () => {
        it('sets the currentId to the max id of the fetched todos', (done) => {
          todoStore = new TodoStore();
          todoStore.fetchTodos();

          promiseHelper.resolve({data: [{id: '1', content: 'number 1'}, {id: '100', content: 'number 100'}]});

          _.defer(() => {
            expect(todoStore.currentId).toEqual(100);
            done();
          });
        });
      });

      describe('fetch response is empty', () => {
        it('sets the currentId to 0', (done) => {
          todoStore = new TodoStore();
          todoStore.fetchTodos();

          promiseHelper.resolve({data: []});

          _.defer(() => {
            expect(todoStore.currentId).toEqual(0);
            done();
          });
        });
      });
    });
  });

  describe('.addTodo', () => {
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

  describe('.removeTodo', () => {
    it('makes a delete to the api with the id', () => {
      todoStore = new TodoStore();

      todoStore.removeTodo('1');

      expect(axios.delete).toHaveBeenCalledWith('http://localhost:4567/item/1');
    });

    it('removes the todo with the passed in id', (done) => {
      const defaultTodos = [{id: '1', content: 'do homework'}, {id: '2', content: 'watch tv'}]
      todoStore = new TodoStore(defaultTodos);
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
