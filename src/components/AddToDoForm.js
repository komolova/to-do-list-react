import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { addTodo } from '../api';

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
      disabled: true
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
      if (response.headers.get('Content-Type').match(/application\/json/)) {
        response.json().then((error) => {
          this.setState({
            errors: [...this.state.errors, error.errors.name]
          });
        });
      } else {
        this.setState({
          errors: ['Error']
        });
      }
      this.setState({
        disabled: false
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
