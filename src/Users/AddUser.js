const AddUser = props => {
  const addUserHandler = ev => {
    ev.preventDefault();
  };

  return (
    <form onSubmit={addUserHandler}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" />
      <label htmlFor="age">Age (Years)</label>
      <input type="textnumber" id="age" />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
