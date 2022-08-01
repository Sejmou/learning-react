import { createSlice } from '@reduxjs/toolkit';

const initialUiState = {
  showCart: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, action) {
      const { status, title, message } = action.payload;
      state.notification = {
        status,
        title,
        message,
      };
    },
  },
});

export default uiSlice.reducer;

export const uiActions = uiSlice.actions;
