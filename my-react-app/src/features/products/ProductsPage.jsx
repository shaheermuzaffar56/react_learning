import { useMemo } from 'react';
import ProductGrid from './ProductGrid';
import { products } from './data';
import useDebounce from '../../hooks/useDebounce';
import { useAppContext } from '../../context/AppContext';

function ProductsPage() {
    const { cartItems, handleAdd, handleIncrement   , handleDecrement, searchTerm, selectedCategory } = useAppContext();

    const debouncedSearchTerm = useDebounce(searchTerm, 400);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch = product.name.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase());
            const matchesCategory = selectedCategory === null || product.categoryId === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [debouncedSearchTerm, selectedCategory]);

    return (
        <div>
            <h2>{filteredProducts.length} products</h2>

            {filteredProducts.length === 0 && (
                <p>No products match "{debouncedSearchTerm}".</p>
            )}

        <ProductGrid
                products={filteredProducts}
                cartItems={cartItems}
                onAdd={handleAdd}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
            />
        </div>
    );
}
export default ProductsPage;