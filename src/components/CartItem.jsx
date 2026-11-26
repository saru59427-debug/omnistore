import { Plus, Minus, Trash2 } from 'lucide-react';

/**
 * CartItem Component
 * Renders an individual product item inside the Cart drawer with
 * image, title, unit price, quantity increment/decrement controls,
 * item subtotal, and remove button.
 *
 * @param {Object} props
 * @param {Object} props.item - Cart item object { id, title, price, qty, image }
 * @param {Function} props.onIncrease - Callback to increase item quantity by 1
 * @param {Function} props.onDecrease - Callback to decrease item quantity by 1
 * @param {Function} props.onRemove - Callback to remove item from cart
 */
function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  if (!item) return null;

  const { id, title, price, qty, image } = item;
  const subtotal = price * qty;

  // Format price in Indian Rupees (INR)
  const formatPrice = (amount) =>
    Number(amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80';
  };

  return (
    <div className="cart-item">
      {/* Product Image Thumbnail */}
      <div className="cart-item-image-wrapper">
        <img
          src={image}
          alt={title}
          className="cart-item-image"
          onError={handleImageError}
        />
      </div>

      {/* Item Details */}
      <div className="cart-item-details">
        <div className="cart-item-header">
          <h4 className="cart-item-title" title={title}>
            {title}
          </h4>
          <button
            type="button"
            className="cart-item-remove-btn"
            onClick={() => onRemove(id)}
            aria-label={`Remove ${title} from cart`}
            title="Remove item"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="cart-item-price-info">
          <span className="cart-item-unit-price">
            {formatPrice(price)} each
          </span>
        </div>

        {/* Quantity Controls & Subtotal */}
        <div className="cart-item-footer">
          <div className="cart-qty-controls">
            <button
              type="button"
              className="qty-btn"
              onClick={() => onDecrease(id)}
              aria-label="Decrease quantity by 1"
              title="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="qty-value" aria-label={`Quantity: ${qty}`}>
              {qty}
            </span>
            <button
              type="button"
              className="qty-btn"
              onClick={() => onIncrease(id)}
              aria-label="Increase quantity by 1"
              title="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="cart-item-subtotal">
            <span className="subtotal-label">Subtotal:</span>
            <span className="subtotal-amount">{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
