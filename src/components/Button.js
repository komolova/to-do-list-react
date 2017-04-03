import React from 'react';
import './Button.css';

export default function Button(props) {
  const {
    children,
    type,
    className,
    onClick
  } = props;

 const buttonClassName = `${className} btn`;

  return (
    <button type={ type } className={ buttonClassName } onClick={ onClick }>
      { children }
    </button>
  );
}
