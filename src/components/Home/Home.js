import React from 'react';

import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import classes from './Home.module.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const Home = () => {
  //Note: Max doesn't use context here, relies on props instead
  //props are generally still ok to use if we are not passing data through several layers
  const ctx = useContext(AuthContext);

  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={ctx.onLogout}>Logout</Button>
    </Card>
  );
};

export default Home;
