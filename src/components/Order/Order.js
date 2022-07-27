import React from 'react';

import Modal from '../UI/Modal';
import CartProvider from '../../store/CartProvider';

const Order = props => {
  return (
    <CartProvider>
      <Modal onClose={props.onOrderCancelled}>Test</Modal>
    </CartProvider>
  );
};

export default Order;
