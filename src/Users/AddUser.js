import classes from './AddUser.module.css';

import Card from '../UI/Card';
import Button from '../UI/Button';

const AddUser = props => {
  const addUserHandler = ev => {
    ev.preventDefault();
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
        <label htmlFor="age">Age (Years)</label>
        <input type="textnumber" id="age" />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
  );
};

export default AddUser;
