import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { products, variants, categories, getVariantAttributeKeys } from './data'
import { useAppContext } from '../../context/AppContext'

function ProductDetail() {
  const { id } = useParams();
  const { cartItems, handleAdd, handleIncrement, handleDecrement } = useAppContext();

  const product = products.find((p) => p.id === Number(id));
  const productVariants = variants.filter((v) => v.productId === Number(id));

  const attributeKeys = getVariantAttributeKeys(productVariants);

  const [selectedAttrs, setSelectedAttrs] = useState(() => {
    const first = productVariants[0];
    return Object.fromEntries(attributeKeys.map((k) => [k, first?.[k]]));
  });

  const selectedVariant = productVariants.find((v) =>
    attributeKeys.every((k) => v[k] === selectedAttrs[k])
  );

  useEffect(() => {
    setSelectedAttrs((prev) => {
      let updated = { ...prev };
      let changed = false;

      attributeKeys.forEach((key, index) => {
        const validOptions = [...new Set(
          productVariants
            .filter((v) => attributeKeys.slice(0, index).every((k) => v[k] === updated[k]))
            .map((v) => v[key])
        )];

        if (!validOptions.includes(updated[key])) {
          updated[key] = validOptions[0];
          changed = true;
        }
      });

      return changed ? updated : prev;
    });
  }, [selectedAttrs, attributeKeys, productVariants]);

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

      {attributeKeys.map((key, index) => {
        const validOptions = [...new Set(
          productVariants
            .filter((v) => attributeKeys.slice(0, index).every((k) => v[k] === selectedAttrs[k]))
            .map((v) => v[key])
        )];

        return (
          <select
            key={key}
            value={selectedAttrs[key]}
            onChange={(e) =>
              setSelectedAttrs((prev) => ({ ...prev, [key]: e.target.value }))
            }
          >
            {validOptions.map((val) => (
              <option key={val} value={val}>{val}</option>
            ))}
          </select>
        );
      })}

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