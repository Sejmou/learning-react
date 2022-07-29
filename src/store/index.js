import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { counter: 0, showCounter: true };

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      // we are allowed to modify the state we get here!
      // the way redux-toolkit is setup makes it impossible to mutate existing state
      // internally the immer package is used to achieve this, more info here: https://immerjs.github.io/immer/example-setstate
      state.counter++;

      //Note: also be careful when using arrow functions in the reducers - caveats are explained in link above as well
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      // we also always get access to the action via the second argument
      state.counter = state.counter + action.payload;
      // note that we cannot use the amount prop as before; instead any additional data required for the action is stored in a payload prop!
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});

// configureStore is an easier-to-use alternative to createStore()
const store = configureStore({
  // the expected argument is a config object
  reducer: {
    // we could provide a single reducer instead of an object as well
    // however, this way we can have separate reducers for the different state slices of the store
    // using an object like this allows us to merge reducers for the slices into a "global reducer"
    counter: counterSlice.reducer,
  },
});

// when using createSlice(), we also always get back an actions prop which is an object whose keys are the names of the reducer functions
// the values are simply action objects with an auto-generated unique ID
export const counterActions = counterSlice.actions;

export default store;
