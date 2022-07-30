import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = props => {
  const items = useSelector(state => state.cart.items);

  const itemList = items.map(item => <CartItem item={item} key={item.id} />);

  const content =
    items.length > 0 ? (
      <ul>{itemList}</ul>
    ) : (
      "You haven't added any items to your cart yet."
    );

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {content}
    </Card>
  );
};

export default Cart;
