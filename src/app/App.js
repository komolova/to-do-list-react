import React from 'react';

import './Normalize.css';
import './App.css';

import Header from './../components/Header';
import AddToDoForm from './../components/AddToDoForm';
import ToDoItem from './../components/ToDoItem';

export default class App extends React.Component {
  state = {
    text: '',
    items: []
  }

  componentDidMount() {
    this.getTodos();
  }

  getUrl = (path) => {
    return `http://localhost:3001/api/v1/${path}`;
  }

  onChange = (e) => {
    this.setState({
      text: e.target.value
    })
  }

  getTodos = () => {
    fetch(this.getUrl('todos'))
    .then((response) => response.json())
    .then((todos) => {
      this.setState({
        items: [...this.state.items, ...todos]
      })
    })
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
    .then((response) => response.json())
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
                item={ item }
                removeToDo={ this.removeToDo }
              />
          ))}
        </ul>

      </div>
    );
  }
}
