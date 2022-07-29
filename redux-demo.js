const redux = require('redux');

// default value is actually initial state of store
const counterReducer = (state = { counter: 0 }, action) => {
  return { counter: state.counter + 1 };
};

const store = redux.createStore(counterReducer);

// this function will be triggered on every state change (after the store.subscribe() call where it is provided as parameter)
const counterSubscriber = () => {
  const latestState = store.getState();
  console.log(latestState);
};

store.subscribe(counterSubscriber);

store.dispatch({ type: 'increment' }); // this will cause {counter: 2} to be logged
// the initial state after creating the store is actually the value returned by the reducer when calling it for the first time - in our case {counter : 1 }
// then, the call to dispatch() triggered another reducer call with the action as second argument
// however, the action is not used in the reducer atm, so the result is always incrementing the counter
