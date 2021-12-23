import classes from './AddUser.module.css';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import { useState } from 'react';

const AddUser = props => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  const [error, setError] = useState();

  const enteredUsernameChangeHandler = ev => {
    setEnteredUsername(ev.target.value);
  };

  const enteredAgeChangeHandler = ev => {
    setEnteredAge(ev.target.value);
  };

  const errorHandler = () => setError(null);

  const addUserHandler = ev => {
    ev.preventDefault();

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty).',
      });
      return;
    }

    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (>0).',
      });
      return;
    }

    props.onAddUser({ name: enteredUsername, age: enteredAge }); // pass on user data to parent
    setEnteredUsername('');
    setEnteredAge('');
  };

  return (
    <div>
      {/* hacky syntax to display error modal only if there is an error */}
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
    </div>
  );
};

export default AddUser;
