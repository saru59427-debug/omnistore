import { Link } from 'react-router-dom';
import { Home, SearchX } from 'lucide-react';

/**
 * NotFound (404) Page Component
 * Displayed for any route that does not match / or /product/:id.
 * Uses React Router's <Link> for client-side navigation back home.
 */
function NotFound() {
  return (
    <div className="notfound-page">
      <div className="notfound-card">
        <div className="notfound-icon-box">
          <SearchX size={64} />
        </div>
        <h1 className="notfound-heading">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-text">
          Sorry, the page you are looking for does not exist or has been moved.
          Please check the URL or head back to the homepage.
        </p>
        <Link to="/" className="btn btn-primary notfound-btn">
          <Home size={18} />
          <span>Return to Home</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
