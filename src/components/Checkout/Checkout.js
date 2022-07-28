import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CheckoutForm from '../Checkout/CheckoutForm';
import classes from './Checkout.module.css';
import CartContext from '../../store/cart-context';
import DeliveryDetailsContext from '../../store/delivery-details-context';
import useBackend from '../../hooks/use-backend';

const formId = 'checkout-form';

const Checkout = props => {
  const cartCtx = useContext(CartContext);
  const deliveryDetailsCtx = useContext(DeliveryDetailsContext);

  const { sendRequest, isLoading, error } = useBackend();

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

  // called when form is valid and user clicked the submit/order button
  const submitSuccessHandler = async formValue => {
    await sendRequest(
      {
        endpoint: 'orders',
        body: {
          ...formValue,
          order: cartCtx.items.map(item => ({
            id: item.id,
            amount: item.amount,
          })),
          timeStamp: new Date().toISOString(),
        }, // this is a really bad and insecure way of doing things, backend should add timestamp and validate data; TODO: research how to do this with Firebase
      },
      () => {
        deliveryDetailsCtx.set(formValue);
        props.onCheckoutSuccess();
      }
    );
  };

  let orderStatusInfo = '';

  if (isLoading) {
    orderStatusInfo = 'Processing your order...';
  }
  if (error) {
    orderStatusInfo =
      'Something went wrong while sending your order. Try clicking the "Order" button again.';
  }

  return (
    <Modal onClose={props.onClose}>
      <div className={classes.container}>
        <div className={classes['order-summary-container']}>
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
      {orderStatusInfo}
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
