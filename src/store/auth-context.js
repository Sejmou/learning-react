import React, { useState, useEffect } from 'react';

const initialAuthState = {
  token: '',
  isLoggedIn: false,
  login: (token, expirationTime) => {},
  logout: () => {},
};

let logoutTimer;

const AuthContext = React.createContext(initialAuthState);

export default AuthContext;

export const AuthContextProvider = props => {
  const { token: initialToken, remainingTime } = getStoredTokenData();
  const [token, setToken] = useState(initialToken);
  const isLoggedIn = !!token;

  useEffect(() => {
    if (remainingTime) {
      logoutTimer = setTimeout(logoutHandler, remainingTime);
    }
  }, [remainingTime]);

  const loginHandler = (token, expirationTime) => {
    localStorage.setItem('token', token);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
    localStorage.setItem('tokenExpiration', expirationTime);

    setToken(token);
  };
  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    if (logoutTimer) clearTimeout(logoutTimer);
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

function calculateRemainingTime(expirationTime) {
  const nowMillis = new Date().getTime();
  const expTimeMillis = new Date(expirationTime).getTime();
  return expTimeMillis - nowMillis;
}

function getStoredTokenData() {
  const token = localStorage.getItem('token');
  if (!token) return {};

  const storedExpirationTime = localStorage.getItem('tokenExpiration');
  const remainingTime = calculateRemainingTime(storedExpirationTime);
  if (remainingTime <= 36000) {
    // it doesn't make sense to log in user if their token expires in less than a minute
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    return {};
  }

  return { token, remainingTime };
}
