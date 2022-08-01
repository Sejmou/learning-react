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
      const { status, message, title } = action.payload;
      state.notification = {
        status,
        message,
        title,
      };
    },
  },
});

export default uiSlice.reducer;

export const uiActions = uiSlice.actions;
