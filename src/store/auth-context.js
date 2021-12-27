import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  // it's always a good idea to provide defaults for all values
  // adds autocomplete in IDEs
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = props => {
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
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
