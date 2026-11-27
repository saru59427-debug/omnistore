import { SearchX, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import ProductCard from './ProductCard';

/**
 * ProductGrid Component
 * Renders a responsive grid of ProductCard components using JavaScript map().
 * Handles loading spinner, error states with retry button, and empty search/filter states.
 *
 * @param {Object} props
 * @param {Array} props.products - Array of filtered products
 * @param {string} props.activeCategory - Currently selected category
 * @param {Function} props.onAddToCart - Callback when a product is added to cart
 * @param {string} props.searchQuery - Current search query text
 * @param {Function} props.onClearSearch - Callback to reset search query
 * @param {boolean} props.loading - Loading state while fetching products from API
 * @param {string|null} props.error - Error message if API fetch failed
 * @param {Function} props.onRetry - Callback to retry API fetch
 */
function ProductGrid({
  products = [],
  activeCategory = 'All',
  onAddToCart,
  searchQuery = '',
  onClearSearch,
  loading = false,
  error = null,
  onRetry
}) {
  return (
    <section className="product-grid-section" id="products">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">Explore Collection</div>
          <h2 className="section-title">
            {activeCategory === 'All' ? 'Featured Products' : `${activeCategory} Collection`}
          </h2>
          <p className="section-subtitle">
            {searchQuery
              ? `Showing results matching "${searchQuery}"`
              : 'Discover our hand-picked selection of quality products directly from our live catalog.'}
          </p>
        </div>

        {/* 1. Loading State */}
        {loading && (
          <div className="products-status-box products-loading-box" role="status" aria-live="polite">
            <Loader2 className="spinner-icon" size={40} />
            <h3 className="status-title">Loading products...</h3>
            <p className="status-desc">Fetching the latest items from our catalog. Please wait a moment.</p>
          </div>
        )}

        {/* 2. Error State with Retry Button */}
        {!loading && error && (
          <div className="products-status-box products-error-box" role="alert">
            <div className="error-icon-box">
              <AlertCircle size={44} />
            </div>
            <h3 className="status-title">Unable to load products</h3>
            <p className="status-desc">{error}</p>
            {onRetry && (
              <button type="button" className="btn btn-primary retry-btn" onClick={onRetry}>
                <RefreshCw size={16} />
                <span>Retry Loading</span>
              </button>
            )}
          </div>
        )}

        {/* 3. Product Cards Grid rendered via Array.prototype.map() */}
        {!loading && !error && products.length > 0 && (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}

        {/* 4. Empty Search / Filter State */}
        {!loading && !error && products.length === 0 && (
          <div className="no-products">
            <div className="no-products-icon">
              <SearchX size={44} />
            </div>
            <h3 className="no-products-title">No products found</h3>
            <p className="no-products-desc">
              {searchQuery
                ? `We couldn't find any products matching "${searchQuery}". Try checking for spelling errors or searching for a different term.`
                : 'No products are currently available in this category.'}
            </p>
            {searchQuery && onClearSearch && (
              <button
                type="button"
                className="btn btn-secondary clear-search-btn"
                onClick={onClearSearch}
              >
                Clear Search Filter
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;
