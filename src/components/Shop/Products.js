import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {
    id: 'p1',
    title: 'TopPhone 42',
    price: 999.99,
    description: 'The best phone ever made.',
  },
  {
    id: 'p2',
    title: 'Premium Charger',
    price: 49.99,
    description: 'Charge your phone in no time with QuickCharge!',
  },
  {
    id: 'p3',
    title: 'PremiumPhone Screen Cover',
    price: 9.99,
    description:
      'Protects your precious phone screen with new GorRriLlA32 technology.',
  },
];

const Products = props => {
  const productList = DUMMY_PRODUCTS.map(product => (
    <ProductItem item={product} key={product.id} />
  ));

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>{productList}</ul>
    </section>
  );
};

export default Products;
