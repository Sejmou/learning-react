import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui';

const initialCartState = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItem(state, action) {
      const { items } = state;
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity++;
      } else {
        items.push({ ...item, quantity: 1 });
      }
      state.totalQuantity++;
    },
    removeItem(state, action) {
      const { items } = state;
      const itemId = action.payload;
      const existing = state.items.find(item => item.id === itemId);
      if (existing) {
        existing.quantity--;
        if (existing.quantity <= 0) {
          state.items = items.filter(i => i.id !== itemId);
        }
        state.totalQuantity--;
      }
    },
    replace(state, action) {
      const newCart = action.payload;
      state.items = newCart.items || [];
      state.totalQuantity = newCart.totalQuantity;
    },
  },
});

export default cartSlice.reducer;

export const cartActions = cartSlice.actions;

// we can use so-called thunks (https://redux.js.org/usage/writing-logic-thunks, https://en.wikipedia.org/wiki/Thunk) for actions with side-effects
// In Redux, thunks are functions accepting the dispatch and getState functions of the store as a parameter
// inside of the returned function we can invoke dispatch and getState as we please, both synchronously and asynchronously
// we can take all the steps required to cover all the side effects resulting from an action

// a simple way to create thunks in Redux is by using thunk action creators
// i.e. functions accepting any required parameters for the action with side effects as argument and returning a thunk function with the signature described above
// we can import those thunk action creators in any component that needs to make use of the thunk
// to dispatch the thunk, we would then call the thunk action creator just like we call the action creators of state slices
// (remember: those are available via the actions property of the object returned by createSlice())

// The code below is an example thunk action creator for fetching shopping cart data from a Firebase backend.
// The thunk it returns does the following:
// * fetch the data from the backend,
// * dispatch actions for showing appropriate notifications during the data fetching process (handling both success and failure too) and
// * dispatch an action for updating the cart when the data was fetched
export const fetchCartFromBackend = () => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Loading...',
        message: 'Getting cart data from server',
      })
    );

    try {
      const response = await fetch(
        'https://react-course-schwarzmueller-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
      );
      const cart = await response.json();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Fetched cart data successfully!',
        })
      );
      dispatch(cartActions.replace(cart));
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Fetching cart data failed!',
        })
      );
    }
  };
};

export const syncCartToBackend = cart => {
  return async dispatch => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Loading...',
        message: 'Sending cart data to server',
      })
    );

    try {
      await fetch(
        'https://react-course-schwarzmueller-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
        { method: 'PUT', body: JSON.stringify(cart) }
      );

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Stored cart data on server!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Sending cart data failed!',
        })
      );
    }
  };
};
