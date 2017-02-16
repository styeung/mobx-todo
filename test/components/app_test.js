import App from 'components/app.js';
import React from 'react';
import { renderIntoDocument, Simulate } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';

describe('App', () => {
  let store;

  beforeEach(() => {
    store = {
      todos: [],
      addTodo: jasmine.createSpy()
    };
  });

  it('displays Hello World', () => {
    const component = renderIntoDocument(<App store={store}/>);
    const domElement = findDOMNode(component);
    expect(domElement.textContent).toContain('Hello World');
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
});
