import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // ---- Cart state ----
  const [cartItems, setCartItems] = useState([]);

  function handleAdd(product, variant) {
    setCartItems([...cartItems, { ...product, variant, quantity: 1 }]);
  }

  function handleIncrement(productId, variantId) {
    setCartItems(
      cartItems.map((item) =>
        item.id === productId && item.variant.id === variantId
          ? item.quantity < item.variant.stock
            ? { ...item, quantity: item.quantity + 1 } // only grows if stock allows
            : item
          : item
      )
    );
  }

  function handleDecrement(productId, variantId) {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === productId && item.variant.id === variantId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // ---- Search state ----
  const [searchTerm, setSearchTerm] = useState('');

  // ---- Category filter state ----
  const [selectedCategory, setSelectedCategory] = useState(null); // null = show all

  const value = {
    cartItems, handleAdd, handleIncrement, handleDecrement,
    searchTerm, setSearchTerm,
    selectedCategory, setSelectedCategory,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}