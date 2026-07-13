import { useMemo } from 'react';
import ProductCard from './ProductCard';
import { variants } from './data';

function ProductGrid({ products, cartItems, onAdd, onIncrement, onDecrement }) {
    const variantsByProduct = useMemo(() => {
        const map = {};
        for (const v of variants) {
            if (!map[v.productId]) map[v.productId] = [];
            map[v.productId].push(v);
        }
        return map;
    }, []);

    return (
        <div className="grid">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    productVariants={variantsByProduct[product.id] || []}
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                />
            ))}
        </div>
    );
}
export default ProductGrid;