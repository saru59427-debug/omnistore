import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Cart from './components/Cart';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import {
  Sparkles,
  Laptop,
  Shirt,
  Watch,
  Home as HomeIcon,
  ShoppingBag
} from 'lucide-react';
import './App.css';

/**
 * Main App Component
 * Week 3 Upgrade:
 * - Real Products from DummyJSON API via fetch() & useEffect([])
 * - Full React Router DOM routing (/, /product/:id, *)
 * - Individual Product Detail page with live API fetch & gallery
 * - Preserved Week 2 Shopping Cart with immutable state management
 * - Preserved live search & autocomplete dropdown
 * - Loading and error handling with retry capability
 */
function App() {
  // 1. API Products State
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Search Query State (Controlled search input)
  const [searchQuery, setSearchQuery] = useState('');

  // 3. Category Filter State
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 4. Shopping Cart State: Array of { id, title, price, qty, image, category }
  const [cart, setCart] = useState([]);

  // 5. Cart Drawer Panel Visibility State
  const [isCartOpen, setIsCartOpen] = useState(false);

  /**
   * Fetch 30 products from DummyJSON API using native fetch().
   * Checks response.ok before parsing JSON.
   */
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dummyjson.com/products?limit=30');
      if (!response.ok) {
        throw new Error(`Failed to load products (status ${response.status}: ${response.statusText})`);
      }
      const data = await response.json();
      setProducts(data.products || []);
    } catch (err) {
      setError(
        err.message || 'Unable to connect to product server. Please check your network and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * Runs once on component mount via useEffect with empty dependency array [].
   * Subscribes to API response cleanly without cascading renders.
   */
  useEffect(() => {
    let ignore = false;

    fetch('https://dummyjson.com/products?limit=30')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load products (status ${res.status}: ${res.statusText})`);
        }
        return res.json();
      })
      .then((data) => {
        if (!ignore) {
          setProducts(data.products || []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(
            err.message || 'Unable to connect to product server. Please check your network and try again.'
          );
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

  /**
   * Add a product to the cart (preserves Week 2 requirement).
   * Supports both DummyJSON products and local products.
   * If already in cart, immutably increases quantity via map().
   * Otherwise appends item with qty: 1.
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
          title: product.title || product.name || 'Product',
          price: product.price || 0,
          qty: 1,
          image: product.thumbnail || product.image || '',
          category: product.category || 'General'
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

  // Dynamic category icons lookup
  const categoryIcons = {
    all: Sparkles,
    beauty: Sparkles,
    fragrances: Sparkles,
    furniture: HomeIcon,
    groceries: ShoppingBag,
    electronics: Laptop,
    laptops: Laptop,
    smartphones: Laptop,
    fashion: Shirt,
    accessories: Watch,
    home: HomeIcon,
    'home-decoration': HomeIcon
  };

  // Derive categories dynamically from the fetched API products
  const uniqueCategoryNames = [
    'All',
    ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))
  ];

  const categories = uniqueCategoryNames.slice(0, 6).map((catName) => {
    const key = catName.toLowerCase();
    const count =
      catName === 'All'
        ? products.length
        : products.filter((p) => p.category && p.category.toLowerCase() === key).length;

    return {
      id: key,
      name: catName === 'All' ? 'All' : catName.charAt(0).toUpperCase() + catName.slice(1),
      rawName: catName,
      icon: categoryIcons[key] || Sparkles,
      count,
      description:
        catName === 'All'
          ? 'Browse complete catalog'
          : `Hand-selected ${catName} products`
    };
  });

  return (
    <BrowserRouter>
      <div className="app-wrapper">
        {/* Sticky Header with Dynamic Cart Count & Live Search Autocomplete */}
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          cartCount={totalCartCount}
          onOpenCart={() => setIsCartOpen(true)}
          products={products}
        />

        {/* Client-Side Routing: Home, ProductDetail, and 404 */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                loading={loading}
                error={error}
                onRetry={fetchProducts}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onAddToCart={addToCart}
                categories={categories}
              />
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail onAddToCart={addToCart} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Week 2 Slide-In Shopping Cart Drawer */}
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onIncreaseQty={increaseQuantity}
          onDecreaseQty={decreaseQuantity}
          onRemoveItem={removeFromCart}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
