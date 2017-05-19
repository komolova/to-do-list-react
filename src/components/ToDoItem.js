import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { removeTodo } from './../api';

import './ToDoItem.css';

import Button from './Button';

export default class ToDoItem extends Component {
  onClick = () => {
    const { id } = this.props.item;
    const { onRemoveTodo } = this.props;

    removeTodo(id).then(() => {
      onRemoveTodo(id);
    });
  }

  render() {
    const { item } = this.props;

    return (
      <div className="todo">
        <input
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
      </div>
    );
  }
}

ToDoItem.defaultProps = {
  item: {}
};

ToDoItem.propTypes = {
  onRemoveTodo: PropTypes.func.isRequired,
  item: PropTypes.object
};
