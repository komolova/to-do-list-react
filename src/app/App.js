import React from 'react';

import './Normalize.css';
import './App.css';

import { getTodos, removeTodo, updateTodo } from '../API/API';

import Header from './../components/Header';
import AddToDoForm from './../components/AddToDoForm';
import ToDoItem from './../components/ToDoItem';

export default class App extends React.Component {
  state = {
    items: []
  }

  componentDidMount() {
    getTodos()
      .then((todos) => {
        this.setState({
          items: [...this.state.items, ...todos]
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onSubmitForm = (todo) => {
    this.setState({
      items: [todo, ...this.state.items]
    });
  }

  onRemoveTodo = (id) => {
    removeTodo(id)
      .then(() => {
        this.setState({
          items: this.state.items.filter(item => item.id !== id)
        });
      });
  }

  toggleTodo = (todoId, done) => {
    updateTodo(todoId, done)
      .then(() => {
        this.setState({
          items: this.state.items.map((item) => {
            if (item.id === todoId) {
              return { ...item, done };
            }
            return item;
          })
        });
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
              toggleTodo={ this.toggleTodo }
              key={ item.id }
              item={ item }
              removeTodo={ this.onRemoveTodo }
            />
          ))}
        </ul>

      </div>
    );
  }
}
