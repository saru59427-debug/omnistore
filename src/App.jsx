import { useState } from 'react';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import productsData from './data/products';
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Laptop,
  Shirt,
  Watch,
  Home as HomeIcon,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import './App.css';

function App() {
  // 1. Search Query State (Controlled search input)
  const [searchQuery, setSearchQuery] = useState('');

  // 2. Category Filter State
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 3. Shopping Cart State: Array of { id, title, price, qty, image, category }
  const [cart, setCart] = useState([]);

  // 4. Cart Drawer Panel Visibility State
  const [isCartOpen, setIsCartOpen] = useState(false);

  /**
   * Add a product to the cart.
   * If the product already exists, immutably increment its quantity.
   * Otherwise, append the new item with an initial quantity of 1.
   *
   * @param {Object} product
   */
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prevCart,
        {
          id: product.id,
          title: product.name,
          price: product.price,
          qty: 1,
          image: product.image,
          category: product.category
        }
      ];
    });
  };

  /**
   * Increase item quantity by 1.
   * Uses immutable array update via map().
   *
   * @param {number|string} productId
   */
  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  /**
   * Decrease item quantity by 1.
   * If the quantity reaches 0, the item is removed from the cart.
   * Uses immutable map() and filter().
   *
   * @param {number|string} productId
   */
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  /**
   * Remove an item completely from the cart regardless of quantity.
   * Uses immutable array filter().
   *
   * @param {number|string} productId
   */
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  /**
   * Dynamic total cart items count (sum of quantities).
   * Calculated using Array.prototype.reduce().
   */
  const totalCartCount = cart.reduce((total, item) => total + item.qty, 0);

  // Categories definition with icons and description
  const categories = [
    {
      id: 'all',
      name: 'All',
      icon: Sparkles,
      count: productsData.length,
      description: 'Browse complete catalog'
    },
    {
      id: 'electronics',
      name: 'Electronics',
      icon: Laptop,
      count: productsData.filter((p) => p.category === 'Electronics').length,
      description: 'Audio, gadgets & accessories'
    },
    {
      id: 'fashion',
      name: 'Fashion',
      icon: Shirt,
      count: productsData.filter((p) => p.category === 'Fashion').length,
      description: 'Modern everyday apparel'
    },
    {
      id: 'accessories',
      name: 'Accessories',
      icon: Watch,
      count: productsData.filter((p) => p.category === 'Accessories').length,
      description: 'Watches, bags & essentials'
    },
    {
      id: 'home',
      name: 'Home & Living',
      icon: HomeIcon,
      count: productsData.filter((p) => p.category === 'Home & Living').length,
      description: 'Minimalist decor & lifestyle'
    }
  ];

  /**
   * Filter products based on active category and live search query.
   * Case-insensitive matching against product name and category.
   */
  const filteredProducts = productsData.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      searchQuery.trim() === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-wrapper">
      {/* 1. Sticky Header with Dynamic Cart Count & Live Search */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        products={productsData}
      />

      <main>
        {/* 2. Hero / Banner Section */}
        <section className="hero-section" id="home">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                Simple, Quality Goods for <span className="text-gradient">Everyday Living</span>
              </h1>
              <p className="hero-description">
                Explore our curated collection of reliable tech, comfortable apparel, durable accessories,
                and functional home goods — thoughtfully made and delivered directly to your door.
              </p>
              <div className="hero-cta-group">
                <a href="#products" className="btn btn-primary">
                  <span>Shop Products</span>
                  <ArrowRight size={18} />
                </a>
                <a href="#categories" className="btn btn-secondary">
                  Browse Categories
                </a>
              </div>
              <div className="hero-highlights">
                <div className="highlight-item">
                  <CheckCircle2 size={18} className="highlight-icon" />
                  <span>Free shipping over ₹10,000</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle2 size={18} className="highlight-icon" />
                  <span>7-day return policy</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle2 size={18} className="highlight-icon" />
                  <span>Standard brand warranty</span>
                </div>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-card-preview">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80"
                  alt="OmniStore Featured Lifestyle"
                  className="hero-img"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition / Trust Features Strip */}
        <section className="features-strip">
          <div className="features-container">
            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="feature-title">Fast Shipping</h4>
                <p className="feature-desc">Free delivery on orders over ₹10,000</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="feature-title">Verified Quality</h4>
                <p className="feature-desc">Direct manufacturer warranty</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <RotateCcw size={24} />
              </div>
              <div>
                <h4 className="feature-title">7-Day Returns</h4>
                <p className="feature-desc">Quick exchange or full refund</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon-wrapper">
                <Headphones size={24} />
              </div>
              <div>
                <h4 className="feature-title">Dedicated Support</h4>
                <p className="feature-desc">Mon–Sat, 9:00 AM to 7:00 PM</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Featured Categories Section */}
        <section className="categories-section" id="categories">
          <div className="section-container">
            <div className="section-header">
              <div className="section-tag">Departments</div>
              <h2 className="section-title">Shop by Category</h2>
              <p className="section-subtitle">
                Browse our focused collections designed for durability, comfort, and utility.
              </p>
            </div>

            <div className="categories-grid">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`category-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      const el = document.getElementById('products');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <div className="category-icon-box">
                      <IconComponent size={26} />
                    </div>
                    <h3 className="category-card-name">{cat.name}</h3>
                    <p className="category-card-desc">{cat.description}</p>
                    <span className="category-card-count">{cat.count} Items</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 4. Featured Products Section using ProductGrid */}
        <ProductGrid
          products={filteredProducts}
          activeCategory={selectedCategory}
          onAddToCart={addToCart}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />

        {/* 5. Promotional / Spotlight Banner Section */}
        <section className="promo-section">
          <div className="promo-container">
            <div className="promo-inner">
              <div className="promo-content">
                <span className="promo-badge">Curated Spotlight</span>
                <h2 className="promo-title">Thoughtfully Designed Tech & Everyday Gear</h2>
                <p className="promo-text">
                  Crisp audio, responsive keyboards, and comfortable accessories designed to blend seamlessly into your work and home routines.
                </p>
                <a href="#products" className="btn btn-white">
                  <span>View Collection</span>
                  <ArrowRight size={18} />
                </a>
              </div>
              <div className="promo-visual">
                <img
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80"
                  alt="Modern Tech Essentials"
                  className="promo-image"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <footer className="site-footer" id="about">
        <div className="footer-top">
          <div className="footer-container">
            {/* Brand column */}
            <div className="footer-col brand-col">
              <div className="footer-logo">
                <img src="/logo.png" alt="OmniStore Logo" className="footer-logo-img" />
                <span className="brand-name">
                  Omni<span className="brand-accent">Store</span>
                </span>
              </div>
              <p className="footer-bio">
                OmniStore provides practical, well-designed essentials across electronics,
                apparel, and home living with dependable quality and straightforward pricing.
              </p>
              <div className="footer-contact-info">
                <p className="contact-line">
                  <MapPin size={16} /> 42 Galle Road, Colombo 03, Sri Lanka
                </p>
                <p className="contact-line">
                  <Phone size={16} /> +94 11 234 5678 / +94 77 123 4567
                </p>
                <p className="contact-line">
                  <Mail size={16} /> hello@omnistore.lk
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4 className="footer-heading">Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#products">Products</a></li>
                <li><a href="#categories">Categories</a></li>
                <li><a href="#about">About OmniStore</a></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className="footer-col">
              <h4 className="footer-heading">Customer Care</h4>
              <ul className="footer-links">
                <li><a href="#home">Shipping Policy</a></li>
                <li><a href="#home">Returns & Refunds</a></li>
                <li><a href="#home">Warranty Registration</a></li>
                <li><a href="#home">Terms of Service</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-col newsletter-col">
              <h4 className="footer-heading">Stay Updated</h4>
              <p className="footer-newsletter-text">
                Receive occasional updates about restocks, new arrivals, and seasonal items.
              </p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
              <span className="newsletter-disclaimer">
                No spam. Unsubscribe anytime.
              </span>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-container">
            <p className="copyright-text">
              &copy; {new Date().getFullYear()} OmniStore. All rights reserved.
            </p>
            <div className="payment-badges">
              <span className="pay-tag">Visa</span>
              <span className="pay-tag">MasterCard</span>
              <span className="pay-tag">Amex</span>
              <span className="pay-tag">LankaQR</span>
              <span className="pay-tag">Cash on Delivery</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 7. Shopping Cart Drawer Panel */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onIncreaseQty={increaseQuantity}
        onDecreaseQty={decreaseQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
}

export default App;
