import { useAppContext } from '../../context/AppContext'

function CartPanel() {
  const { cartItems } = useAppContext();

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
            {cartItems.map((item) => (
              <li key={`${item.id}-${item.variantId}`}>
                {item.name} × {item.quantity} — ${item.price * item.quantity}
              </li>
            ))}
          </ul>
          <p><strong>Total: ${totalPrice}</strong></p>
        </>
      )}
    </div>
  );
}
export default CartPanel;