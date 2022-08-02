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
            {/* Change #10: Nested routes can also be defined directly in the parent component (e.g. App.js)
                Simply use nested routes as children of Route!
                To define where in component nested routes should be output, use Outlet in it */}
            <Route path="/welcome/*" element={<Welcome />}>
              {/* Change #9: paths in nested routes AND links are now relative to parent!
                  i.e. instead of /welcome/new-user we write new-user */}
              <Route path="new-user" element={<p>Welcome, new user!</p>} />
            </Route>
            <Route path="/products" element={<Products />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default App;
