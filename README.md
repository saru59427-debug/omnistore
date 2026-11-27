# OmniStore – Modern E-Commerce Website

OmniStore is a modern, responsive, component-driven e-commerce frontend built with **React.js**, **React Router DOM**, and **Vite** for the SkillMe Frontend Engineer Virtual Internship.

It features a clean design, live product data fetched from the DummyJSON REST API, client-side routing with individual product detail pages, interactive category filtering, live autocomplete search, a functional shopping cart drawer with quantity management, and formatted pricing.

---

## 🚀 Features (Week 1, Week 2 & Week 3)

### 🌐 Real Product Data & REST API Integration (Week 3)
- **DummyJSON API Integration**: Fetches 30 dynamic products directly from `https://dummyjson.com/products?limit=30` using native `fetch()` and React `useEffect([])`.
- **Loading & Error Handling**: Displays a loading spinner while fetching, and a friendly error state with a **"Retry Loading"** button if the request fails (checks `response.ok`).
- **Dynamic Category Filtering**: Dynamically derives categories and item counts from the fetched API catalog.

### 🧭 React Router DOM Client-Side Routing (Week 3)
- **`/` (Home)**: Complete homepage featuring hero banner, trust indicators, category cards, and responsive product grid.
- **`/product/:id` (Product Detail)**: Dynamic single-product detail page reading `:id` via `useParams()`, fetching `https://dummyjson.com/products/:id` with image gallery, thumbnails, rating, price, stock status, description, and "Add to Cart" button.
- **`*` (Custom 404 Not Found)**: Dedicated Not Found page with friendly explanation and one-click "Return to Home" button.
- **Seamless Navigation**: Zero full-page browser reloads using `<Link>` and `useNavigate()`.

### 🛒 Functional Shopping Cart (Week 2 & Week 3)
- **Add to Cart Anywhere**: Works seamlessly both from home product cards and individual product detail pages.
- **Smart Duplicate Handling**: Adding the same product increases quantity (`qty`) immutably instead of creating duplicate rows.
- **Slide-In Cart Drawer**: Sliding drawer panel accessible from the header shopping cart button with dynamic badge counter.
- **Quantity Controls**: Inline `(+)` and `(-)` controls with automatic item removal on zero.
- **Subtotal & Total Calculation**: Dynamically calculated on every render using JavaScript `reduce()` (not stored in state).

### 🔍 Live Product Search & Autocomplete
- **Controlled Search Input**: Fast search field in header with live matching products dropdown.
- **Highlighted Matches**: Yellow `<mark>` highlighting for matching search characters.
- **One-Click Clear**: Quick `(X)` button to clear search filter.

---

## 🛠️ Tech Stack

- **Framework**: [React.js](https://react.dev/) (v19 functional components & hooks)
- **Routing**: [React Router DOM](https://reactrouter.com/) (v7 with `BrowserRouter`, `Routes`, `Route`, `Link`, `useParams`, `useNavigate`)
- **API**: Native `fetch()` with [DummyJSON REST API](https://dummyjson.com/)
- **Bundler & Dev Server**: [Vite](https://vite.dev/) (v8)
- **Language**: JavaScript (JSX / ES6+)
- **State Management**: React `useState` & `useEffect` with immutable array updates (`map`, `filter`, `reduce`)
- **Styling**: Vanilla CSS3 with Custom Properties (Variables), Flexbox, and CSS Grid
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📁 Project Structure

```
omnistore/
├── public/
│   ├── favicon.svg          # Default SVG favicon
│   ├── icons.svg            # SVG sprite definitions
│   └── logo.png             # OmniStore brand logo image
├── src/
│   ├── assets/              # Static local assets
│   ├── components/
│   │   ├── Cart.jsx         # Slide-in shopping cart drawer panel
│   │   ├── CartItem.jsx     # Individual cart line item with quantity controls & subtotal
│   │   ├── Header.jsx       # Header with live search autocomplete & cart count
│   │   ├── ProductCard.jsx  # Reusable product card with View Details & Add to Cart
│   │   └── ProductGrid.jsx  # Responsive grid with loading, error, and empty states
│   ├── pages/
│   │   ├── Home.jsx         # Homepage route component (/)
│   │   ├── ProductDetail.jsx# Product detail page route (/product/:id)
│   │   └── NotFound.jsx     # 404 Not Found route (*)
│   ├── data/
│   │   └── products.js      # Reference catalog dataset
│   ├── App.jsx              # Parent root component with Router, state & API fetch
│   ├── App.css              # Global styles, layout, responsive design & animations
│   ├── index.css            # Base reset & font definitions
│   └── main.jsx             # Application entry point
├── index.html               # Main HTML document template
├── package.json             # Dependencies and build scripts
└── vite.config.js           # Vite configuration
```

---

## 🏁 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/saru59427-debug/omnistore.git
   cd omnistore
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📋 Week 3 Demonstration Checklist

- [x] **API Integration**: Fetches 30 products from `https://dummyjson.com/products?limit=30` using native `fetch()` in `useEffect([])`.
- [x] **Loading State**: Displays loading message and spinner while fetching.
- [x] **Error State & Retry**: Friendly error box with "Retry Loading" button checking `response.ok`.
- [x] **React Router DOM**: Installed and configured routes for `/`, `/product/:id`, and `*`.
- [x] **Product Detail Page**: Reads `:id` with `useParams()`, fetches `https://dummyjson.com/products/:id`, displays image gallery, rating, price, brand, description, and stock.
- [x] **View Details Navigation**: Product cards navigate to `/product/:id` via `<Link>`.
- [x] **Back to Products Button**: Navigation back to `/` using `useNavigate()`.
- [x] **Invalid Product ID Handling**: Friendly error message with retry and return home buttons.
- [x] **Custom 404 Page**: Professional Not Found page for unknown routes.
- [x] **Cart Compatibility**: "Add to Cart" works identically from product cards and product detail pages.
- [x] **Live Search**: Autocomplete and search grid work seamlessly with API product titles.
- [x] **Zero Build/Lint Errors**: Passes `npm run lint` and `npm run build` cleanly.
