import React from 'react';
import { PropTypes } from 'prop-types';

import './ToDoItem.css';

import Button from './Button';

export default function ToDoItem({ itemId, itemText, removeToDo }) {
  return (
    <div className="to-do">
      <input type="checkbox" />
      <div className="item-text">{ itemText }</div>
      <Button type="reset"
              className="delete-btn"
              onClick={ () => removeToDo(itemId) }>
        Delete
      </Button>
    </div>
  );
}

ToDoItem.propTypes = {
  removeToDo: PropTypes.func.isRequired,
  item: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}
