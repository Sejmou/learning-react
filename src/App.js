import { useState } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';
import DeliveryDetailsProvider from './store/DeliveryDetailsProvider';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import CheckoutConfirmation from './components/Checkout/CheckoutConfirmation';

function App() {
  const [currentMainPage, setCurrentMainPage] = useState('menu');

  const showCartHandler = () => {
    setCurrentMainPage('cart');
  };

  const backToMenuHandler = () => {
    setCurrentMainPage('menu');
  };

  const checkoutHandler = () => {
    setCurrentMainPage('checkout');
  };

  const checkoutSuccessHandler = () => {
    setCurrentMainPage('confirmation');
  };

  const getCurrentModal = mainPageId => {
    switch (mainPageId) {
      case 'cart':
        return (
          <Cart onClose={backToMenuHandler} onCheckout={checkoutHandler} />
        );
      case 'checkout':
        return (
          <Checkout
            onClose={backToMenuHandler}
            onBack={showCartHandler}
            onCheckoutSuccess={checkoutSuccessHandler}
          />
        );
      case 'confirmation':
        return <CheckoutConfirmation onClose={backToMenuHandler} />;
      default:
        return '';
    }
  };

  const modal = getCurrentModal(currentMainPage);

  return (
    <CartProvider>
      <DeliveryDetailsProvider>{modal}</DeliveryDetailsProvider>
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
