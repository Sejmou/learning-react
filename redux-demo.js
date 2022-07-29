const redux = require('redux');

// default value is actually initial state of store
const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }

  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  // if no action type matches, just return same state as before
  return state;
};

const store = redux.createStore(counterReducer);

// this function will be triggered on every state change (after the store.subscribe() call where it is provided as parameter)
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({ type: 'increment' }); // this will cause {counter: 1} to be logged
// the initial state after creating the store is actually the value returned by the reducer when calling it for the first time - in our case {counter : 0 }
// then, the call to dispatch() triggered another reducer call with the action as second argument
// as the action type was 'increment', the reducer incremented the counter

store.dispatch({ type: 'decrement' }); // you know what's gonna happen, right?
