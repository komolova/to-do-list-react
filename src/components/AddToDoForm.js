import React from 'react';
import { PropTypes } from 'prop-types';
import './AddToDoForm.css';

import Button from './Button';

export default function AddToDoForm( { onSubmit, onChange, value }) {
  return(
    <div className="form-wrapper" onSubmit={ onSubmit }>
      <form autoComplete="off" className="form">
        <input className="input-text"
               type="text"
               placeholder="What you need to do?"
               onChange={ onChange }
               value={ value }
               />
        <Button type="submit" className="add-btn">Add to list!</Button>
      </form>
    </div>
  );
}

AddToDoForm.propTypes = {
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string
}
