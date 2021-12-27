import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginInfo = localStorage.getItem('isLoggedIn');
    if (loginInfo === '1') {
      setIsLoggedIn(true);
    }
  }, []); // 2nd param === [] -> no dependency changes to observe; effect runs only on page (re-)load

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways

    //persist login state in local storage - would in practice be token or sth.
    localStorage.setItem('isLoggedIn', '1');

    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn'); //remove login 'token' -> user has to login again
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }} // pass data - use in components with AuthContext.Consumer or useContext(AuthContext)
    >
      <MainHeader />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
