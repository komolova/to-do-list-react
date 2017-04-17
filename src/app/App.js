import React from 'react';
import fetch from 'isomorphic-fetch';

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

  onChange = (e) => {
    this.setState({
      text: e.target.value
    });
  }

  getUrl = path => `http://localhost:3001/api/v1/${path}`

  getTodos = () => {
    fetch(this.getUrl('todos'))
    .then(this.getStatus)
    .then(response => response.json())
    .then((todos) => {
      this.setState({
        items: [...this.state.items, ...todos]
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  getStatus = (response) => {
    return (response.status >= 200 && response.status < 300)
    ? Promise.resolve(response)
    : Promise.reject(new Error(response.statusText));
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
    .then(this.getStatus)
    .then(response => response.json())
    .then((todo) => {
      this.setState({
        items: [todo, ...this.state.items],
        text: ''
      });
    })
    .catch((error) => {
      console.log(error);
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
    const { items, text } = this.state;

    return (
      <div className="app">
        <Header />
        <AddToDoForm
          onChange={this.onChange}
          onSubmit={this.addToDo}
          value={text} />

        <ul className="list-items">
          { items.map(item => (
            <ToDoItem
              key={item.id}
              item={item}
              updateTodo={this.updateTodo}
              removeToDo={this.removeToDo}
              />
          ))}
        </ul>

      </div>
    );
  }
}
