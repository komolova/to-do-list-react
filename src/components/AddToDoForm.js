import React, { Component } from 'react';
import './AddToDoForm.css';

import Button from './Button';

class AddToDoForm extends Component {
  render() {
    return(
      <div className="Form-wrapper">
        <form autocomplete="off" className="Form">
          <input className="input-text" type="text" name="message" placeholder="What you need to do?" />
          <Button type="submit">Add to list</Button>
        </form>
      </div>
    )
  }
}

export default AddToDoForm;
