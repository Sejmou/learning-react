import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = props => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = item => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {hasItems ? (
        <>
          {cartItems}
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
          </div>
          <CheckoutForm />
        </>
      ) : (
        <p>
          The cart is currently empty.
          <br />
          Choose some delicious food first and come back here to order it!
        </p>
      )}
      <div className={classes.actions}>
        <button
          className={hasItems ? classes['button--alt'] : classes.button}
          onClick={props.onClose}
        >
          Close
        </button>
        {hasItems && (
          <button className={classes.button} onClick={props.onOrder}>
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
