import { createSlice } from '@reduxjs/toolkit';

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
    set(state, action) {
      Object.keys(state).forEach(key => {
        state[key] = action.payload[key];
      });
    },
  },
});

export default cartSlice.reducer;

export const cartActions = cartSlice.actions;
