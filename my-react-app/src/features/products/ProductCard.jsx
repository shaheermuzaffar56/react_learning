import { useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card';
import { categories, getVariantLabel, getVariantAttributeKeys } from './data';


function ProductCard({ product, productVariants, cartItems, onAdd, onIncrement, onDecrement }) {
    const attributeKeys = getVariantAttributeKeys(productVariants);

    const [selectedAttrs, setSelectedAttrs] = useState(() => {
        const first = productVariants[0];
        return Object.fromEntries(attributeKeys.map((k) => [k, first[k]]));
    });

    const selectedVariant = productVariants.find((v) =>
        attributeKeys.every((k) => v[k] === selectedAttrs[k])
    );

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