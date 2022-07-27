import { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import Order from './components/Order/Order';
import CartProvider from './store/CartProvider';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orderIsShown, setOrderIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const orderHandler = () => {
    console.log('test');
    setCartIsShown(false);
    setOrderIsShown(true);
  };

  const completeOrderHandler = () => {
    console.log('TODO: send request to backend');
  };

  const cancelOrderHandler = () => {
    setOrderIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} onOrder={orderHandler} />}
      {orderIsShown && (
        <Order
          onOrderCancelled={cancelOrderHandler}
          onOrderCompleted={completeOrderHandler}
        />
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
