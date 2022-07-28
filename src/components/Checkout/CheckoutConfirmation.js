import { useContext } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Checkout.module.css';
import CartContext from '../../store/cart-context';
import DeliveryDetailsContext, {
  deliveryDetailDisplayNames,
} from '../../store/delivery-details-context';
import DeliveryDetailItem from './DeliveryDetailItem';

const CheckoutConfirmation = props => {
  const cartCtx = useContext(CartContext);
  const deliveryDetailsContext = useContext(DeliveryDetailsContext);

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

  const deliveryDetailList = Object.entries(deliveryDetailsContext)
    .filter(([key, value]) => deliveryDetailDisplayNames[key] !== undefined)
    .map(([key, value]) => (
      <DeliveryDetailItem
        leftVal={deliveryDetailDisplayNames[key]}
        rightVal={value}
      />
    ));

  const closeHandler = () => {
    cartCtx.clear();
    props.onClose();
  };

  return (
    <Modal onClose={closeHandler}>
      <h2>Order Summary</h2>
      <p className={classes['checkout-confirmation']}>
        Thank you very much for your order! We will try to deliver it ASAP.
      </p>
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
          <h3>Delivery Details</h3>
          {deliveryDetailList}
        </div>
      </div>
      <div className={classes.actions}>
        <button className={classes.button} onClick={closeHandler}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default CheckoutConfirmation;
