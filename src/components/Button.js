import React from 'react';
import './Button.css';

export default function Button(props) {
  const {
    children,
    type
  } = props;

 const buttonClassName = [`bnt--type${type}`, 'btn'];

  return (
    <button type={ type } className={ buttonClassName }>
      { children }
    </button>
  );
}
