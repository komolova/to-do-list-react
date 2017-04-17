import React from 'react';
import { PropTypes } from 'prop-types';

import './ToDoItem.css';

import Button from './Button';

export default function ToDoItem({ item, removeToDo, updateTodo }) {
  return (
    <div className="todo">
      <input
        type="checkbox"
        onChange={() => updateTodo(item.id)} />
      <div className="item-text">{ item.name }</div>
      <Button
        type="reset"
        className="delete-btn"
        onClick={() => removeToDo(item.id)}>
        Delete
      </Button>
    </div>
  );
}

ToDoItem.defaultProps = {
  item: {}
};

ToDoItem.propTypes = {
  removeToDo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired,
  item: PropTypes.object
};
