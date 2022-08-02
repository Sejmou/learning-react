import { Link, Outlet } from 'react-router-dom';

const Welcome = () => {
  return (
    <>
      <h1>Welcome!</h1>
      {/* Change #7: Nested routes now have to be wrapped with Routes, even when it's just a single one */}
      {/* Related to Change #10 (see App.js): We need an Outlet to specify where components of nested routes should be rendered */}
      <Outlet />
      {/* Example for relative link */}
      <Link to="new-user">New User? Click here</Link>
      {/* Of course, we can also specify absolute links */}
      <Link to="/Products">Surprise, Surprise</Link>
    </>
  );
};

export default Welcome;
