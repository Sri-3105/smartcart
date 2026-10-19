import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = ({ cartCount = 0, wishlistCount = 0 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const isAdmin = user?.role === "admin";
  const isLoggedIn = Boolean(user);

  const handleSearch = (e) => {
    e.preventDefault();

    const value = search.trim();

    if (value && !isAdmin) {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  const navItems = [
    { name: "For You", path: "/home", icon: "⭐" },
    { name: "Fashion", path: "/fashion", icon: "👕" },
    {
      name: "Mobile",
      path: "/category/electronics/mobiles",
      icon: "📱",
    },
    {
      name: "Electronic",
      path: "/category/electronics",
      icon: "💻",
    },
    {
      name: "Jewellery",
      path: "/category/jewellery",
      icon: "💍",
    },
    {
      name: "Home Decor",
      path: "/category/homeDecor",
      icon: "🏠",
    },
    { name: "Toys", path: "/category/toys", icon: "🧸" },
    { name: "Book", path: "/category/books", icon: "📚" },
    { name: "Help & Feedback", path: "/help", icon: "💬" },
  ];

  // Highlight only the item that matches the current page best
  // (e.g. on /category/electronics/mobiles only "Mobile" is active)
  const currentPath = location.pathname;

  const activePath = navItems
    .filter(
      (item) =>
        currentPath === item.path ||
        currentPath.startsWith(item.path + "/")
    )
    .sort((a, b) => b.path.length - a.path.length)[0]?.path;

  return (
    <div className="royal-header">
      <div className="royal-topbar">
        {/* LOGO */}
        <Link
          to={isAdmin ? "/admin" : "/home"}
          className="royal-logo"
        >
          <span className="logo-icon">🛍️</span>

          <div>
            <div className="logo-main">Smart</div>
            <span className="logo-sub">Cart</span>
          </div>
        </Link>

        {/* ADMIN HEADER */}
        {isAdmin ? (
          <>
            <div className="admin-header-title">
              <strong>Admin Dashboard</strong>
            </div>

            <button
              type="button"
              className="top-action"
              onClick={handleLogout}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              <strong>Logout</strong>
            </button>
          </>
        ) : (
          <>
            {/* USER SEARCH */}
            <form
              className="royal-search"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                placeholder="Search SmartCart..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            {/* USER PROFILE */}
            {isLoggedIn && (
              <Link to="/profile" className="top-action">
                <span>👤</span>
                <div>
                  <small>My</small>
                  <strong>Profile</strong>
                </div>
              </Link>
            )}

            {/* USER LOGIN / LOGOUT */}
            {isLoggedIn ? (
              <button
                type="button"
                className="top-action"
                onClick={handleLogout}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <strong>Logout</strong>
              </button>
            ) : (
              <Link to="/login" className="top-action">
                <strong>Login</strong>
              </Link>
            )}

            {/* WISHLIST */}
            <Link to="/wishlist" className="top-action">
              <span>❤️</span>

              <div>
                <small>My</small>
                <strong>Wishlist</strong>
              </div>

              {wishlistCount > 0 && (
                <b className="count-badge">
                  {wishlistCount}
                </b>
              )}
            </Link>

            {/* CART */}
            <Link to="/cart" className="top-cart">
              <span>🛒</span>

              {cartCount > 0 && (
                <b className="cart-count">
                  {cartCount}
                </b>
              )}

              <strong>Cart</strong>
            </Link>
          </>
        )}
      </div>

      {/* USER NAVIGATION — not shown for admin */}
      {!isAdmin && (
        <div className="royal-navigation">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-flat-item ${
                item.path === activePath ? "active" : ""
              }`}
            >
              <span className="nav-icon">
                {item.icon}
              </span>

              <span className="nav-label">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Header;
