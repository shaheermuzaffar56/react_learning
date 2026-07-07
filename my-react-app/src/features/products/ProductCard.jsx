import { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card';
import { categories, getVariantLabel } from './data';


function ProductCard({ product, productVariants, cartItems, onAdd, onIncrement, onDecrement }) {
    const [selectedVariantId, setSelectedVariantId] = useState(productVariants[0].id);
    const selectedVariant = productVariants.find((v) => v.id === Number(selectedVariantId));

    const cartEntry = cartItems.find(
        (item) => item.id === product.id && item.variantId === selectedVariant.id
    );
    const quantity = cartEntry ? cartEntry.quantity : 0;
    const outOfStock = selectedVariant.stock === 0;

    return (
        <div>
            <Link to={`/product/${product.id}`}>
                <Card
                    name={product.name}
                    price={product.price}
                    categoryName={categories.find((c) => c.id === product.categoryId)?.name}
                />
            </Link>

            {productVariants.length > 1 && (
                <select
                    value={selectedVariantId}
                    onChange={(e) => setSelectedVariantId(Number(e.target.value))}
                >
                    {productVariants.map((v) => (
                        <option key={v.id} value={v.id}>{getVariantLabel(v)}</option>
                    ))}
                </select>
            )}

            <p>Stock: {selectedVariant.stock}</p>

            {quantity === 0 ? (
                <button disabled={outOfStock} onClick={() => onAdd(product, selectedVariant.id)}>
                    {outOfStock ? 'Out of Stock' : 'Add to Cart'}
                </button>
            ) : (
                <div>
                    <button onClick={() => onDecrement(product.id, selectedVariant.id)}>-</button>
                    <span> {quantity} </span>
                    <button
                        disabled={quantity >= selectedVariant.stock}
                        onClick={() => onIncrement(product.id, selectedVariant.id)}
                    >
                        +
                    </button>
                </div>
            )}
        </div>
    );
}
export default ProductCard;