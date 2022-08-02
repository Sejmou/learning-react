import { NavLink } from 'react-router-dom';

import classes from './MainHeader.module.css';

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <nav>
        <ul>
          <li>
            {/* Change #5: activeClassName prop on NavLinks is gone!
                Instead, we can pass a function accepting information about the link as an argument to className to apply classes as needed */}
            <NavLink
              className={linkData => {
                console.log('data for "Welcome" link', linkData);
                return linkData.isActive ? classes.active : '';
              }}
              to="/welcome"
            >
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink
              className={linkData => (linkData.isActive ? classes.active : '')}
              to="/products"
            >
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainHeader;
