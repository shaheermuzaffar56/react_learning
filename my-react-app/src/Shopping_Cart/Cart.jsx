import { useState, useEffect, useMemo} from 'react';
import ProductGrid from '../Product_listing/ProductGrid';
import {products} from '../Product_listing/data';
import useDebounce from '../hooks/useDebounce';


function Cart() {

    const [cartItems, setCartItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 400);
    
    const filteredProducts = useMemo(() => {
        console.log('Filtering products...'); 
        return products.filter((product) =>
            product.name.toLowerCase().startsWith(debouncedSearchTerm.toLowerCase())
        );
    }, [debouncedSearchTerm]);

    function handleAdd(product) {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }

    function handleIncrement(id) {
        setCartItems(
            cartItems.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    }

    function handleDecrement(id) {
        setCartItems(
            cartItems
                .map((item) =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter((item) => item.quantity > 0) // drops back to "Add to Cart" at 0
        );
    }

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <h1>Products</h1>
            <p>Cart: {totalItems} items — ${totalPrice}</p>
            <input className="search-bar"
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            
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

export default Cart;