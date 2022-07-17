import { Fragment, Component } from 'react';
// import { useState, useEffect } from 'react';

import Users from './Users';
import classes from './UserFinder.module.css';

const DUMMY_USERS = [
  { id: 'u1', name: 'Max' },
  { id: 'u2', name: 'Manuel' },
  { id: 'u3', name: 'Julie' },
];

class UserFinder extends Component {
  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: '',
    };
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  componentDidMount() {
    // executes just once, when component has been evaluated and rendered for first time (state updates occuring in here will still be reflected before the user sees the intermediate state)
    // roughly equivalent to useEffect(..., []) or useEffect(..., [someDep]) if someDep just changes once in the beginning

    // this is just a toy example, mimicking fetching users from a DB to show how componentDidMount() can be used
    // in our case, we could actually just provide the DUMMY_USERS in the constructor directly

    // imagine you send an HTTP request here...
    setTimeout(() => this.setState({ filteredUsers: DUMMY_USERS }), 500);
  }

  componentDidUpdate(prevProps, prevState) {
    // called whenever some particular part of the component's state changed
    // depending on those state changes we can then change other parts of the component state
    // if we update the state, we always need to check what exactly changed as otherwise we would run into an infinite loop
    // the code below is roughly equivalent to useEffect(..., [searchTerm])
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: DUMMY_USERS.filter(user =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <Users users={this.state.filteredUsers} />
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter(user => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = event => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type="search" onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
