import { Link } from 'react-router-dom'
import Card from './Card';

function ProductCard({ product, quantity, onAdd, onIncrement, onDecrement }) {
    return (
        <div>
            <Link to={`/${product.id}`}>
                <Card name={product.name} price={product.price} />
            </Link>

            {quantity === 0 ? (
                <button onClick={() => onAdd(product)}>Add to Cart</button>
            ) : (
                <div>
                    <button onClick={() => onDecrement(product.id)}>-</button>
                    <span> {quantity} </span>
                    <button onClick={() => onIncrement(product.id)}>+</button>
                </div>
            )}
        </div>
    );
}
export default ProductCard;