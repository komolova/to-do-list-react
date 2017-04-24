import fetch from 'isomorphic-fetch';

const getUrl = path => `http://localhost:3001/api/v1/${path}`;

const getStatus = response => (response.status >= 200 && response.status < 300)
  ? Promise.resolve(response)
  : Promise.reject(response);

const getTodos = () => fetch(getUrl('todos'))
.then(getStatus)
.then(response => response.json());

const addTodo = text => fetch(getUrl('todos'), {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    todo: {
      name: text
    }
  })
})
.then(getStatus)
.then(response => response.json());

const removeToDo = id => fetch(this.getUrl(`todos/${id}`), {
  method: 'delete',
  headers: { 'Content-Type': 'application/json' }
})
.then(this.getStatus)
.then(response => response.json());

const updateTodo = (id, isDone) => fetch(this.getUrl(`todos/${id}`), {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    todo: {
      done: isDone
    }
  })
})
.then(this.getStatus)
.then(response => response.json());

export {
  getTodos,
  addTodo,
  removeToDo,
  updateTodo
};
