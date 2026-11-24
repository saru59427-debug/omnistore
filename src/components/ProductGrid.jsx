import ProductCard from './ProductCard';
import productsData from '../data/products';

/**
 * ProductGrid Component
 * Imports product data from products.js and renders a responsive
 * grid of ProductCard components using JavaScript map().
 * Accepts optional custom products list or active category filter.
 */
function ProductGrid({ products = productsData, activeCategory = 'All' }) {
  // Filter products based on selected category if provided
  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section className="product-grid-section" id="products">
      <div className="section-container">
        <div className="section-header">
          <div className="section-tag">Explore Collection</div>
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">
            Discover our hand-picked selection of top-tier electronics, fashion, lifestyle accessories, and home goods.
          </p>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <p>No products found matching your current filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductGrid;
