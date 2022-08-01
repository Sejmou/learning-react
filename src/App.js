import { Route } from 'react-router-dom';

import MainHeader from './components/MainHeader';
import Welcome from './pages/Welcome';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <>
      <MainHeader />
      <main>
        <div>
          <Route path="/welcome">
            <Welcome />
          </Route>
          <Route path="/products">
            <Products />
          </Route>
          {/* The ":" is special React Router syntax for dynamic route params */}
          <Route path="/product-details/:productId">
            <ProductDetail />
          </Route>
        </div>
      </main>
    </>
  );
}

export default App;
