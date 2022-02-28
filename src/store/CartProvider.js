import { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

// don't define this is in provider!
// shouldn't be re-evaluated/re-created every time provider changes
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    // note: calculating totals with floating point prices is not ideal
    // problem: floating point imprecision :/
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = [...state.items, action.item];
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else if (action.type === 'REMOVE') {
    // remove one item from cart (note: not removing all items with same ID at once!)
    const existingCartItemIndex = state.items.findIndex(
      item => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];

    // note: calculating totals with floating point prices is not ideal
    // problem: floating point imprecision :/
    const updatedTotalAmount = existingCartItem
      ? state.totalAmount - existingCartItem.price
      : state.totalAmount;

    let updatedItems;
    if (existingCartItem?.amount === 1) {
      updatedItems = state.items.filter(
        item => item.id !== existingCartItem.id
      );
    } else {
      updatedItems = [...state.items];
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      }
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  } else {
    return defaultCartState;
  }
};

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  ); //use reducer, set default state

  const addItemToCartHandler = item =>
    dispatchCartAction({ type: 'ADD', item });
  const removeItemFromCartHandler = id =>
    dispatchCartAction({ type: 'REMOVE', id });

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
