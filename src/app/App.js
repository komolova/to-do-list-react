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

  getUrl = (path) => {
    return `http://localhost:3001/api/v1/${path}`;
  }

  addToDo = (e) => {
    e.preventDefault();

    const { text } = this.state;

    fetch(this.getUrl('todos'), {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: {
          name: text
        }
      })
    })
    .then((response) => {
      return response.json();
    })
    .then((todo) => {
      this.setState({
        items: [todo, ...this.state.items],
        text: ''
      })
    })
  }

  removeToDo = (id) => {
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
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
                item={ item.id }
                itemText={ item.name }
                removeToDo={ this.removeToDo }
              />
          ))}
        </ul>

      </div>
    );
  }
}
