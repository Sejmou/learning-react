import React, { useRef, useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

import classes from './AddUser.module.css';

const AddUser = props => {
  const [error, setError] = useState();

  // Those two vars are passed to inputs in returned JSX
  //React will make sure those vars contain references to the actual input DOM elements when the JSX is executed!
  const usernameInputRef = useRef();
  const ageInputRef = useRef();

  const addUserHandler = event => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value; // useRef() always stores ref to element in 'current' prop
    const enteredAge = ageInputRef.current.value;

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);

    //Caution: manipulating DOM elements directly is usually discouraged in React
    //In this case, however, it is ok
    usernameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {/* This empty tag is a React fragment - allows rendering several sibling components without needing wrapping div
          In some projects "Fragment" has to be imported and we have to use <Fragment> instead
        */}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          {/* By relying on the ref to the native DOM input elements they become
              "uncontrolled" i.e. not controlled by React */}
          <input id="username" type="text" ref={usernameInputRef} />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
