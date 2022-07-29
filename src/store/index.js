// this is the exact same store as in the previous demo
import { createStore } from 'redux';

const initialState = { counter: 0, showCounter: true };

const counterReducer = (state = initialState, action) => {
  // be careful to ALWAYS return new state and NOT modify the existing/previous state
  // Redux only works reliably (without bugs) if you obey to this rule!

  if (action.type === 'increment') {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }

  if (action.type === 'increase') {
    return {
      ...state,
      counter: state.counter + action.amount,
    };
  }

  if (action.type === 'decrement') {
    return {
      ...state,
      counter: state.counter - 1,
    };
  }

  if (action.type === 'toggle') {
    return {
      ...state,
      showCounter: !state.showCounter,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
