import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar({ cartCount = 0, wishlistCount = 0 }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchText);
  };

  // Matches the "category" field values used in the product dataset
  const categories = [
    { name: 'For You', path: '/home', icon: '⭐' },
    { name: 'Women', path: '/category/women', icon: '👗' },
    { name: 'Men', path: '/category/men', icon: '👔' },
    { name: 'Boys', path: '/category/boys', icon: '🧒' },
    { name: 'Girls', path: '/category/girls', icon: '👧' },
    { name: 'Jewellery', path: '/category/jewellery', icon: '💍' },
    { name: 'Home Decor', path: '/category/homeDecor', icon: '🏠' },
    { name: 'Electronics', path: '/category/electronics', icon: '💻' },
    { name: 'Toys', path: '/category/toys', icon: '🧸' },
    { name: 'Books', path: '/category/books', icon: '📚' },
  ];

  return (
    <div className="amazon-navbar">
      {/* Row 1 - Logo, Pills, Search, Account, Cart */}
      <div className="nav-row-top">
        <div className="nav-logo">
          <Link to="/home">Smart <span>Cart</span></Link>
        </div>

        <div className="nav-pills">
          <span className="pill">🚀 Minutes</span>
          <span className="pill">🛍️ Grocery</span>
        </div>

        <form className="nav-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search Smart Cart..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button type="submit" className="search-btn">🔍</button>
        </form>

        <div className="nav-links">
          <Link to="/login" className="nav-account">
            <span className="nav-line1">Hello, sign in</span>
            <span className="nav-line2">Account ▾</span>
          </Link>

          <Link to="/wishlist" className="nav-icon-link">
            ❤️
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </Link>

          <Link to="/cart" className="nav-cart">
            🛒 Cart
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
          <Link to="/fashion">Fashion</Link>
        </div>
      </div>

      {/* Row 2 - Category Icons (scrollable) */}
      <div className="nav-row-categories">
        {categories.map((cat) => (
          <Link key={cat.name} to={cat.path} className="cat-item">
            <span className="cat-icon">{cat.icon}</span>
            <span className="cat-name">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;