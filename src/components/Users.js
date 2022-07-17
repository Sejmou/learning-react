import { Component } from 'react';
//import { useState } from 'react'; React Hooks cannot be used with class-based components!
import User from './User';

import classes from './Users.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class Users extends Component {
  constructor() {
    super(); // you always have to call constructor of Component class as well!
    // define initial state here
    // with class-based components it ALWAYS has to be an object called state!
    this.state = {};
  }

  // handlers are simply class instance methods!
  toggleUsersHandler() {
    // updating state does NOT work like this: this.state.showUsers = false;
    // always use this.setState() - expects an object as input
    // all defined props will be merged with existing state object behind the scenes, rest remains untouched
    // again, function with previous state as input and new state as output is supported as argument too
    this.setState(currState => ({
      showUsers: !currState.showUsers,
    }));
  }

  render() {
    const usersList = (
      <ul>
        {DUMMY_USERS.map(user => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button
          onClick={
            this.toggleUsersHandler.bind(this) // remember to bind this to the component instance!
          }
        >
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers(curState => !curState);
//   };

//   const usersList = (
//     <ul>
//       {DUMMY_USERS.map(user => (
//         <User key={user.id} name={user.name} />
//       ))}
//     </ul>
//   );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
