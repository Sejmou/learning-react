import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store/index';

const root = ReactDOM.createRoot(document.getElementById('root'));
// to make the redux store available to the app, wrap it with the Provider element from react-redux!
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
