import React from 'react';

import './Normalize.css';
import './App.css';

import Header from './../components/Header';
import AddToDoForm from './../components/AddToDoForm';
import ToDoItem from './../components/ToDoItem';

export default class App extends React.Component {
  state = {
    text: '',
    items: [
    ]
  }

  onChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  generateId = () => {
    const { items } = this.state;
    return (items && items.length === 0) ? 1 : items[items.length - 1].id + 1
  }


  addToDo = (e) => {
    e.preventDefault();
    const { text } = this.state;
    const newItem = {
      text: this.state.text.trim(),
      done: false,
      id: this.generateId()
    };

    if(text) {
      this.setState({
        items: [...this.state.items, newItem],
        text: ''
      })
    }
  }

  removeToDo = (id) => {
    this.setState({
      item: this.state.items.filter(item => item.id !== id)
    });
  }

  render() {
    const { items, text } = this.state;

    return (
      <div className="app">
        <Header />
        <AddToDoForm onChange={ this.onChange }
                     onSubmit={ this.addToDo }
                     value={ text } />

        <ul className="list-items">
          { items.map(item => (
              <ToDoItem
                key={ item.id }
                itemId={ item.id }
                removeToDo={ this.removeToDo }
                itemText={ item.text }

              />
          ))}
        </ul>

      </div>
    );
  }
}
