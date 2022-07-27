import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CheckoutForm from '../Checkout/CheckoutForm';
import classes from './Checkout.module.css';
import CartContext from '../../store/cart-context';

const Checkout = props => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <div>
          <h3>Your Order</h3>
          <div className={classes['order-summary']}>
            {cartItems}
            <div className={classes.total}>
              <span>Total</span>
              <span>{totalAmount}</span>
            </div>
          </div>
        </div>
        <div>
          <h2>Delivery Details</h2>
          <CheckoutForm />
        </div>
      </div>
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onBack}>
          Back
        </button>
        <button className={classes.button} onClick={props.onOrder}>
          Order
        </button>
      </div>
    </Modal>
  );
};

export default Checkout;
