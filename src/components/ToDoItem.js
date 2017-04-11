import React from 'react';
import { PropTypes } from 'prop-types';

import './ToDoItem.css';

import Button from './Button';

export default function ToDoItem({ item, removeToDo }) {
  return (
    <div className="to-do">
      <input type="checkbox" />
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

ToDoItem.propTypes = {
  removeToDo: PropTypes.func.isRequired,
  item: PropTypes.object,
};
