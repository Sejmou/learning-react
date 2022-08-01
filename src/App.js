import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { cartActions } from './store/cart';
import { uiActions } from './store/ui';

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
    fetchCartFromBackend(
      () => {
        dispatch(
          uiActions.showNotification({
            status: 'pending',
            title: 'Loading...',
            message: 'Getting cart data from server',
          })
        );
      },
      cartData => {
        dispatch(
          uiActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Fetched cart data successfully!',
          })
        );
        dispatch(cartActions.set(cartData));
      },
      () => {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Fetching cart data failed!',
          })
        );
      }
    );
  }, [dispatch]);

  useEffect(() => {
    if (initialRender) {
      // cart still empty as it is not yet fetched from the backend - we must not send the (empty) cart to the backend!
      initialRender = false;
      return;
    }

    syncCartToBackend(
      cart,
      () => {
        dispatch(
          uiActions.showNotification({
            status: 'pending',
            title: 'Loading...',
            message: 'Sending cart data to server',
          })
        );
      },
      () => {
        dispatch(
          uiActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Stored cart data on server!',
          })
        );
      },
      () => {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Sending cart data failed!',
          })
        );
      }
    );
  }, [cart, dispatch]); // dispatch is actually guaranteed to never change, we just silence the IDE

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

async function fetchCartFromBackend(
  startHandler,
  successHandler,
  errorHandler
) {
  startHandler();

  try {
    const response = await fetch(
      'https://react-course-schwarzmueller-default-rtdb.europe-west1.firebasedatabase.app/cart.json'
    );
    const data = await response.json();
    successHandler(data);
  } catch (error) {
    errorHandler(error);
  }
}

async function syncCartToBackend(
  cart,
  startHandler,
  successHandler,
  errorHandler
) {
  startHandler();
  try {
    await fetch(
      'https://react-course-schwarzmueller-default-rtdb.europe-west1.firebasedatabase.app/cart.json',
      { method: 'PUT', body: JSON.stringify(cart) }
    );
    successHandler();
  } catch (error) {
    errorHandler();
  }
}

export default App;
