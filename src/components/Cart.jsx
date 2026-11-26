import { ShoppingBag, X, ArrowRight } from 'lucide-react';
import CartItem from './CartItem';

/**
 * Cart Component (Drawer / Side Panel)
 * Renders a slide-in shopping cart panel from the right with
 * item list, total calculation via Array.prototype.reduce(),
 * quantity controls, and empty-cart state.
 *
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the cart drawer is open
 * @param {Function} props.onClose - Callback to close the cart drawer
 * @param {Array} props.cart - Array of cart item objects
 * @param {Function} props.onIncreaseQty - Callback to increase quantity
 * @param {Function} props.onDecreaseQty - Callback to decrease quantity
 * @param {Function} props.onRemoveItem - Callback to remove item from cart
 */
function Cart({
  isOpen,
  onClose,
  cart = [],
  onIncreaseQty,
  onDecreaseQty,
  onRemoveItem
}) {
  // Calculate total price using Array.prototype.reduce()
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Calculate total item quantity using Array.prototype.reduce()
  const totalItemCount = cart.reduce((total, item) => total + item.qty, 0);

  // Format currency in Indian Rupees (INR)
  const formatPrice = (amount) =>
    Number(amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  if (!isOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-drawer-title-group">
            <ShoppingBag size={22} className="cart-title-icon" />
            <h3 className="cart-drawer-title">Shopping Cart</h3>
            <span className="cart-drawer-count-badge">
              {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close shopping cart"
            title="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cart Drawer Body */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            /* Empty Cart View */
            <div className="cart-empty-state">
              <div className="cart-empty-icon-box">
                <ShoppingBag size={48} />
              </div>
              <h4 className="cart-empty-title">Your cart is empty</h4>
              <p className="cart-empty-text">
                Looks like you haven't added anything to your cart yet. Explore our products and discover great everyday deals!
              </p>
              <button
                type="button"
                className="btn btn-primary cart-continue-btn"
                onClick={onClose}
              >
                <span>Continue Shopping</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            /* Cart Items List rendered via Array.prototype.map() */
            <div className="cart-items-list">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={onIncreaseQty}
                  onDecrease={onDecreaseQty}
                  onRemove={onRemoveItem}
                />
              ))}
            </div>
          )}
        </div>

        {/* Cart Drawer Footer (Only shown when cart has items) */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-breakdown">
              <div className="summary-row">
                <span className="summary-label">Total Items</span>
                <span className="summary-value">{totalItemCount}</span>
              </div>
              <div className="summary-row total-row">
                <span className="summary-label">Total Amount</span>
                <span className="summary-total">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="cart-drawer-actions">
              <button
                type="button"
                className="btn btn-primary cart-checkout-btn"
                onClick={() => {
                  alert(`Order summary: ${totalItemCount} items amounting to ${formatPrice(totalPrice)}. Checkout will be available in future updates!`);
                }}
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                className="btn btn-secondary cart-continue-shopping-btn"
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
