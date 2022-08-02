import { Link, useNavigate } from 'react-router-dom';
// Change #11: useHistory for imperative routing was replaced by useNavigate

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
