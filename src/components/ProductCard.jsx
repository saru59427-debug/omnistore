import { useState } from 'react';
import { ShoppingCart, Check } from 'lucide-react';

/**
 * ProductCard Component
 * Reusable card displaying an individual product's details:
 * image, title, category, formatted LKR pricing, and an interactive Add to Cart button.
 *
 * @param {Object} props
 * @param {Object} props.product - The product object data
 * @param {Function} props.onAddToCart - Callback triggered when user clicks Add to Cart
 */
function ProductCard({ product, onAddToCart }) {
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const {
    name,
    category,
    price,
    originalPrice,
    image,
    description
  } = product;

  // Format prices in Indian Rupees (INR)
  const formatPrice = (amount) =>
    Number(amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  // Safe fallback placeholder if external image cannot be reached
  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80';
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 900);
    }
  };

  return (
    <div className="product-card">
      {/* Product Image Container with Zoom Effect */}
      <div className="product-image-container">
        <img
          src={image}
          alt={name}
          className="product-image"
          loading="lazy"
          onError={handleImageError}
        />
      </div>

      {/* Card Content Body */}
      <div className="product-content">
        <span className="product-category">{category}</span>

        <h3 className="product-title" title={name}>
          {name}
        </h3>

        <p className="product-description" title={description}>
          {description}
        </p>

        {/* Price Section */}
        <div className="product-pricing">
          <span className="current-price">{formatPrice(price)}</span>
          {originalPrice && originalPrice > price && (
            <span className="original-price">{formatPrice(originalPrice)}</span>
          )}
        </div>

        {/* Action Button: Add to Cart */}
        <div className="product-actions">
          <button
            type="button"
            className={`add-to-cart-btn ${justAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
            aria-label={`Add ${name} to cart`}
          >
            {justAdded ? (
              <>
                <Check size={16} className="btn-icon" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingCart size={16} className="btn-icon" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
