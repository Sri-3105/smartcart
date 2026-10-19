import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000";

function getSavedUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
}

function Cart() {
  const navigate = useNavigate();

  const [user, setUser] = useState(getSavedUser);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState(null);
  const [toast, setToast] = useState("");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  const userId = user?.id ?? user?.user_id ?? user?.userId;

  const loadCart = useCallback(async () => {
    if (!userId) {
      setError("User details not found. Please login again.");
      setCartItems([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/cart/${userId}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Unable to load cart.");
      }

      const products = result?.data?.productList;

      setCartItems(Array.isArray(products) ? products : []);
    } catch (err) {
      console.error("Cart loading error:", err);
      setError(err.message || "Something went wrong while loading cart.");
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    setUser(getSavedUser());
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const updateQuantity = (productId, change) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== productId) return item;

        const currentQuantity = Number(item.quantity) || 1;
        const stock = Number(item.stock) || 99;
        const nextQuantity = Math.max(
          1,
          Math.min(stock, currentQuantity + change)
        );

        return {
          ...item,
          quantity: nextQuantity,
        };
      })
    );
  };

  const removeItem = async (productId) => {
    if (!userId) return;

    try {
      setRemovingId(productId);
      setError("");

      const response = await fetch(
        `${API_URL}/cart/${userId}/${productId}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result?.message || "Unable to remove item.");
      }

      await loadCart();
      showToast("Removed from Cart 🗑️");
    } catch (err) {
      console.error("Remove cart item error:", err);
      showToast(err.message || "Could not remove this item.");
    } finally {
      setRemovingId(null);
    }
  };

  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 1;
    return total + price * quantity;
  }, 0);

  const deliveryCharge = cartItems.length > 0 ? 50 : 0;
  const total = subtotal + deliveryCharge;

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.messageCard}>Loading your cart...</div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {toast && <div style={styles.toast}>{toast}</div>}

      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.heading}>Shopping Cart</h1>
            <p style={styles.subheading}>
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
              your cart
            </p>
          </div>

          <button style={styles.continueButton} onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {cartItems.length === 0 ? (
          <div style={styles.emptyCard}>
            <div style={styles.emptyIcon}>🛒</div>
            <h2 style={styles.emptyTitle}>Your cart is empty</h2>
            <p style={styles.emptyText}>
              Add some products to your cart and they will appear here.
            </p>
            <button
              style={styles.primaryButton}
              onClick={() => navigate("/")}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={styles.layout}>
            <section style={styles.itemsCard}>
              {cartItems.map((item) => {
                const price = Number(item.price) || 0;
                const quantity = Number(item.quantity) || 1;
                const productId = item.id;

                return (
                  <div key={productId} style={styles.cartItem}>
                    <img
                      src={item.image || item.image_url || ""}
                      alt={item.name || "Product"}
                      style={styles.productImage}
                      onError={(event) => {
                        event.currentTarget.style.visibility = "hidden";
                      }}
                    />

                    <div style={styles.productInfo}>
                      <h3 style={styles.productName}>
                        {item.name || "Unnamed Product"}
                      </h3>

                      <p style={styles.productPrice}>
                        ₹{price.toLocaleString("en-IN")}
                      </p>

                      <p style={styles.stockText}>
                        {Number(item.stock) > 0
                          ? `${item.stock} in stock`
                          : "Stock information unavailable"}
                      </p>

                      <div style={styles.itemActions}>
                        <div style={styles.quantityControl}>
                          <button
                            type="button"
                            style={styles.quantityButton}
                            onClick={() => updateQuantity(productId, -1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>

                          <span style={styles.quantityValue}>{quantity}</span>

                          <button
                            type="button"
                            style={styles.quantityButton}
                            onClick={() => updateQuantity(productId, 1)}
                            disabled={
                              Number(item.stock) > 0 &&
                              quantity >= Number(item.stock)
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          style={styles.removeButton}
                          onClick={() => removeItem(productId)}
                          disabled={removingId === productId}
                        >
                          {removingId === productId
                            ? "Removing..."
                            : "Remove"}
                        </button>
                      </div>
                    </div>

                    <div style={styles.lineTotal}>
                      ₹{(price * quantity).toLocaleString("en-IN")}
                    </div>
                  </div>
                );
              })}
            </section>

            <aside style={styles.summaryCard}>
              <h2 style={styles.summaryHeading}>Order Summary</h2>

              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div style={styles.summaryRow}>
                <span>Delivery</span>
                <span>₹{deliveryCharge.toLocaleString("en-IN")}</span>
              </div>

              <div style={styles.summaryDivider} />

              <div style={styles.totalRow}>
                <strong>Total</strong>
                <strong>₹{total.toLocaleString("en-IN")}</strong>
              </div>

              <button
                type="button"
                style={styles.checkoutButton}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>

              <p style={styles.secureText}>Secure checkout</p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f6f7fb",
    padding: "32px 16px",
    boxSizing: "border-box",
    color: "#202124",
    fontFamily: "Arial, sans-serif",
  },
  toast: {
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
  },
  container: {
    maxWidth: "1150px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
    marginBottom: "24px",
  },
  heading: {
    margin: 0,
    fontSize: "30px",
    fontWeight: 700,
  },
  subheading: {
    margin: "8px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },
  continueButton: {
    background: "#fff",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    padding: "11px 16px",
    cursor: "pointer",
    fontWeight: 600,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) 320px",
    gap: "22px",
    alignItems: "start",
  },
  itemsCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "8px 20px",
    boxShadow: "0 3px 14px rgba(0,0,0,0.04)",
  },
  cartItem: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    padding: "20px 0",
    borderBottom: "1px solid #edf0f3",
  },
  productImage: {
    width: "105px",
    height: "105px",
    objectFit: "contain",
    background: "#f8f8f8",
    borderRadius: "8px",
    flexShrink: 0,
  },
  productInfo: {
    flex: 1,
    minWidth: 0,
  },
  productName: {
    margin: "0 0 8px",
    fontSize: "16px",
    fontWeight: 600,
    overflowWrap: "anywhere",
  },
  productPrice: {
    margin: "0 0 5px",
    fontWeight: 700,
    fontSize: "15px",
  },
  stockText: {
    margin: "0 0 12px",
    fontSize: "12px",
    color: "#6b7280",
  },
  itemActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  quantityControl: {
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid #d1d5db",
    borderRadius: "7px",
    overflow: "hidden",
  },
  quantityButton: {
    width: "32px",
    height: "30px",
    border: 0,
    background: "#f9fafb",
    cursor: "pointer",
    fontSize: "18px",
  },
  quantityValue: {
    minWidth: "34px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: 600,
  },
  removeButton: {
    border: 0,
    background: "transparent",
    color: "#dc2626",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    padding: "6px 0",
  },
  lineTotal: {
    fontWeight: 700,
    whiteSpace: "nowrap",
    alignSelf: "flex-start",
    paddingTop: "4px",
  },
  summaryCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "22px",
    boxShadow: "0 3px 14px rgba(0,0,0,0.04)",
  },
  summaryHeading: {
    margin: "0 0 22px",
    fontSize: "19px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    marginBottom: "16px",
    fontSize: "14px",
    color: "#4b5563",
  },
  summaryDivider: {
    borderTop: "1px solid #e5e7eb",
    margin: "18px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    fontSize: "17px",
    marginBottom: "20px",
  },
  checkoutButton: {
    width: "100%",
    border: 0,
    borderRadius: "8px",
    padding: "14px 12px",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 700,
    fontSize: "14px",
    cursor: "pointer",
  },
  secureText: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "12px",
    margin: "13px 0 0",
  },
  emptyCard: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "55px 20px",
    textAlign: "center",
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "12px",
  },
  emptyTitle: {
    margin: "0 0 8px",
    fontSize: "22px",
  },
  emptyText: {
    color: "#6b7280",
    margin: "0 0 22px",
    fontSize: "14px",
  },
  primaryButton: {
    background: "#2563eb",
    color: "#fff",
    border: 0,
    borderRadius: "8px",
    padding: "12px 18px",
    fontWeight: 600,
    cursor: "pointer",
  },
  messageCard: {
    maxWidth: "500px",
    margin: "80px auto",
    background: "#fff",
    borderRadius: "10px",
    padding: "24px",
    textAlign: "center",
  },
  error: {
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    padding: "12px 14px",
    borderRadius: "8px",
    marginBottom: "18px",
    fontSize: "14px",
  },
};

export default Cart;