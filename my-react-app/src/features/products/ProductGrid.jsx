import ProductCard from './ProductCard';

function ProductGrid({ products, cartItems, onAdd, onIncrement, onDecrement }) {
    return (
        <div className="grid">
            {products.map((product) => {
                const cartEntry = cartItems.find((item) => item.id === product.id);
                const quantity = cartEntry ? cartEntry.quantity : 0;

                return (
                    <ProductCard
                        key={product.id}
                        product={product}
                        quantity={quantity}
                        onAdd={onAdd}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                    />
                );
            })}
        </div>
    );
}

export default ProductGrid;