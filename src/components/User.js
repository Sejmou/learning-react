import { Component } from 'react';

import classes from './User.module.css';

class User extends Component {
  render() {
    return <li className={classes.user}>{this.props.name}</li>;
  }

  componentWillUnmount() {
    // called before component unmounts
    // rouhgly equivalent to cleanup function in useEffect with empty deps array
    console.log(`User ${this.props.name} will unmount`);
  }
}

// const User = (props) => {
//   return <li className={classes.user}>{props.name}</li>;
// };

export default User;
