import { SearchX } from 'lucide-react';
import ProductCard from './ProductCard';
import productsData from '../data/products';

/**
 * ProductGrid Component
 * Renders a responsive grid of ProductCard components using JavaScript map().
 * Handles empty search/filter states and passes onAddToCart prop down.
 *
 * @param {Object} props
 * @param {Array} props.products - Array of filtered products
 * @param {string} props.activeCategory - Currently selected category
 * @param {Function} props.onAddToCart - Callback when a product is added to cart
 * @param {string} props.searchQuery - Current search query text
 * @param {Function} props.onClearSearch - Callback to reset search query
 */
function ProductGrid({
  products = productsData,
  activeCategory = 'All',
  onAddToCart,
  searchQuery = '',
  onClearSearch
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
              : 'Discover our hand-picked selection of quality electronics, apparel, accessories, and home goods.'}
          </p>
        </div>

        {/* Product Cards Grid rendered via Array.prototype.map() */}
        {products.length > 0 ? (
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          /* Empty Search / Filter State */
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
