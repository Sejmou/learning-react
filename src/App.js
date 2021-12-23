import { useState } from 'react';
import AddUser from './Users/AddUser';
import UsersList from './Users/UsersList';

function App() {
  const [users, setUsers] = useState([]);

  const addUserHandler = newUser => {
    setUsers(prevUsers => [
      ...prevUsers,
      { ...newUser, id: Math.random().toString() },
    ]);
  };

  return (
    <div>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={users} />
    </div>
  );
}

export default App;
