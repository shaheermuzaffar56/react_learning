import { useParams } from 'react-router-dom'
import { products } from './data'

function ProductDetail() {
  const { id } = useParams(); 

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p>Product not found.</p>;

  return (
    <div>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
    </div>
  );
}
export default ProductDetail;