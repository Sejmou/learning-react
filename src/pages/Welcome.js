import { Link, Route, Routes } from 'react-router-dom';

const Welcome = () => {
  return (
    <>
      <h1>Welcome!</h1>
      {/* Change #7: Nested routes now have to be wrapped with Routes, even when it's just a single one */}
      <Routes>
        {/* Change #9: paths in nested routes AND links are now relative to parent!
            i.e. instead of /welcome/new-user we write new-user */}
        <Route path="new-user" element={<p>Welcome, new user!</p>} />
      </Routes>
      {/* Example for relative link */}
      <Link to="new-user">New User? Click here</Link>
      {/* Of course, we can also specify absolute links */}
      <Link to="/Products">Surprise, Surprise</Link>
    </>
  );
};

export default Welcome;
