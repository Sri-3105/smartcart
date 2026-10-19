import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const toastStyle = {
  position: "fixed",
  top: "100px",
  right: "30px",
  background: "#2a1a5e",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: "12px",
  fontWeight: 600,
  fontSize: "14px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
  zIndex: 9999,
};

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const query = searchParams.get("q") || "";
  const searchText = query.toLowerCase().trim();

  const user = JSON.parse(localStorage.getItem("user"));

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product");
        setProducts(response.data);
      } catch (error) {
        console.error("Search product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    return (
      (product.name || "").toLowerCase().includes(searchText) ||
      (product.category || "").toLowerCase().includes(searchText) ||
      (product.subCategory || "").toLowerCase().includes(searchText)
    );
  });

  const handleAddToCart = async (product) => {
    if (!user?.id) {
      showToast("Please login first");
      return;
    }

    try {
      await axios.post("http://localhost:3000/cart", {
        user_id: user.id,
        items: [{ product_id: product.id, quantity: 1 }],
      });
      showToast("Added to Cart 🛒");
    } catch (error) {
      console.error("Cart error:", error.response?.data);
      showToast(error.response?.data?.message || "Cart la add panna mudiyala");
    }
  };

  const handleWishlist = async (product) => {
    if (!user?.id) {
      showToast("Please login first");
      return;
    }

    try {
      await axios.post("http://localhost:3000/wishlist", {
        user_id: user.id,
        product_id: product.id,
      });
      showToast("Added to Wishlist ❤️");
    } catch (error) {
      console.error("Wishlist error:", error.response?.data);
      showToast(
        error.response?.data?.message || "Wishlist la add panna mudiyala"
      );
    }
  };

  return (
    <div className="category-page">
      {toast && <div style={toastStyle}>{toast}</div>}

      <h1>Search Results</h1>

      <p className="search-info">
        Results for: <strong>{query}</strong>
      </p>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image-box">
                  <img src={product.image} alt={product.name} />
                  <button
                    className="wishlist-btn"
                    onClick={() => handleWishlist(product)}
                  >
                    ❤️
                  </button>
                </div>

                <h2>{product.name}</h2>

                <h3>₹{product.price}</h3>

                <div className="stock">Stock : {product.stock}</div>

                <button
                  className="add-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add To Cart
                </button>
              </div>
            ))
          ) : (
            <div className="no-products">
              <h2>No Products Found</h2>
              <p>"{query}" product not found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResults;