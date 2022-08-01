const MainHeader = () => {
  return (
    <header>
      <nav>
        <ul>
          {/* This current routing solution is bad: The page refreshes every time we change routes!
              Luckily, React Router has a better way to solve this that will be introduced soon
           */}
          <li>
            <a href="/welcome">Welcome</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainHeader;
