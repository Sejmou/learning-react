import { useSelector } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
  // selectors are the way how we can access the "slices of app state" we need for our component
  // in this case it is simple: we just select the counter prop of the state object
  // in the background, a store subscription is set up (like we did in the demo before)
  // the subscription is also automatically cleared if the component unmounts
  const counter = useSelector(state => state.counter);

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
