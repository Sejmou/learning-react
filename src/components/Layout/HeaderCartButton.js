import { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx;

  const noOfItems = items.reduce((currNo, item) => currNo + item.amount, 0);

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ''
  }`;
  useEffect(() => {
    if (items.length === 0) return;

    setBtnIsHighlighted(true); // adds ".bump" class, triggering animation on button
    const timer = setTimeout(() => setBtnIsHighlighted(false), 300); // remove class again so animation can retrigger

    // remember, always use clean up function in useEffect when necessary!
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{noOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
