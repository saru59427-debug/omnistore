import { ShoppingCart } from 'lucide-react';

/**
 * ProductCard Component
 * Reusable card displaying an individual product's details:
 * image, title, category, formatted INR pricing, and an Add to Cart button.
 *
 * @param {Object} props
 * @param {Object} props.product - The product object data
 */
function ProductCard({ product }) {
  if (!product) return null;

  const {
    name,
    category,
    price,
    originalPrice,
    image,
    description
  } = product;

  // Format prices with price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })
  const formattedPrice = price.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });

  const formattedOriginalPrice = originalPrice
    ? originalPrice.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
      })
    : null;

  // Safe fallback placeholder if external image cannot be reached
  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80';
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
          <span className="current-price">{formattedPrice}</span>
          {formattedOriginalPrice && originalPrice > price && (
            <span className="original-price">{formattedOriginalPrice}</span>
          )}
        </div>

        {/* Action Button */}
        <div className="product-actions">
          <button
            type="button"
            className="add-to-cart-btn"
            aria-label={`Add ${name} to cart`}
          >
            <ShoppingCart size={16} className="btn-icon" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
