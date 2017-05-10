import React from 'react';

import './Normalize.css';
import './App.css';

import { getTodos } from './../api';

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
      items: [todo, ...this.state.items],
    });
  }

  onRemoveTodo = (id) => {
    this.setState({
      items: this.state.items.filter(item => item.id !== id)
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
              onRemoveTodo={ this.onRemoveTodo }
            />
          ))}
        </ul>

      </div>
    );
  }
}
