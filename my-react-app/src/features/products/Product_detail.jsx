import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products, variants, categories, getVariantLabel } from './data'
import { useAppContext } from '../../context/AppContext'

function ProductDetail() {
  const { id } = useParams();
  const { cartItems, handleAdd, handleIncrement, handleDecrement } = useAppContext();

  const product = products.find((p) => p.id === Number(id));
  const productVariants = variants.filter((v) => v.productId === Number(id));

  const [selectedVariantId, setSelectedVariantId] = useState(productVariants[0]?.id);
  const selectedVariant = productVariants.find((v) => v.id === Number(selectedVariantId));

  if (!product) return <p>Product not found.</p>;

  const cartEntry = cartItems.find(
    (item) => item.id === product.id && item.variantId === selectedVariant.id
  );
  const quantity = cartEntry ? cartEntry.quantity : 0;
  const outOfStock = selectedVariant.stock === 0;
  const categoryName = categories.find((c) => c.id === product.categoryId)?.name;

  return (
    <div>
      <Link to="/">&larr; Back to products</Link>

      <div style={{
        width: '300px', height: '250px', backgroundColor: '#e0e0e0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#888', margin: '16px 0',
      }}>
        Image
      </div>

      <p style={{ color: '#666' }}>{categoryName}</p>
      <h1>{product.name}</h1>
      <p>${product.price}</p>

      {productVariants.length > 1 && (
        <select value={selectedVariantId} onChange={(e) => setSelectedVariantId(Number(e.target.value))}>
          {productVariants.map((v) => (
            <option key={v.id} value={v.id}>{getVariantLabel(v)}</option>
          ))}
        </select>
      )}

      <p>Stock: {selectedVariant.stock}</p>

      {quantity === 0 ? (
        <button disabled={outOfStock} onClick={() => handleAdd(product, selectedVariant.id)}>
          {outOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      ) : (
        <div>
          <button onClick={() => handleDecrement(product.id, selectedVariant.id)}>-</button>
          <span> {quantity} </span>
          <button disabled={quantity >= selectedVariant.stock} onClick={() => handleIncrement(product.id, selectedVariant.id)}>+</button>
        </div>
      )}
    </div>
  );
}
export default ProductDetail;