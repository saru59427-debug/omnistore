# OmniStore – Modern E-Commerce Website

OmniStore is a modern, responsive, component-driven e-commerce frontend built with **React.js** and **Vite** for the SkillMe Frontend Engineer Virtual Internship.

It features a clean, human-crafted design with professional typography, interactive category filtering, live product search with instant feedback, a fully functional shopping cart drawer with quantity controls, and accurate pricing in Sri Lankan Rupees (LKR).

---

## 🚀 Features (Week 1 & Week 2)

### 🛒 Functional Shopping Cart (Week 2)
- **Add to Cart on Every Card**: Clicking "Add to Cart" adds the selected product to the cart with instant visual confirmation.
- **Smart Duplicate Handling**: Adding the same product again increases its quantity (`qty`) immutably instead of creating duplicate rows.
- **Modern Cart Drawer Panel**: A sliding side drawer accessible by clicking the cart icon in the header or mobile menu.
- **Quantity Controls**: Inline `(+)` and `(-)` buttons that increment or decrement quantity immediately.
- **Auto-Removal on Zero**: Decreasing quantity to zero automatically removes the item from the cart via immutable `filter()`.
- **Direct Item Removal**: Dedicated trash button to instantly remove a line item.
- **Subtotal & Cart Total Calculation**: Computed dynamically using JavaScript's `reduce()` method.
- **Empty Cart State**: Friendly empty-cart view with an illustration and "Continue Shopping" button.

### 🔍 Live Product Search (Week 2)
- **Controlled Search Input**: Fast, real-time search field in the header that filters products as the user types.
- **Case-Insensitive Filtering**: Searches titles and categories without modifying the original product data.
- **Empty Search Feedback**: Displays a friendly "No products found" state with a one-click "Clear Search Filter" button when no results match.
- **One-Click Clear (X)**: Easily clear the search query from the input field.

### 📱 Responsive Layout & Design System
- **2x2 Product Grid on Mobile**: Clean two-column grid on smartphones and small viewports with symmetrical card heights.
- **Adaptive Layouts**: 4 columns on large desktops, 2 columns on tablets, and 2 columns on mobile.
- **Custom Branding**: Integrated custom brand logo (`logo.png`) in the header, footer, and browser tab icon.
- **Zero Broken Images**: Tested direct product photos with automatic placeholder fallback handling (`onError`).

---

## 🛠️ Tech Stack

- **Framework**: [React.js](https://react.dev/) (v19 functional components & hooks)
- **Bundler & Dev Server**: [Vite](https://vite.dev/) (v8)
- **Language**: JavaScript (JSX / ES6+)
- **State Management**: React `useState` hook with immutable array updates (`map`, `filter`, `reduce`)
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
│   │   ├── Cart.jsx         # Modern slide-in shopping cart drawer panel
│   │   ├── CartItem.jsx     # Individual cart line item with quantity controls & subtotal
│   │   ├── Header.jsx       # Sticky header with live search & dynamic cart counter
│   │   ├── ProductCard.jsx  # Reusable product card with image zoom & Add to Cart button
│   │   └── ProductGrid.jsx  # Responsive 4-col/2-col catalog grid rendering cards with map()
│   ├── data/
│   │   └── products.js      # Local product catalog data (12 products in LKR)
│   ├── App.jsx              # Central parent component managing Cart & Search state
│   ├── App.css              # Component, drawer animations, and layout styling
│   ├── index.css            # Global CSS variables, reset, and design tokens
│   └── main.jsx             # React DOM root entry point
├── index.html               # Main HTML template with Plus Jakarta Sans & no-referrer meta
├── package.json             # Scripts and dependencies
└── vite.config.js           # Vite configuration
```

---

## 🧠 React State Architecture (`App.jsx`)

All core state and state mutators are centralized in `App.jsx` and passed down via React props:

| State Variable | Type | Purpose |
|---|---|---|
| `cart` | `Array<Object>` | Stores items in cart: `{ id, title, price, qty, image, category }` |
| `searchQuery` | `string` | Stores the active search text entered by the user |
| `selectedCategory` | `string` | Stores active department filter ("All", "Electronics", etc.) |
| `isCartOpen` | `boolean` | Controls visibility of the slide-in shopping cart drawer |

### Key Functions Passed via Props
- `addToCart(product)`: Appends a new item or increments `qty` immutably using `map()`.
- `increaseQuantity(productId)`: Increments item `qty` by 1.
- `decreaseQuantity(productId)`: Decrements item `qty` by 1, automatically filtering out items when `qty === 0`.
- `removeFromCart(productId)`: Filters out the specified product from `cart`.
- `totalCartCount`: Derived via `cart.reduce((total, item) => total + item.qty, 0)`.

---

## 📦 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) installed.

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

### 3. Build for Production

```bash
npm run build
```

### 4. Run Linter

```bash
npm run lint
```

---

## ✅ Week 2 Demonstration Checklist

Use this checklist to verify or demonstrate the Week 2 deliverables:

1. [x] **Add to Cart**: Click "Add to Cart" on any product card — item is added and the header badge updates.
2. [x] **Duplicate Prevention**: Click "Add to Cart" again on the same product — quantity increments to `2` without creating a duplicate row.
3. [x] **Open Cart Drawer**: Click the shopping cart icon in the header or mobile menu to open the slide-in panel.
4. [x] **Quantity Increase**: Click the `(+)` button in the cart — quantity and item subtotal increase immediately.
5. [x] **Quantity Decrease**: Click the `(-)` button in the cart — quantity and item subtotal decrease immediately.
6. [x] **Zero Removal**: Decrease an item's quantity to `0` — the item is automatically removed from the cart.
7. [x] **Direct Removal**: Click the trash icon on any cart item — item is immediately removed.
8. [x] **Total Calculation**: Confirm the cart total matches the sum of all item subtotals.
9. [x] **Dynamic Header Count**: Confirm the badge in the header shows the exact sum of all item quantities.
10. [x] **Live Search (Match)**: Type "Sony" or "Watch" into the search box — product list filters instantly.
11. [x] **Live Search (No Match)**: Type "xyz" — friendly "No products found" message and clear button appear.
12. [x] **Clear Search**: Click "Clear Search Filter" or the input `(X)` icon — full catalog restores immediately.
13. [x] **Responsive 2x2 Grid**: Shrink browser window or open on mobile — product cards align cleanly in a 2x2 grid.

---

## 📄 License

This project is licensed under the MIT License.
