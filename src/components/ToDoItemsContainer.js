import React, { Component } from 'react';
import './ToDoItemsContaiter.css';

import ToDoItem from './ToDoItem';

class ToDoItemsContaiter extends Component {
  render() {
    return (
      <ul className="To-do-list-items">
        <li>
          <ToDoItem />
        </li>
      </ul>
    );
  }
}
