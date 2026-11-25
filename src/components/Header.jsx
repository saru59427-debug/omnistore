import { useState, useRef, useEffect } from 'react';
import { Search, Menu, X, ShoppingCart, ArrowUpRight } from 'lucide-react';

/**
 * Header Component
 * Sticky top navigation containing brand logo, desktop nav links,
 * live search input with an instant matching products dropdown,
 * dynamic cart button, and responsive mobile navigation.
 *
 * @param {Object} props
 * @param {string} props.searchQuery - Controlled search input value
 * @param {Function} props.setSearchQuery - Callback to update search query state
 * @param {number} props.cartCount - Total quantity of items in cart
 * @param {Function} props.onOpenCart - Callback to open the cart panel drawer
 * @param {Array} props.products - Full catalog list for instant search suggestions
 */
function Header({
  searchQuery = '',
  setSearchQuery,
  cartCount = 0,
  onOpenCart,
  products = []
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target)
      ) {
        setDesktopDropdownOpen(false);
      }
      if (
        mobileSearchRef.current &&
        !mobileSearchRef.current.contains(event.target)
      ) {
        setMobileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    if (setSearchQuery) {
      setSearchQuery(val);
      if (val.trim()) {
        setDesktopDropdownOpen(true);
        setMobileDropdownOpen(true);
      } else {
        setDesktopDropdownOpen(false);
        setMobileDropdownOpen(false);
      }
    }
  };

  const handleClearSearch = () => {
    if (setSearchQuery) {
      setSearchQuery('');
      setDesktopDropdownOpen(false);
      setMobileDropdownOpen(false);
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

  // Select a product from the dropdown
  const handleSelectProduct = (productName) => {
    if (setSearchQuery) {
      setSearchQuery(productName);
    }
    setDesktopDropdownOpen(false);
    setMobileDropdownOpen(false);
    closeMobileMenu();

    // Scroll to products section smoothly
    const section = document.getElementById('products');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter matching products
  const trimmedQuery = searchQuery.trim().toLowerCase();
  const matchingProducts = trimmedQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmedQuery) ||
          p.category.toLowerCase().includes(trimmedQuery)
      )
    : [];

  // Helper to highlight matching text in product title
  const highlightMatch = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="search-highlight">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  // Format currency
  const formatPrice = (amount) => `LKR ${Number(amount).toLocaleString('en-US')}`;

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
          {/* Desktop Search Box with Matching Products Dropdown */}
          <div className="search-box" ref={desktopSearchRef}>
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Search products by title..."
              className="search-input"
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => {
                if (searchQuery.trim()) setDesktopDropdownOpen(true);
              }}
              aria-label="Search products by title"
              autoComplete="off"
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

            {/* Matching Products Dropdown below search box */}
            {desktopDropdownOpen && searchQuery.trim() !== '' && (
              <div className="search-dropdown-menu">
                <div className="search-dropdown-header">
                  <span>Matching Products</span>
                  <span className="search-results-count">
                    {matchingProducts.length} {matchingProducts.length === 1 ? 'result' : 'results'}
                  </span>
                </div>

                {matchingProducts.length > 0 ? (
                  <ul className="search-dropdown-list">
                    {matchingProducts.slice(0, 6).map((item) => (
                      <li key={item.id}>
                        <button
                          type="button"
                          className="search-dropdown-item"
                          onClick={() => handleSelectProduct(item.name)}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="dropdown-item-img"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src =
                                'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=120&q=80';
                            }}
                          />
                          <div className="dropdown-item-info">
                            <span className="dropdown-item-title">
                              {highlightMatch(item.name, trimmedQuery)}
                            </span>
                            <div className="dropdown-item-meta">
                              <span className="dropdown-item-cat">{item.category}</span>
                              <span className="dropdown-item-price">{formatPrice(item.price)}</span>
                            </div>
                          </div>
                          <ArrowUpRight size={14} className="dropdown-item-arrow" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="search-dropdown-empty">
                    <p>No products matching &ldquo;{searchQuery}&rdquo;</p>
                  </div>
                )}

                {matchingProducts.length > 0 && (
                  <div className="search-dropdown-footer">
                    <button
                      type="button"
                      className="search-view-all-btn"
                      onClick={() => handleSelectProduct(searchQuery)}
                    >
                      View all results in catalog
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Cart Icon with Dynamic Badge Count */}
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
            <div className="mobile-search-box" ref={mobileSearchRef}>
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search products by title..."
                className="search-input"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (searchQuery.trim()) setMobileDropdownOpen(true);
                }}
                aria-label="Search products by title"
                autoComplete="off"
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

              {/* Mobile Search Dropdown */}
              {mobileDropdownOpen && searchQuery.trim() !== '' && (
                <div className="search-dropdown-menu mobile-dropdown">
                  <div className="search-dropdown-header">
                    <span>Matching Products</span>
                    <span className="search-results-count">
                      {matchingProducts.length} {matchingProducts.length === 1 ? 'result' : 'results'}
                    </span>
                  </div>

                  {matchingProducts.length > 0 ? (
                    <ul className="search-dropdown-list">
                      {matchingProducts.slice(0, 5).map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            className="search-dropdown-item"
                            onClick={() => handleSelectProduct(item.name)}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="dropdown-item-img"
                            />
                            <div className="dropdown-item-info">
                              <span className="dropdown-item-title">
                                {highlightMatch(item.name, trimmedQuery)}
                              </span>
                              <div className="dropdown-item-meta">
                                <span className="dropdown-item-cat">{item.category}</span>
                                <span className="dropdown-item-price">{formatPrice(item.price)}</span>
                              </div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="search-dropdown-empty">
                      <p>No products matching &ldquo;{searchQuery}&rdquo;</p>
                    </div>
                  )}
                </div>
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
