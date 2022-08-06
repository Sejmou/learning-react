import React from 'react';

import './Modal.css';

const Modal = props => {
  const cssClasses = getCssClasses(props.transitionState);

  return (
    <div className={cssClasses}>
      <h1>A Modal</h1>
      <button className="Button" onClick={props.onClose}>
        Dismiss
      </button>
    </div>
  );
};
export default Modal;

function getCssClasses(transitionState) {
  const classes = ['modal'];
  if (transitionState === 'entering') classes.push('modal--opening');
  if (transitionState === 'exiting') classes.push('modal--closing');
  return classes.join(' ');
}
