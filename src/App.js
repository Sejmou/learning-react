import { Route } from 'react-router-dom';

import MainHeader from './components/MainHeader';
import Welcome from './pages/Welcome';
import Products from './pages/Products';

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
        </div>
      </main>
    </>
  );
}

export default App;
