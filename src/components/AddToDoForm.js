import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { addTodo, getErrors } from '../API/API';

import Button from './Button';
import './AddToDoForm.css';

export default class AddToDoForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    text: '',
    disabled: false,
    errors: []
  }

  onChange = (e) => {
    this.setState({
      text: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { text } = this.state;

    this.setState({
      disabled: true,
      errors: []
    });

    addTodo(text)
    .then((todo) => {
      this.props.onSubmit(todo);
    })
    .then(() => {
      this.setState({
        text: '',
        disabled: false,
        errors: []
      });
    })
    .catch((response) => {
      getErrors(response)
      .then((errors) => {
        console.error(errors);
        this.setState({
          disabled: false,
          errors,
          text: ''
        });
      });
    });
  }

  render() {
    const { disabled, errors } = this.state;

    return (
      <div className="form-wrapper">
        <form autoComplete="off" className="form" onSubmit={ this.onSubmit }>
          <input
            className="input-text"
            type="text"
            placeholder="What you need to do?"
            onChange={ this.onChange }
            value={ this.state.text }
          />
          <Button
            type="submit"
            disabled={ disabled }
            className="add-btn"
          >
          Add to list!
          </Button>
        </form>
        { errors.length > 0 &&
          <div className="form-error">{ errors }</div>
        }
      </div>
    );
  }
}
