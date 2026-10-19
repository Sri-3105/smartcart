import {BrowserRouter,Routes,Route,useLocation,useNavigate, Navigate,} from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import HelpFeedback from "./pages/HelpFeedback";
import Category from "./pages/CategoryProducts";
import SearchResults from "./pages/SearchResults";
import AdminDashboard from "./pages/AdminDashboard";
import UserProfile from "./pages/UserProfile";
import Header from "./componends/Header";
import Footer from "./componends/Footer";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Offers from "./componends/Offers";
import FashionPage from "./pages/FashionPage";
import Checkout from "./pages/Checkout";
import FeedbackForm from "./componends/FeedbackForm";


const API_URL = "http://localhost:3000";
const DISCOUNT_KEY = "smartcartDiscountPercent";

function getSavedUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    localStorage.removeItem("user");
    return null;
  }
}

function getSavedDiscount() {
  const value = Number(localStorage.getItem(DISCOUNT_KEY));
  return Number.isFinite(value) && value > 0 ? value : 0;
}

function getProductsFromResponse(result) {
  const products = result?.data?.productList;

  return Array.isArray(products) ? products : [];
}

// Admin page protection
function AdminRoute({ children }) {
  const user = getSavedUser();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/home" replace />;

  return children;
}

// User profile protection
function UserRoute({ children }) {
  const user = getSavedUser();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "admin") return <Navigate to="/admin" replace />;

  return children;
}

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const isAuthPage = isLoginPage || isSignupPage;

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [discountPercent, setDiscountPercent] = useState(getSavedDiscount);

  const user = getSavedUser();
  const userId = user?.id ?? user?.user_id ?? user?.userId;

  // Fetch the logged-in user's saved cart from backend.
  const loadCart = useCallback(async () => {
    if (!userId) {
      setCart([]);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/cart/${userId}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Unable to load cart");
      }

      const products = getProductsFromResponse(result);
      setCart(products);
    } catch (error) {
      console.error("App cart sync error:", error);
    }
  }, [userId]);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Refresh cart when navigating back to the cart page.
  useEffect(() => {
    if (location.pathname === "/cart") {
      loadCart();
    }
  }, [location.pathname, loadCart]);

  // Read discount when the user navigates between pages.
  useEffect(() => {
    setDiscountPercent(getSavedDiscount());
  }, [location.pathname]);

  // Listen for discount changes from another browser tab.
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === DISCOUNT_KEY) {
        setDiscountPercent(getSavedDiscount());
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const removeFromWishlist = (id) => {
    setWishlist((previous) => previous.filter((item) => item.id !== id));
  };

  return (
    <div className="app-container">
      {!isAuthPage && (
        <Header cartCount={cart.length} wishlistCount={wishlist.length} />
      )}

      <main className="main-content">
        {!isAuthPage && location.pathname !== "/home" && (
          <button
            className="back-button"
            onClick={() => navigate(-1)}
            title="Go Back"
          >
            ←
          </button>
        )}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            path="/home"
            element={
              <Home
                cart={cart}
                setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            }
          />

          <Route
            path="/category/:category"
            element={
              <Category
                cart={cart}
                setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            }
          />

          <Route
            path="/category/:category/:subCategory"
            element={
              <Category
                cart={cart}
                setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            }
          />

          <Route
            path="/search"
            element={
              <SearchResults
                cart={cart}
                setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            }
          />

          {/* Help & Feedback page (renamed from Contact) */}
          <Route path="/help" element={<HelpFeedback />} />
          <Route path="/contact" element={<Navigate to="/help" replace />} />
          <Route path="/feedback" element={<FeedbackForm />} />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                discountPercent={discountPercent}
              />
            }
          />

          <Route
            path="/wishlist"
            element={
              <Wishlist
                wishlist={wishlist}
                setWishlist={setWishlist}
                removeFromWishlist={removeFromWishlist}
              />
            }
          />

          <Route
            path="/profile"
            element={
              <UserRoute>
                <UserProfile />
              </UserRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                setCart={setCart}
                discountPercent={discountPercent}
              />
            }
          />

          <Route path="/offers" element={<Offers />} />
          <Route path="/fashion" element={<FashionPage />} />
        </Routes>
      </main>

      {!isAuthPage && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
