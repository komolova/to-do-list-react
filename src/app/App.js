import React from 'react';

import './Normalize.css';
import './App.css';

import Header from './../components/Header';
import AddToDoForm from './../components/AddToDoForm';

export default function App() {
  return (
    <div className="App">
      <Header />
      <AddToDoForm />
    </div>
  );
}
