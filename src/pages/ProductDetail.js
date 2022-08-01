import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const params = useParams();
  const { productId } = params;

  return (
    <section>
      <h1>Product Details for {productId}</h1>
    </section>
  );
};

export default ProductDetail;
