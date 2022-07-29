import { useSelector, useDispatch } from 'react-redux';

import { counterActions } from '../store/counter';
import classes from './Counter.module.css';

const Counter = () => {
  // note that, contrary to before, state.counter is now the counter slice of the global app state
  // so, it is an object with counter and showCounter props, which we can simply extract
  const { counter, showCounter } = useSelector(state => state.counter);

  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch(counterActions.increment());
    // this will create an action that looks like this: { type: SOME_UNIQUE_ID }
  };
  const increaseHandler = () => {
    dispatch(counterActions.increase(10));
    // this will create an action that looks like this: { type: SOME_UNIQUE_ID, payload: 10 }
  };
  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleHandler = () => {
    dispatch(counterActions.toggle());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increase by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
