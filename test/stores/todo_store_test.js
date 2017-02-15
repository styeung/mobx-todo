import TodoStore from 'stores/todo_store.js';

describe('TodoStore', () => {
  let todoStore;

  beforeEach(() => {
    todoStore = new TodoStore();
  });

  describe('addTodo', () => {
    it('adds the passed in value to the list of todos', () => {
      todoStore.addTodo('eat lunch');

      expect(todoStore.todos.slice()).toContain('eat lunch');
    });
  });
});
