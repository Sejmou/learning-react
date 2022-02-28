import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';

const Cart = props => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$ ${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = id => cartCtx.removeItem(id);
  const cartItemAddHandler = item => cartCtx.addItem({ ...item, amount: 1 });

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          {...item} // pass all other props of item as key value pairs
          onRemove={
            //bind() creates "bound function" whose first argument is bound to second argument we passed to bind()
            // first argument to bind() sets value of "this" inside the created function's body
            cartItemRemoveHandler.bind(null, item.id)
          }
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button
          className={classes['button--alt']}
          type="button"
          onClick={props.onClose}
        >
          Close
        </button>
        {hasItems && (
          <button className={classes.button} type="button">
            Order
          </button>
        )}
      </div>
    </Modal>
  );
};

export default Cart;
