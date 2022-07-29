import { useSelector, useDispatch } from 'react-redux';

import Counter from './components/Counter';
import Header from './components/Header';
import Auth from './components/Auth';
import { authActions } from './store';

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const loginHandler = () => {
    dispatch(authActions.login());
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const content = isAuthenticated ? (
    <>
      <Header onLogout={logoutHandler} />
      <Counter />
    </>
  ) : (
    <Auth onLogin={loginHandler} />
  );

  return content;
}

export default App;
