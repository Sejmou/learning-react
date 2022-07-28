import { useContext, useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CheckoutForm from '../Checkout/CheckoutForm';
import classes from './Checkout.module.css';
import CartContext from '../../store/cart-context';

const formId = 'checkout-form';

const Checkout = props => {
  const [showCheckoutConfirmation, setShowCheckoutConfirmation] =
    useState(false);
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

  const submitSuccessHandler = formValue => {
    console.log('form submitted successfully!');
    console.log('value', formValue);
    setShowCheckoutConfirmation(true);
    props.onCheckoutSuccess();
  };

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
          <CheckoutForm id={formId} onSubmitSuccess={submitSuccessHandler} />
        </div>
      </div>
      {showCheckoutConfirmation && (
        <p className={classes['checkout-confirmation']}>
          Thank you for your order! We will try to deliver it ASAP.
        </p>
      )}
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onBack}>
          Back
        </button>

        {/* this is apparently a way to submit forms with plain React: https://stackoverflow.com/a/53573760/13727176 */}
        <button type="submit" form={formId} className={classes.button}>
          Order
        </button>
      </div>
    </Modal>
  );
};

export default Checkout;
