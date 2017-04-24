import React from 'react';
import fetch from 'isomorphic-fetch';

import './Normalize.css';
import './App.css';

import * as Client from './../client';

import Header from './../components/Header';
import AddToDoForm from './../components/AddToDoForm';
import ToDoItem from './../components/ToDoItem';

export default class App extends React.Component {
  state = {
    items: []
  }

  componentDidMount() {
    Client.getTodos()
    .then((todos) => {
      this.setState({
        items: [...this.state.items, ...todos]
      });
    })
    .catch(error => error);
  }

  onSubmitForm = (todo) => {
    this.setState({
      items: [todo, ...this.state.items],
    });
  }

  removeToDo = (id) => {
    fetch(this.getUrl(`todos/${id}`), {
      method: 'delete',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(this.getStatus)
    .then(response => response.json())
    .then(() => {
      this.setState({
        items: this.state.items.filter(item => item.id !== id)
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  updateTodo = (id) => {
    const { done } = this.state;

    fetch(this.getUrl(`todos/${id}`), {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        todo: {
          done: !done
        }
      })
    })
    .then(this.getStatus)
    .then(response => response.json())
    .then(() => {
      this.setState({
        done: !done
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    const { items } = this.state;

    return (
      <div className="app">
        <Header />
        <AddToDoForm
          onSubmit={ this.onSubmitForm }
        />

        <ul className="list-items">
          { items.map(item => (
            <ToDoItem
              key={ item.id }
              item={ item }
              updateTodo={ this.updateTodo }
              removeToDo={ this.removeToDo }
            />
          ))}
        </ul>

      </div>
    );
  }
}
