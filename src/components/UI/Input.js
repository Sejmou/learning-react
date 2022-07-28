import React from 'react';
import classes from './Input.module.css';

const Input = props => {
  const {
    id,
    label,
    value,
    type,
    hasError,
    errorMessage,
    changeHandler,
    blurHandler,
  } = props;

  const nameInputClasses = hasError
    ? `${classes['form-control']} ${classes.invalid}`
    : classes['form-control'];

  return (
    <div className={nameInputClasses}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        onChange={changeHandler}
        onBlur={blurHandler}
        value={value}
      />
      {hasError && <p className={classes['error-text']}>{errorMessage}</p>}
    </div>
  );
};

export default Input;
