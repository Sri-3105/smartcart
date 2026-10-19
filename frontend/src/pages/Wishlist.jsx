import { useEffect, useState } from "react";
import axios from "axios";

const toastStyle = {
  position: "fixed",
  top: "100px",
  right: "40px",
  background: "#2a1a5e",
  color: "#fff",
  padding: "12px 20px",
  borderRadius: "12px",
  fontWeight: 600,
  fontSize: "14px",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.4)",
  zIndex: 9999,
};

function Wishlist({
  wishlist = [],
  setWishlist,
  removeFromWishlist,
}) {
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  // Fetch wishlist from backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `http://localhost:3000/wishlist/${user.id}`
        );

        const items = Array.isArray(res.data) ? res.data : [];

        if (setWishlist) {
          setWishlist(items);
        }
      } catch (error) {
        console.error("Fetch wishlist error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [setWishlist]);

  // Remove wishlist item
  const handleRemove = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        showToast("Please login first");
        return;
      }

      await axios.delete(
        `http://localhost:3000/wishlist/${user.id}/${id}`
      );

      if (removeFromWishlist) {
        removeFromWishlist(id);
      } else if (setWishlist) {
        setWishlist((prev) =>
          prev.filter((item) => item.id !== id)
        );
      }

      showToast("Removed from Wishlist 💔");
    } catch (error) {
      console.error("Remove wishlist error:", error);
      showToast("Could not remove wishlist item");
    }
  };

  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  return (
    <div className="wishlist-container">
      {toast && <div style={toastStyle}>{toast}</div>}

      <h2>My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p>No items in your wishlist</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div className="wishlist-card" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300";
                }}
              />

              <h4>{item.name || item.title}</h4>
              <p>₹{item.price}</p>

              <button onClick={() => handleRemove(item.id)}>
                ❤️ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;