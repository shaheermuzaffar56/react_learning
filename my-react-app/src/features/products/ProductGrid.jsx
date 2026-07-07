import ProductCard from './ProductCard';
import { variants } from './data';

function ProductGrid({ products, cartItems, onAdd, onIncrement, onDecrement }) {
    return (
        <div className="grid">
            {products.map((product) => {
                const productVariants = variants.filter((v) => v.productId === product.id);

                return (
                    <ProductCard
                        key={product.id}
                        product={product}
                        productVariants={productVariants}
                        cartItems={cartItems}
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