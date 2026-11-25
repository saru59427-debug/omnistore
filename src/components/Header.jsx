import { useState } from 'react';
import { Search, Menu, X, ShoppingCart } from 'lucide-react';

/**
 * Header Component
 * Sticky top navigation containing brand logo, desktop nav links,
 * live search input, shopping cart button with dynamic badge count,
 * and responsive mobile navigation drawer.
 *
 * @param {Object} props
 * @param {string} props.searchQuery - Controlled search input value
 * @param {Function} props.setSearchQuery - Callback to update search query state
 * @param {number} props.cartCount - Total quantity of items in cart
 * @param {Function} props.onOpenCart - Callback to open the cart panel drawer
 */
function Header({
  searchQuery = '',
  setSearchQuery,
  cartCount = 0,
  onOpenCart
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    if (setSearchQuery) {
      setSearchQuery(e.target.value);
    }
  };

  const handleClearSearch = () => {
    if (setSearchQuery) {
      setSearchQuery('');
    }
  };

  const handleCartClick = () => {
    if (onOpenCart) {
      onOpenCart();
    }
  };

  const handleMobileCartClick = () => {
    closeMobileMenu();
    if (onOpenCart) {
      onOpenCart();
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand Logo & Name */}
        <a href="#home" className="brand-logo" onClick={closeMobileMenu}>
          <img src="/logo.png" alt="OmniStore Logo" className="brand-logo-img" />
          <span className="brand-name">
            Omni<span className="brand-accent">Store</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            <li>
              <a href="#home" className="nav-link active">Home</a>
            </li>
            <li>
              <a href="#products" className="nav-link">Products</a>
            </li>
            <li>
              <a href="#categories" className="nav-link">Categories</a>
            </li>
            <li>
              <a href="#about" className="nav-link">About</a>
            </li>
          </ul>
        </nav>

        {/* Header Right Actions: Live Search & Dynamic Cart */}
        <div className="header-actions">
          {/* Search Input Field (Controlled Component) */}
          <div className="search-box">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search products by title..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search products by title"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={handleClearSearch}
                aria-label="Clear search input"
                title="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Cart Icon with Dynamic Badge Count & Click Handler */}
          <button
            type="button"
            className="cart-button"
            onClick={handleCartClick}
            aria-label={`Shopping Cart with ${cartCount} items`}
            title={cartCount > 0 ? `View Cart (${cartCount} items)` : 'Shopping Cart is empty'}
          >
            <div className="cart-icon-wrapper">
              <ShoppingCart size={22} />
              <span className="cart-badge" aria-live="polite">
                {cartCount}
              </span>
            </div>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
          <div
            className="mobile-menu-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-search-box">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search products by title..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
                aria-label="Search products by title"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="search-clear-btn"
                  onClick={handleClearSearch}
                  aria-label="Clear search input"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <nav className="mobile-nav">
              <ul className="mobile-nav-list">
                <li>
                  <a href="#home" className="mobile-nav-link" onClick={closeMobileMenu}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#products" className="mobile-nav-link" onClick={closeMobileMenu}>
                    Products
                  </a>
                </li>
                <li>
                  <a href="#categories" className="mobile-nav-link" onClick={closeMobileMenu}>
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#about" className="mobile-nav-link" onClick={closeMobileMenu}>
                    About
                  </a>
                </li>
              </ul>
            </nav>

            <div className="mobile-menu-footer">
              <button
                type="button"
                className="mobile-cart-action-btn"
                onClick={handleMobileCartClick}
              >
                <div className="mobile-cart-indicator">
                  <ShoppingCart size={18} />
                  <span>View Shopping Cart (<strong>{cartCount} items</strong>)</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
