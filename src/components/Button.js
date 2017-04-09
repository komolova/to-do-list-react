import React from 'react';
import { PropTypes } from 'prop-types';

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

Button.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func
}
