import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// don't define this is in provider!
// shouldn't be re-evaluated/re-created every time provider changes
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      const updatedItems = [...state.items, action.item];
      const updatedTotalAmount =
        state.totalAmount + action.item.price * action.item.amount;

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
  }

  return defaultCartState;
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  ); //use reducer, set default state

  const addItemToCartHandler = item => {
    dispatchCartAction({ type: 'ADD', item });
  };
  const removeItemFromCartHandler = () => {};

  const cartCtx = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartCtx}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
