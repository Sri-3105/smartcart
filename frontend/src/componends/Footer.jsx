import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="smartcart-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/home" className="footer-logo">
            🛍️ SmartCart
          </Link>

          <p>
            Your everyday shopping destination.
            Discover products, enjoy offers, and shop with ease.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/home">Home</Link>
          <Link to="/offers">Offers</Link>
          <Link to="/help">Help &amp; Feedback</Link>
        </div>

        <div className="footer-section">
          <h3>My Account</h3>
          <Link to="/profile">My Profile</Link>
          <Link to="/cart">My Cart</Link>
          <Link to="/wishlist">My Wishlist</Link>
        </div>

        <div className="footer-section">
          <h3>Customer Support</h3>
          <p>Need help with your order?</p>
          <Link to="/help">Help &amp; Feedback</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} SmartCart. All Rights Reserved.
        </p>
        <p>Happy Shopping! 🛒</p>
      </div>
    </footer>
  );
};

export default Footer;