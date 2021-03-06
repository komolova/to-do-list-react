import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

import './ToDoItem.css';

import Button from './Button';

export default class ToDoItem extends Component {
  onClick = () => {
    const { item, removeTodo } = this.props;

    removeTodo(item.id);
  }

  onChange = () => {
    const { item, toggleTodo } = this.props;

    toggleTodo(item.id, !item.done);
  }

  render() {
    const { item } = this.props;

    return (
      <li className="todo">
        <input
          checked={ item.done }
          type="checkbox"
          onChange={ this.onChange }
        />
        <div className="item-text">{ item.name }</div>
        <Button
          type="reset"
          className="delete-btn"
          onClick={ this.onClick }
        >
          Delete
        </Button>
      </li>
    );
  }
}

ToDoItem.defaultProps = {
  item: {}
};

ToDoItem.propTypes = {
  removeTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  item: PropTypes.object
};
