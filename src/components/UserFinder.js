import { Fragment, Component } from 'react';
// import { useState, useEffect } from 'react';
import UsersContext from '../store/users-context';

import Users from './Users';
import classes from './UserFinder.module.css';

class UserFinder extends Component {
  // weakness compared to useContext: you may only use one context per component!
  static contextType = UsersContext;

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
    setTimeout(() => this.setState({ filteredUsers: this.context.users }), 500);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter(user =>
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

export default UserFinder;
