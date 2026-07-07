import { createContext, useContext, useState } from 'react';
import { variants } from '../features/products/data';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function handleAdd(product, variantId) {
    setCartItems([
      ...cartItems,
      { id: product.id, name: product.name, price: product.price, variantId, quantity: 1 },
    ]);
  }

  function handleIncrement(productId, variantId) {
    setCartItems(
      cartItems.map((item) => {
        if (item.id !== productId || item.variantId !== variantId) return item;
        const variant = variants.find((v) => v.id === variantId);
        return item.quantity < variant.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item; // already at stock limit, do nothing
      })
    );
  }

  function handleDecrement(productId, variantId) {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === productId && item.variantId === variantId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleUpdateVariant(productId, oldVariantId, newVariantId) {
  setCartItems(
    cartItems.map((item) => {
      if (item.id !== productId || item.variantId !== oldVariantId) return item;
      const newVariant = variants.find((v) => v.id === newVariantId);
      const cappedQuantity = Math.min(item.quantity, newVariant.stock);
      return { ...item, variantId: newVariantId, quantity: cappedQuantity };
    })
  );
}

function handleRemove(productId, variantId) {
  setCartItems(cartItems.filter((item) => !(item.id === productId && item.variantId === variantId)));
}

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const value = {
    cartItems, handleAdd, handleIncrement, handleDecrement,
    searchTerm, setSearchTerm,
    selectedCategory, setSelectedCategory,
    handleUpdateVariant, handleRemove,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}