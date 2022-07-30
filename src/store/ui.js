import { createSlice } from '@reduxjs/toolkit';

const initialUiState = {
  showCart: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    toggleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

export default uiSlice.reducer;

export const uiActions = uiSlice.actions;
