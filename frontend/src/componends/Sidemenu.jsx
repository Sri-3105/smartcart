import { Link } from "react-router-dom";

const SideMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="side-overlay" onClick={onClose}></div>

      {/* Side Menu */}
      <div className="side-menu">

        {/* Header */}
        <div className="side-menu-header">
          <h2>Hello, sign in</h2>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Main Categories */}
        <div className="side-section">
          <h3>SHOP BY CATEGORY</h3>

          <Link to="/home" onClick={onClose}>
            🏠 Home
          </Link>

          <Link to="/category/women" onClick={onClose}>
            👗 Women
          </Link>

          <Link to="/category/men" onClick={onClose}>
            👔 Men
          </Link>

          <Link to="/category/kids" onClick={onClose}>
            🧒 Kids
          </Link>

          <Link to="/category/electronic" onClick={onClose}>
            📱 Electronic
          </Link>
        </div>

        {/* Help */}
        <div className="side-section">
          <h3>HELP & SETTINGS</h3>

          <Link to="/wishlist" onClick={onClose}>
            ❤️ Your Wishlist
          </Link>

          <Link to="/cart" onClick={onClose}>
            🛒 Your Cart
          </Link>

          <Link to="/contact" onClick={onClose}>
            Customer Service
          </Link>
        </div>

      </div>
    </>
  );
};

export default SideMenu;