import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingCart,
  Check,
  Star,
  Package,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

/**
 * ProductDetail Page Component
 * Fetches and displays a single product from DummyJSON API
 * using the product ID from the URL via useParams().
 *
 * Features:
 * - Individual fetch: GET https://dummyjson.com/products/:id
 * - Loading and error states with retry
 * - Image gallery with thumbnails
 * - Price, rating, stock, brand, description
 * - Add to Cart using existing Week 2 cart functionality
 * - Back to Products navigation via useNavigate()
 *
 * @param {Object} props
 * @param {Function} props.onAddToCart - Callback to add product to global cart state
 */
function ProductDetail({ onAddToCart }) {
  // useParams() reads the :id from /product/:id route
  const { id } = useParams();
  // useNavigate() provides programmatic navigation without full page reload
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [justAdded, setJustAdded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  /**
   * useEffect with [id] dependency:
   * Runs when the component mounts AND when the :id URL parameter changes.
   * Fetches individual product data from the DummyJSON API.
   */
  useEffect(() => {
    let ignore = false;

    fetch(`https://dummyjson.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error(`Product with ID "${id}" was not found.`);
          }
          throw new Error(`Failed to load product (status ${response.status}).`);
        }
        return response.json();
      })
      .then((data) => {
        if (!ignore) {
          setProduct(data);
          setSelectedImageIndex(0);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  // Format price using toLocaleString with INR currency
  const formatPrice = (amount) =>
    Number(amount).toLocaleString('en-IN', { style: 'currency', currency: 'INR' });

  // Retry handler — re-triggers the useEffect logic
  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load product (status ${res.status}).`);
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setSelectedImageIndex(0);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // Add to cart handler — adapts DummyJSON fields to existing cart structure
  const handleAddToCart = () => {
    if (onAddToCart && product) {
      onAddToCart({
        id: product.id,
        name: product.title,
        title: product.title,
        price: product.price,
        image: product.thumbnail,
        category: product.category
      });
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1200);
    }
  };

  // Navigate through gallery images
  const nextImage = () => {
    if (product && product.images) {
      setSelectedImageIndex((prev) =>
        prev < product.images.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevImage = () => {
    if (product && product.images) {
      setSelectedImageIndex((prev) =>
        prev > 0 ? prev - 1 : product.images.length - 1
      );
    }
  };

  // Image error fallback
  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80';
  };

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.25;
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={16} className="star-filled" fill="currentColor" />);
      } else if (i === fullStars && hasHalf) {
        stars.push(<Star key={i} size={16} className="star-half" />);
      } else {
        stars.push(<Star key={i} size={16} className="star-empty" />);
      }
    }
    return stars;
  };

  /* ---- LOADING STATE ---- */
  if (loading) {
    return (
      <div className="pd-status-page">
        <div className="pd-loading">
          <div className="pd-spinner"></div>
          <p className="pd-loading-text">Loading product details...</p>
        </div>
      </div>
    );
  }

  /* ---- ERROR STATE ---- */
  if (error) {
    return (
      <div className="pd-status-page">
        <div className="pd-error-card">
          <AlertCircle size={48} className="pd-error-icon" />
          <h2 className="pd-error-title">Something went wrong</h2>
          <p className="pd-error-message">{error}</p>
          <div className="pd-error-actions">
            <button type="button" className="btn btn-primary" onClick={handleRetry}>
              <RefreshCw size={16} />
              <span>Try Again</span>
            </button>
            <Link to="/" className="btn btn-secondary">
              <ArrowLeft size={16} />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---- NO PRODUCT FOUND ---- */
  if (!product) {
    return (
      <div className="pd-status-page">
        <div className="pd-error-card">
          <AlertCircle size={48} className="pd-error-icon" />
          <h2 className="pd-error-title">Product Not Found</h2>
          <p className="pd-error-message">We couldn&rsquo;t find the product you&rsquo;re looking for.</p>
          <Link to="/" className="btn btn-primary">
            <ArrowLeft size={16} />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    );
  }

  /* ---- MAIN PRODUCT DETAIL ---- */
  const discountPercent = product.discountPercentage
    ? Math.round(product.discountPercentage)
    : 0;
  const originalPrice = discountPercent > 0
    ? product.price / (1 - product.discountPercentage / 100)
    : null;
  const inStock = product.stock > 0;

  return (
    <div className="pd-page">
      {/* Breadcrumb Navigation */}
      <div className="pd-breadcrumb">
        <Link to="/" className="pd-breadcrumb-link">Home</Link>
        <span className="pd-breadcrumb-sep">/</span>
        <Link to="/" className="pd-breadcrumb-link">Products</Link>
        <span className="pd-breadcrumb-sep">/</span>
        <span className="pd-breadcrumb-current">{product.title}</span>
      </div>

      <div className="pd-layout">
        {/* LEFT: Image Gallery */}
        <div className="pd-gallery">
          <div className="pd-main-image-wrapper">
            {product.images && product.images.length > 1 && (
              <button
                type="button"
                className="pd-gallery-nav pd-gallery-prev"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
            )}

            <img
              src={product.images?.[selectedImageIndex] || product.thumbnail}
              alt={product.title}
              className="pd-main-image"
              onError={handleImageError}
            />

            {product.images && product.images.length > 1 && (
              <button
                type="button"
                className="pd-gallery-nav pd-gallery-next"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            )}

            {discountPercent > 0 && (
              <span className="pd-discount-badge">-{discountPercent}%</span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {product.images && product.images.length > 1 && (
            <div className="pd-thumbnails">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  className={`pd-thumb ${index === selectedImageIndex ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={img} alt={`${product.title} - ${index + 1}`} onError={handleImageError} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Product Info */}
        <div className="pd-info">
          <span className="pd-category">{product.category}</span>

          <h1 className="pd-title">{product.title}</h1>

          {/* Rating */}
          <div className="pd-rating">
            <div className="pd-stars">
              {renderStars(product.rating)}
            </div>
            <span className="pd-rating-value">{product.rating}</span>
          </div>

          {/* Brand */}
          {product.brand && (
            <p className="pd-brand">
              Brand: <strong>{product.brand}</strong>
            </p>
          )}

          {/* Price */}
          <div className="pd-price-block">
            <span className="pd-price">{formatPrice(product.price)}</span>
            {originalPrice && (
              <span className="pd-original-price">{formatPrice(originalPrice)}</span>
            )}
            {discountPercent > 0 && (
              <span className="pd-discount-tag">{discountPercent}% off</span>
            )}
          </div>

          {/* Description */}
          <p className="pd-description">{product.description}</p>

          {/* Stock */}
          <div className="pd-stock">
            <Package size={16} />
            {inStock ? (
              <span className="pd-in-stock">In Stock ({product.stock} available)</span>
            ) : (
              <span className="pd-out-of-stock">Out of Stock</span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pd-actions">
            <button
              type="button"
              className={`btn btn-primary pd-add-to-cart-btn ${justAdded ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              {justAdded ? (
                <>
                  <Check size={18} />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  <span>Add to Cart</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={16} />
              <span>Back to Products</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
