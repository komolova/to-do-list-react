import React, { PropTypes } from 'react';
import './ToDoItem.css';

import Button from './Button';

export default function ToDoItem(props) {
  const { itemText,
    itemId,
    removeToDo } = props;

  return (
    <li className="to-do-item" key={ itemId }>
      <input type="checkbox" />
      <div className="item-text">{ itemText }</div>
      <Button type="reset"
              className="delete-btn"
              onClick={ () => removeToDo(itemId) }>
        Delete
      </Button>
    </li>
  );
}

ToDoItem.propTypes = {
  removeToDo: PropTypes.func.isRequired,
  itemText: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  itemId: PropTypes.number
}
