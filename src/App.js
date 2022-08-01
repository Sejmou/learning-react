import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { fetchCartFromBackend, syncCartToBackend } from './store/cart';

let initialRender = true;

function App() {
  // The app should always sync the cart with the backend
  // the clean solution for doing this is keeping most logic for managing the actual cart on the server + adding validation for the data coming from clients!
  // but as this is a frontend-focused course, we're preparing the data for storage in the backend on the frontend already
  // we can't put such side-effect logic into the state reducers directly, as they only handle synchronous state changes without side effects
  // Note: a more Reduxy approach to handling async code and code with side effects (e.g. HTTP requests) will be introduced later

  const dispatch = useDispatch();
  const showCart = useSelector(state => state.ui.showCart);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartFromBackend());
  }, [dispatch]);

  useEffect(() => {
    if (initialRender) {
      // cart not yet fetched from the backend - we must not send this cart to the backend as it would delete the one that could be stored in the backend!
      initialRender = false;
      return;
    }

    // this check is necessary to prevent this effect from triggering after data is fetched from backend
    if (cart.localChanges) {
      dispatch(syncCartToBackend(cart));
    }
  }, [cart, dispatch]);

  return (
    <>
      {notification && <Notification {...notification} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
