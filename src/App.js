import { Route, Routes } from 'react-router-dom';
// Change #1: Switch is now Routes

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
          <Routes>
            {/*
            Change #2: Route config doesn't work like this anymore: 
            <Route path="/welcome">
              <Welcome />
            </Route> */}
            <Route path="/welcome" element={<Welcome />} />
            {/* Change #3: exact prop is obsolete, now most specific match "wins" per default
                So,  <Route path="/products/edit" element={...} /> would for example also work as it is most specific here*/}
            {/* Change #4: order of routes doesn't matter anymore */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
