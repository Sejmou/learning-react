import { useState, useContext } from 'react';

import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import Checkout from './components/Checkout/Checkout';
import CartContext from './store/cart-context';

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [checkoutIsShown, setCheckoutIsShown] = useState(false);
  const cartCtx = useContext(CartContext);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const checkoutHandler = () => {
    setCartIsShown(false);
    setCheckoutIsShown(true);
  };

  const hideCheckoutHandler = () => {
    setCheckoutIsShown(false);
  };

  const backHandler = () => {
    setCheckoutIsShown(false);
    setCartIsShown(true);
  };

  const checkoutSuccessHandler = () => {
    // I know, just closing the dialog is not really realistic behavior lol
    setTimeout(() => {
      setCartIsShown(false);
      setCheckoutIsShown(false);
      cartCtx.clear();
    }, 5000);
  };

  return (
    <CartProvider>
      {cartIsShown && (
        <Cart onClose={hideCartHandler} onCheckout={checkoutHandler} />
      )}
      {checkoutIsShown && (
        <Checkout
          onClose={hideCheckoutHandler}
          onBack={backHandler}
          onCheckoutSuccess={checkoutSuccessHandler}
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
