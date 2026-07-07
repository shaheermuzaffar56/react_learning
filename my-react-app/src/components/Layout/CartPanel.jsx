import { useAppContext } from '../../context/AppContext'
import { variants, getVariantLabel } from '../../features/products/data'

function CartPanel() {
  const { cartItems, handleIncrement, handleDecrement, handleUpdateVariant, handleRemove } = useAppContext();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={{ width: '250px', padding: '10px', backgroundColor: '#f9f9f9' }}>
      <h3>Cart ({totalItems})</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((item) => {
              const productVariants = variants.filter((v) => v.productId === item.id);
              const currentVariant = productVariants.find((v) => v.id === item.variantId);
              return (
                <li key={`${item.id}-${item.variantId}`} style={{ marginBottom: '12px', borderBottom: '1px solid #ddd', paddingBottom: '8px' }}>
                  <p style={{ margin: '0 0 4px' }}>{item.name}</p>
                  {productVariants.length > 1 && (
                    <select value={item.variantId} onChange={(e) => handleUpdateVariant(item.id, item.variantId, Number(e.target.value))}>
                      {productVariants.map((v) => (
                        <option key={v.id} value={v.id}>{getVariantLabel(v)}</option>
                      ))}
                    </select>
                  )}
                  <div>
                    <button onClick={() => handleDecrement(item.id, item.variantId)}>-</button>
                    <span> {item.quantity} </span>
                    <button disabled={currentVariant && item.quantity >= currentVariant.stock} onClick={() => handleIncrement(item.id, item.variantId)}>+</button>
                    <button onClick={() => handleRemove(item.id, item.variantId)} style={{ marginLeft: '8px' }}>Remove</button>
                  </div>
                  <p style={{ margin: '4px 0 0' }}>${item.price * item.quantity}</p>
                </li>
              );
            })}
          </ul>
          <p><strong>Total: ${totalPrice}</strong></p>
        </>
      )}
    </div>
  );
}
export default CartPanel;