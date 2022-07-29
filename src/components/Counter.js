import { useSelector, useDispatch } from 'react-redux';

import classes from './Counter.module.css';

const Counter = () => {
  // selectors are the way how we can access the "slices of app state" we need for our component
  // in this case it is simple: we just select the counter prop of the state object
  // in the background, a store subscription is set up (like we did in the demo before)
  // the subscription is also automatically cleared if the component unmounts
  const counter = useSelector(state => state.counter);

  const dispatch = useDispatch(); // the function returned by this hook is used for dispatching actions to the store

  const incrementHandler = () => {
    dispatch({ type: 'increment' });
  };
  const decrementHandler = () => {
    dispatch({ type: 'decrement' });
  };

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
