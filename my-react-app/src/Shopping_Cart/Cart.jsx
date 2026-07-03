import { useState } from 'react';
import ProductGrid from '../Product_listing/ProductGrid';
import {products} from '../Product_listing/data';

function Cart() {

    const [cartItems, setCartItems] = useState([]);

    function handleAdd(product) {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);qq
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

            <ProductGrid
                products={products}
                cartItems={cartItems}
                onAdd={handleAdd}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
            />
        </div>
    );
}

export default Cart;