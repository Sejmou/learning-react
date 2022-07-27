import classes from './CartItem.module.css';

const CartItem = props => {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li className={classes['container']}>
      <span>
        {props.name} (x{props.amount})
      </span>
      <span className={classes.price}>{price}</span>
    </li>
  );
};

export default CartItem;
