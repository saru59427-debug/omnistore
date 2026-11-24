# OmniStore – Modern E-Commerce Website

OmniStore is a modern, responsive, and component-driven e-commerce frontend built with **React.js** and **Vite**. It features a clean, human-crafted design with professional typography, interactive category filtering, live product search, realistic pricing in Indian Rupees (INR), and a mobile-friendly responsive layout.

---

## 🚀 Features

- **Modern & Authentic UI/UX**: Clean layout with white and light-grey backgrounds, dark navy typography, royal blue accents, and subtle elevation shadows without synthetic marketing hype.
- **Reusable Component Architecture**: Built using modular functional components (`Header`, `ProductCard`, `ProductGrid`) driven by React props.
- **Dynamic JavaScript `map()` Rendering**: Clean iteration over local product dataset with key bindings and defensive fallbacks.
- **Interactive Department & Search Filtering**: Filter catalog items instantly by category (Electronics, Fashion, Accessories, Home & Living) or via the real-time search bar in the header.
- **Accurate Currency Formatting**: Prices formatted using `price.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })`.
- **Image Fallback System**: Reliable product photography with automatic fallback handling to ensure zero broken images.
- **Custom Branding**: Integrated custom brand logo (`logo.png`) in header navigation, footer, and browser favicon.
- **Fully Responsive**: Fluid grid system with 4 columns on desktop, 2 columns on tablets, and 1–2 columns on mobile devices with zero horizontal overflow.
- **Sticky Header & Mobile Navigation**: Clean top navigation with backdrop blur and an expandable drawer menu on smaller viewports.

---

## 🛠️ Tech Stack

- **Framework**: [React.js](https://react.dev/) (v19)
- **Bundler & Dev Server**: [Vite](https://vite.dev/) (v8)
- **Language**: JavaScript (JSX / ES6+)
- **Styling**: Vanilla CSS3 with CSS Custom Properties (Variables), Flexbox, and CSS Grid
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
│   │   ├── Header.jsx       # Sticky header with navigation, search, and cart counter
│   │   ├── ProductCard.jsx  # Reusable product card with image zoom & props
│   │   └── ProductGrid.jsx  # Responsive catalog grid rendering cards with map()
│   ├── data/
│   │   └── products.js      # Local product catalog data (12 products in INR)
│   ├── App.jsx              # Main homepage integrating Hero, Categories, Grid & Footer
│   ├── App.css              # Component and layout styling
│   ├── index.css            # Global CSS variables, reset, and design tokens
│   └── main.jsx             # React DOM entry point
├── index.html               # Main HTML template with Plus Jakarta Sans & no-referrer meta
├── package.json             # Scripts and dependencies
└── vite.config.js           # Vite configuration
```

---

## 📦 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18.0.0 or higher) and **npm** installed on your system.

### 1. Clone or Open the Repository

```bash
cd omnistore
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

### 4. Build for Production

```bash
npm run build
```

This compiles optimized, minified production assets into the `dist/` directory.

### 5. Run Linter

```bash
npm run lint
```

---

## 🧩 Component Overview

### `Header.jsx`
- **Location**: `src/components/Header.jsx`
- **Props**: `searchQuery`, `setSearchQuery`, `cartCount`
- **Description**: Sticky header featuring the brand logo (`/logo.png`), navigation links (Home, Products, Categories, About), real-time search input, shopping cart button with `0` badge, and a responsive slide-down menu for mobile screens.

### `ProductCard.jsx`
- **Location**: `src/components/ProductCard.jsx`
- **Props**: `product` object containing `id`, `name`, `category`, `price`, `originalPrice`, `image`, `description`, and `badge`
- **Description**: Displays individual product cards with image zoom on hover (`transform: scale(1.08)`), category tags, multi-line clamped descriptions, currency-formatted pricing in INR, strikethrough original prices, and an interactive "Add to Cart" button.

### `ProductGrid.jsx`
- **Location**: `src/components/ProductGrid.jsx`
- **Props**: `products`, `activeCategory`
- **Description**: Maps over the catalog array using JavaScript `map()` to dynamically render `ProductCard` components. Handles empty states gracefully and organizes cards into a 4-column responsive grid.

### `products.js`
- **Location**: `src/data/products.js`
- **Description**: Contains 12 realistic product records across four core departments:
  - **Electronics**: Sony WH-1000XM5, RGB Mechanical Keyboard, Fast Wireless Charging Pad
  - **Fashion**: Knit Running Sneakers, Tailored Denim Jacket, Relaxed Linen Shirt
  - **Accessories**: Chronograph Leather Watch, Urban Explorer Backpack, Polarized Aviators
  - **Home & Living**: Pour-Over Coffee Set, Sunset LED Lamp, Cotton Throw Blanket

---

## 🎨 Design System

| Token | Value | Description |
|---|---|---|
| `--bg-main` | `#f8fafc` | Main application background |
| `--bg-surface` | `#ffffff` | Card and modal surface background |
| `--text-primary` | `#0f172a` | Dark navy heading and primary text |
| `--text-secondary` | `#475569` | Secondary body text and labels |
| `--accent-primary` | `#2563eb` | Royal blue brand accent |
| `--accent-hover` | `#1d4ed8` | Deep blue button and hover state |
| `--font-family` | Plus Jakarta Sans | Modern clean sans-serif typography |

---

## 📄 License

This project is licensed under the MIT License.
