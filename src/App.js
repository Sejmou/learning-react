import { Navigate, Route, Routes } from 'react-router-dom';

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
            {/* Change #6: Redirect is now Navigate; it also features a new replace prop - without it, we would push to the history instead of replacing
                i.e. the intermediate route (/ in this case) would remain if the user were to click the back button in the browser */}
            <Route path="/" element={<Navigate replace to="/welcome" />} />
            {/* Change #8: For nested routes to work it is necessary to use the wildcard syntax with "*" */}
            <Route path="/welcome/*" element={<Welcome />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
