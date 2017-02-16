import React from 'react';
import { observable } from 'mobx';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import _ from 'lodash';
import App from 'components/app.js';

describe('App', () => {
  let store;

  beforeEach(() => {
    store = observable({
      todos: [],
      addTodo: jasmine.createSpy(),
      removeTodo: jasmine.createSpy()
    });
  });

  it('is an observer of todos', () => {
    const component = renderIntoDocument(<App store={store}/>);
    const domElement = findDOMNode(component);

    const items = () => {
      return domElement.querySelectorAll('[data-test="item"]');
    };

    expect(items().length).toEqual(0);

    component.props.store.todos = [{id: 1, content: 'item'}];

    const itemText = _.map(items(), (item) => {
      return item.textContent;
    });
    expect(itemText).toEqual(['item']);
  });

  it('displays the list of todos from the store prop', () => {
    store.todos = [{id: 1, content: 'first item'}, {id: 2, content: 'second item'}];
    const component = renderIntoDocument(<App store={store}/>);
    const domElement = findDOMNode(component);

    const items = domElement.querySelectorAll('[data-test="item"]');
    const itemText = _.map(items, (item) => {
      return item.textContent;
    });
    expect(itemText).toEqual(['first item', 'second item']);
  });

  describe('when add item is pressed', () => {
    it('calls addTodo on its store prop, passing in the input value', () => {
      const component = renderIntoDocument(<App store={store}/>);
      const domElement = findDOMNode(component);
      const inputField = domElement.querySelector('[data-test="item-field"]');

      inputField.value = 'Get rice';
      Simulate.change(inputField);
      Simulate.submit(domElement.querySelector('[data-test="item-form"]'));

      expect(store.addTodo).toHaveBeenCalledWith('Get rice');
    });
  });

  describe('when delete button is clicked for an item', () => {
    it('calls removeTodo on its store prop, passing in the item id', () => {
      store.todos = [{id: 1, content: 'first item'}, {id: 2, content: 'second item'}];
      const component = renderIntoDocument(<App store={store}/>);
      const domElement = findDOMNode(component);

      const itemToBeRemoved = domElement.querySelector('[data-item-id="1"]');
      const deleteButton = itemToBeRemoved.querySelector('[data-test="delete-button"]');

      Simulate.click(deleteButton);

      expect(store.removeTodo).toHaveBeenCalledWith(1);
    });
  });
});
