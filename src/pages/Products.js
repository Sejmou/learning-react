import { Link, useNavigate } from 'react-router-dom';
// Change #11: useHistory for imperative routing was replaced by useNavigate
// Change #12: Prompt was removed, need to figure out workaround yourself!

const Products = () => {
  const navigate = useNavigate();

  const clickHandler = () => {
    setTimeout(() => {
      // more realistically, we would use the navigate function in useEffect etc. (e.g. after successful HTTP request)
      // we have navigation options as well, which we add via a config object
      navigate('/welcome', { replace: true });
    }, 2000);
  };

  return (
    <section>
      <h1>The Products Page</h1>
      <button onClick={clickHandler} className="btn">
        Pointless button (will redirect after 2 seconds)
      </button>
      {/* Very cool: provide negative number n to go back n steps in navigation history!  */}
      <button onClick={() => navigate(-1)} className="btn">
        Back to previous page
      </button>
      <ul>
        <li>
          <Link to="/products/1">Product 1</Link>
        </li>
        <li>
          <Link to="/products/2">Product 2</Link>
        </li>
        <li>
          <Link to="/products/3">Product 3</Link>
        </li>
      </ul>
    </section>
  );
};
export default Products;
