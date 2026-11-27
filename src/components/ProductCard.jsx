import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Check, Eye } from 'lucide-react';

/**
 * ProductCard Component
 * Reusable card displaying an individual product's details:
 * image, title, category, formatted INR pricing,
 * properly aligned "Details" button linking to /product/:id,
 * and an interactive "Add to Cart" button.
 *
 * @param {Object} props
 * @param {Object} props.product - The product object data (DummyJSON or custom)
 * @param {Function} props.onAddToCart - Callback triggered when user clicks Add to Cart
 */
function ProductCard({ product, onAddToCart }) {
  const [justAdded, setJustAdded] = useState(false);

  if (!product) return null;

  const id = product.id;
  const name = product.title || product.name || 'Untitled Product';
  const category = product.category || 'General';
  const price = product.price || 0;
  const image =
    product.thumbnail ||
    product.image ||
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80';
  const description = product.description || '';

  // Calculate original price from discountPercentage if available
  const originalPrice = product.originalPrice
    ? product.originalPrice
    : product.discountPercentage
    ? Math.round(price / (1 - product.discountPercentage / 100))
    : null;

  // Format prices in Indian Rupees (INR)
  const formatPrice = (amount) =>
    Number(amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  // Safe fallback placeholder if external image cannot be reached
  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80';
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 900);
    }
  };

  return (
    <div className="product-card">
      {/* Product Image Container with Link to Product Detail */}
      <Link
        to={`/product/${id}`}
        className="product-image-container"
        aria-label={`View details for ${name}`}
      >
        <img
          src={image}
          alt={name}
          className="product-image"
          loading="lazy"
          onError={handleImageError}
        />
        {product.discountPercentage && (
          <span className="product-discount-pill">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </Link>

      {/* Card Content Body */}
      <div className="product-content">
        <span className="product-category">{category}</span>

        <h3 className="product-title" title={name}>
          <Link to={`/product/${id}`} className="product-title-link">
            {name}
          </Link>
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

        {/* Action Buttons: View Details & Add to Cart properly aligned */}
        <div className="product-actions">
          <Link
            to={`/product/${id}`}
            className="view-details-btn"
            title={`View details for ${name}`}
          >
            <Eye size={15} className="btn-icon" />
            <span>Details</span>
          </Link>

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
