import classes from './AddUser.module.css';

import Card from '../UI/Card';
import Button from '../UI/Button';
import { useState } from 'react';

const AddUser = props => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');

  const enteredUsernameChangeHandler = ev => {
    setEnteredUsername(ev.target.value);
  };

  const enteredAgeChangeHandler = ev => {
    setEnteredAge(ev.target.value);
  };

  const addUserHandler = ev => {
    ev.preventDefault();

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      return;
    }

    if (enteredAge < 1) return;

    console.log(enteredUsername, enteredAge);
    setEnteredUsername('');
    setEnteredAge('');
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={enteredUsername}
          onChange={enteredUsernameChangeHandler}
        />
        <label htmlFor="age">Age (Years)</label>
        <input
          type="number"
          id="age"
          value={enteredAge}
          onChange={enteredAgeChangeHandler}
        />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
