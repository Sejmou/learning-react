import React, { useState } from 'react';

const initialAuthState = {
  token: '',
  isLoggedIn: false,
  login: token => {},
  logout: () => {},
};

const AuthContext = React.createContext(initialAuthState);

export default AuthContext;

export const AuthContextProvider = props => {
  const [token, setToken] = useState(null);
  const isLoggedIn = !!token;

  const loginHandler = token => {
    setToken(token);
  };
  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
