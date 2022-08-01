import { Route, Switch } from 'react-router-dom';

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
          <Switch>
            <Route path="/welcome">
              <Welcome />
            </Route>
            <Route path="/products/:productId">
              <ProductDetail />
            </Route>
            <Route path="/products">
              <Products />
            </Route>
          </Switch>
        </div>
      </main>
    </>
  );
}

export default App;
