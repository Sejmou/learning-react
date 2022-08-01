import { Route } from 'react-router-dom';

const Welcome = () => {
  return (
    <>
      <h1>Welcome!</h1>
      {/* We can define "nested routes" by importing and using Route in any of our components
          If this component is visible, it can render any additional stuff that matches the current path */}
      <Route path="/welcome/new-user">
        <p>Welcome, new user!</p>
      </Route>
    </>
  );
};

export default Welcome;
