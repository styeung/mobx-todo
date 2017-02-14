import React from 'react';
import _ from 'lodash';

class App extends React.Component {
  todos() {
    return _.map(this.props.store.todos, (toDo, index) => {
      return (<li key={index}>{toDo}</li>);
    });

  }

  render() {
    return (
      <ul>
        {this.todos()}
      </ul>
    );
  }
}

export default App;

