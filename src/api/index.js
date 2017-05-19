import fetch from 'isomorphic-fetch';

const getUrl = path => `http://localhost:3001/api/v1/${path}`;

const getStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }
  return Promise.reject(response);
};

export const getTodos = () => fetch(getUrl('todos'))
.then(getStatus)
.then(response => response.json());

export const addTodo = text => fetch(getUrl('todos'), {
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

export const removeTodo = id => fetch(getUrl(`todos/${id}`), {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' }
})
.then(getStatus)
.then(response => response.json());

export const updateTodo = (id, isDone) => fetch(getUrl(`todos/${id}`), {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    todo: {
      done: isDone
    }
  })
})
.then(getStatus)
.then(response => response.json());
