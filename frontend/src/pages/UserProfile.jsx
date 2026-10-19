import { useEffect, useState } from "react";

const API = "http://localhost:3000";
const REFRESH_MS = 10000; // 10 seconds

// Must match the numbers in backend order.js
const CANCEL_WINDOW_DAYS = 5; // cancel allowed within 5 days of placing the order
const RETURN_WINDOW_DAYS = 5; // return allowed within 5 days of delivery

const DAY_MS = 24 * 60 * 60 * 1000;

const daysSince = (date) => {
  const time = new Date(date).getTime();

  if (Number.isNaN(time)) return 0;

  return (Date.now() - time) / DAY_MS;
};

const daysLeft = (date, windowDays) =>
  Math.max(0, Math.ceil(windowDays - daysSince(date)));

const RETURN_COLORS = {
  Requested: { background: "#fff7e0", color: "#8a5a00" },
  Approved: { background: "#e6f7ea", color: "#18733a" },
  Rejected: { background: "#ffe9e9", color: "#a40000" },
  Refunded: { background: "#e8f0ff", color: "#1756a9" },
};

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cancel
  const [cancelError, setCancelError] = useState("");
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [cancellationReasonInput, setCancellationReasonInput] = useState("");
  const [cancelingOrderId, setCancelingOrderId] = useState(null);

  // Return
  const [returnError, setReturnError] = useState("");
  const [orderToReturn, setOrderToReturn] = useState(null);
  const [returnReasonInput, setReturnReasonInput] = useState("");
  const [returningOrderId, setReturningOrderId] = useState(null);

  const getUserId = (savedUser) =>
    savedUser?.id ?? savedUser?._id ?? savedUser?.userId;

  const loadOrders = async (userId) => {
    const response = await fetch(`${API}/orders/user/${userId}`);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Could not load purchase history.");
    }

    setOrders(Array.isArray(data) ? data : data.orders || []);
  };

  // First load
  useEffect(() => {
    let savedUser = null;

    try {
      savedUser = JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      setError("User details could not be read. Please login again.");
      setLoading(false);
      return;
    }

    setUser(savedUser);

    const userId = getUserId(savedUser);

    if (!userId) {
      setError("User ID not found. Please login again.");
      setLoading(false);
      return;
    }

    loadOrders(userId)
      .catch((err) => {
        setError(err.message || "Failed to load purchase history.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Auto refresh: every 10 seconds + when the user comes back to this tab
  useEffect(() => {
    const userId = getUserId(user);

    if (!userId) return;

    const silentRefresh = () => {
      loadOrders(userId).catch(() => {
        // ignore refresh errors, old data stays on screen
      });
    };

    const intervalId = setInterval(silentRefresh, REFRESH_MS);

    const handleVisible = () => {
      if (document.visibilityState === "visible") {
        silentRefresh();
      }
    };

    window.addEventListener("focus", silentRefresh);
    document.addEventListener("visibilitychange", handleVisible);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("focus", silentRefresh);
      document.removeEventListener("visibilitychange", handleVisible);
    };
  }, [user]);

  // ---------- CANCEL ----------

  // Open the custom cancellation modal
  const handleCancelOrder = (order) => {
    setCancelError("");
    setCancellationReasonInput("");
    setOrderToCancel(order);
  };

  // Send cancellation request to the backend
  const confirmCancelOrder = async () => {
    const orderId = orderToCancel?.id;

    if (!orderId) {
      setCancelError("Order ID not found. Please refresh and try again.");
      return;
    }

    setCancelError("");
    setCancelingOrderId(orderId);

    try {
      const response = await fetch(`${API}/orders/${orderId}/cancel`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cancellationReason: cancellationReasonInput.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not cancel this order.");
      }

      // Update the order immediately using the backend response
      setOrders((currentOrders) =>
        currentOrders.map((item) =>
          Number(item.id) === Number(orderId) ? data.order : item
        )
      );

      setOrderToCancel(null);
      setCancellationReasonInput("");
    } catch (err) {
      setCancelError(err.message || "Failed to cancel order.");
    } finally {
      setCancelingOrderId(null);
    }
  };

  const closeCancelModal = () => {
    if (cancelingOrderId !== null) return;

    setOrderToCancel(null);
    setCancellationReasonInput("");
  };

  // ---------- RETURN ----------

  // Open the return modal
  const handleReturnOrder = (order) => {
    setReturnError("");
    setReturnReasonInput("");
    setOrderToReturn(order);
  };

  // Send return request to the backend
  const confirmReturnOrder = async () => {
    const orderId = orderToReturn?.id;

    if (!orderId) {
      setReturnError("Order ID not found. Please refresh and try again.");
      return;
    }

    if (!returnReasonInput.trim()) {
      setReturnError("Please enter a reason for the return.");
      return;
    }

    setReturnError("");
    setReturningOrderId(orderId);

    try {
      const response = await fetch(`${API}/orders/${orderId}/return`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          returnReason: returnReasonInput.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not request a return.");
      }

      setOrders((currentOrders) =>
        currentOrders.map((item) =>
          Number(item.id) === Number(orderId) ? data.order : item
        )
      );

      setOrderToReturn(null);
      setReturnReasonInput("");
    } catch (err) {
      setReturnError(err.message || "Failed to request return.");
    } finally {
      setReturningOrderId(null);
    }
  };

  const closeReturnModal = () => {
    if (returningOrderId !== null) return;

    setOrderToReturn(null);
    setReturnReasonInput("");
  };

  const totalProducts = orders.reduce((total, order) => {
    const items = Array.isArray(order.items) ? order.items : [];

    return (
      total +
      items.reduce(
        (itemTotal, item) => itemTotal + Number(item.quantity || 1),
        0
      )
    );
  }, 0);

  const totalSpent = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  );

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    const parsedDate = new Date(date);

    return Number.isNaN(parsedDate.getTime())
      ? "Date unavailable"
      : parsedDate.toLocaleString();
  };

  const formatAddress = (address) => {
    if (!address) return "";

    if (typeof address === "string") {
      return address;
    }

    if (typeof address === "object") {
      return [
        address.name,
        address.phone,
        address.address,
        address.city,
        address.pincode,
      ]
        .filter(Boolean)
        .join(", ");
    }

    return String(address);
  };

  const styles = {
    page: {
      maxWidth: "1000px",
      margin: "30px auto",
      padding: "20px",
      color: "#222",
    },

    card: {
      background: "#fff",
      border: "1px solid #e5e5e5",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },

    heading: {
      marginTop: 0,
      marginBottom: "16px",
    },

    stats: {
      display: "flex",
      flexWrap: "wrap",
      gap: "15px",
    },

    stat: {
      flex: "1 1 180px",
      background: "#f7f7f7",
      borderRadius: "10px",
      padding: "16px",
    },

    order: {
      border: "1px solid #e8e8e8",
      borderRadius: "10px",
      padding: "16px",
      marginBottom: "15px",
    },

    item: {
      display: "flex",
      justifyContent: "space-between",
      gap: "12px",
      padding: "8px 0",
      borderBottom: "1px solid #eee",
    },

    status: {
      display: "inline-block",
      background: "#edf5ff",
      color: "#1756a9",
      padding: "5px 10px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "600",
    },

    cancelButton: {
      background: "#dc2626",
      color: "#fff",
      border: "none",
      borderRadius: "7px",
      padding: "10px 14px",
      cursor: "pointer",
      fontWeight: "600",
      marginTop: "10px",
    },

    returnButton: {
      background: "#7c3aed",
      color: "#fff",
      border: "none",
      borderRadius: "7px",
      padding: "10px 14px",
      cursor: "pointer",
      fontWeight: "600",
      marginTop: "10px",
    },

    disabledButton: {
      background: "#aaa",
      color: "#fff",
      border: "none",
      borderRadius: "7px",
      padding: "10px 14px",
      cursor: "not-allowed",
      fontWeight: "600",
      marginTop: "10px",
    },

    note: {
      fontSize: "13px",
      color: "#666",
      margin: "8px 0 0",
    },

    returnBox: {
      background: "#faf7ff",
      border: "1px solid #e4d9fb",
      borderRadius: "8px",
      padding: "12px",
      marginTop: "12px",
    },

    returnBadge: {
      display: "inline-block",
      padding: "4px 10px",
      borderRadius: "20px",
      fontSize: "13px",
      fontWeight: "600",
      marginLeft: "6px",
    },

    error: {
      background: "#fff0f0",
      color: "#a40000",
      padding: "12px",
      borderRadius: "8px",
      marginBottom: "12px",
    },

    modalOverlay: {
      position: "fixed",
      inset: 0,
      background: "rgba(0, 0, 0, 0.55)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      zIndex: 9999,
    },

    modal: {
      width: "100%",
      maxWidth: "420px",
      background: "#fff",
      borderRadius: "14px",
      padding: "24px",
      boxShadow: "0 10px 35px rgba(0,0,0,0.25)",
      color: "#222",
      boxSizing: "border-box",
    },

    modalTitle: {
      marginTop: 0,
      marginBottom: "10px",
    },

    modalTextarea: {
      width: "100%",
      minHeight: "100px",
      boxSizing: "border-box",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      fontSize: "14px",
      resize: "vertical",
      marginTop: "8px",
      fontFamily: "inherit",
    },

    modalActions: {
      display: "flex",
      justifyContent: "flex-end",
      flexWrap: "wrap",
      gap: "10px",
      marginTop: "18px",
    },

    secondaryButton: {
      background: "#f3f4f6",
      color: "#333",
      border: "1px solid #ddd",
      borderRadius: "7px",
      padding: "10px 15px",
      cursor: "pointer",
    },

    confirmButton: {
      background: "#dc2626",
      color: "#fff",
      border: "none",
      borderRadius: "7px",
      padding: "10px 15px",
      cursor: "pointer",
      fontWeight: "600",
    },

    confirmReturnButton: {
      background: "#7c3aed",
      color: "#fff",
      border: "none",
      borderRadius: "7px",
      padding: "10px 15px",
      cursor: "pointer",
      fontWeight: "600",
    },

    modalError: {
      background: "#fff0f0",
      color: "#a40000",
      padding: "10px",
      borderRadius: "7px",
      marginTop: "12px",
      fontSize: "14px",
    },
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <p>Loading your profile and purchase history...</p>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* User Profile */}
      <section style={styles.card}>
        <h2 style={styles.heading}>My Profile</h2>

        <p>
          <strong>Name:</strong> {user?.name || "Not available"}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {user?.gmail || user?.email || "Not available"}
        </p>

        <p>
          <strong>Phone:</strong> {user?.phone || "Not available"}
        </p>

        <p>
          <strong>Address:</strong> {user?.address || "Not available"}
        </p>
      </section>

      {/* Purchase Summary */}
      <section style={styles.card}>
        <h2 style={styles.heading}>Purchase Summary</h2>

        <div style={styles.stats}>
          <div style={styles.stat}>
            <h3>{orders.length}</h3>
            <p>Total Orders</p>
          </div>

          <div style={styles.stat}>
            <h3>{totalProducts}</h3>
            <p>Total Products Bought</p>
          </div>

          <div style={styles.stat}>
            <h3>₹{totalSpent.toFixed(2)}</h3>
            <p>Total Order Amount</p>
          </div>
        </div>
      </section>

      {/* Purchase History */}
      <section style={styles.card}>
        <h2 style={styles.heading}>My Purchase History</h2>

        {error && <p style={styles.error}>{error}</p>}
        {cancelError && !orderToCancel && (
          <p style={styles.error}>{cancelError}</p>
        )}

        {!error && orders.length === 0 && (
          <p>You have not placed any orders yet.</p>
        )}

        {orders.map((order) => {
          const orderId = order.id ?? order._id;

          // ----- Cancel rules -----
          const isActive =
            order.status !== "Delivered" && order.status !== "Cancelled";

          const canCancel =
            isActive && daysSince(order.createdAt) <= CANCEL_WINDOW_DAYS;

          const cancelWindowOver = isActive && !canCancel;

          const cancelDaysLeft = daysLeft(order.createdAt, CANCEL_WINDOW_DAYS);

          const isCancelling = Number(cancelingOrderId) === Number(order.id);

          // ----- Return rules -----
          const isDelivered = order.status === "Delivered";

          const returnBase = order.deliveredAt || order.createdAt;

          const canReturn =
            isDelivered &&
            !order.returnStatus &&
            daysSince(returnBase) <= RETURN_WINDOW_DAYS;

          const returnWindowOver =
            isDelivered && !order.returnStatus && !canReturn;

          const returnDaysLeft = daysLeft(returnBase, RETURN_WINDOW_DAYS);

          const isReturning = Number(returningOrderId) === Number(order.id);

          const returnColor =
            RETURN_COLORS[order.returnStatus] || RETURN_COLORS.Requested;

          return (
            <div key={orderId} style={styles.order}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div>
                  <strong>Order #{orderId || "N/A"}</strong>
                  <p>{formatDate(order.createdAt)}</p>
                </div>

                <span style={styles.status}>{order.status || "Placed"}</span>
              </div>

              <hr />

              {(Array.isArray(order.items) ? order.items : []).map(
                (item, index) => (
                  <div
                    key={item.product_id || item.id || index}
                    style={styles.item}
                  >
                    <span>
                      {item.name || item.title || "Product"}
                      {" × "}
                      {item.quantity || 1}
                    </span>

                    <strong>
                      ₹
                      {(
                        Number(item.price || 0) * Number(item.quantity || 1)
                      ).toFixed(2)}
                    </strong>
                  </div>
                )
              )}

              <p>
                <strong>Total: ₹{Number(order.total || 0).toFixed(2)}</strong>
              </p>

              {order.address && (
                <p>
                  <strong>Delivery Address:</strong>{" "}
                  {formatAddress(order.address)}
                </p>
              )}

              {order.deliveryMessage && (
                <p>
                  <strong>Delivery Update:</strong> {order.deliveryMessage}
                </p>
              )}

              {order.cancellationReason && (
                <p>
                  <strong>Cancellation Reason:</strong>{" "}
                  {order.cancellationReason}
                </p>
              )}

              {/* Cancel button (only within 5 days) */}
              {canCancel && (
                <>
                  <button
                    type="button"
                    style={
                      isCancelling ? styles.disabledButton : styles.cancelButton
                    }
                    disabled={isCancelling}
                    onClick={() => handleCancelOrder(order)}
                  >
                    {isCancelling ? "Cancelling..." : "Cancel Order"}
                  </button>

                  <p style={styles.note}>
                    {cancelDaysLeft} day{cancelDaysLeft === 1 ? "" : "s"} left
                    to cancel this order.
                  </p>
                </>
              )}

              {cancelWindowOver && (
                <p style={styles.note}>
                  Cancellation is not available. Orders can be cancelled only
                  within {CANCEL_WINDOW_DAYS} days of placing the order.
                </p>
              )}

              {/* Return is not available until the order is delivered */}
{isActive && (
  <>
    <button type="button" style={styles.disabledButton} disabled>
      Return Order
    </button>

    <p style={styles.note}>
      Return is available after delivery (within {RETURN_WINDOW_DAYS} days
      of delivery).
    </p>
  </>
)}
              {canReturn && (
                <>
                  <button
                    type="button"
                    style={
                      isReturning ? styles.disabledButton : styles.returnButton
                    }
                    disabled={isReturning}
                    onClick={() => handleReturnOrder(order)}
                  >
                    {isReturning ? "Sending..." : "Return Order"}
                  </button>

                  <p style={styles.note}>
                    {returnDaysLeft} day{returnDaysLeft === 1 ? "" : "s"} left
                    to return this order.
                  </p>
                </>
              )}

              {returnWindowOver && (
                <p style={styles.note}>
                  Return is not available. Returns are accepted only within{" "}
                  {RETURN_WINDOW_DAYS} days of delivery.
                </p>
              )}

              {/* Return status */}
              {order.returnStatus && (
                <div style={styles.returnBox}>
                  <strong>Return:</strong>
                  <span style={{ ...styles.returnBadge, ...returnColor }}>
                    {order.returnStatus}
                  </span>

                  {order.returnReason && (
                    <p style={{ margin: "8px 0 0" }}>
                      <strong>Reason:</strong> {order.returnReason}
                    </p>
                  )}

                  {order.returnRequestedAt && (
                    <p style={styles.note}>
                      Requested on {formatDate(order.returnRequestedAt)}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Custom Cancel Order Modal */}
      {orderToCancel && (
        <div
          style={styles.modalOverlay}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeCancelModal();
            }
          }}
        >
          <div
            style={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cancel-order-title"
          >
            <h2 id="cancel-order-title" style={styles.modalTitle}>
              Cancel Order #{orderToCancel.id}
            </h2>

            <p>Are you sure you want to cancel this order?</p>

            <label htmlFor="cancellation-reason">
              Reason for cancellation (optional)
            </label>

            <textarea
              id="cancellation-reason"
              style={styles.modalTextarea}
              placeholder="Tell us why you want to cancel..."
              value={cancellationReasonInput}
              onChange={(event) =>
                setCancellationReasonInput(event.target.value)
              }
            />

            {cancelError && <p style={styles.modalError}>{cancelError}</p>}

            <div style={styles.modalActions}>
              <button
                type="button"
                style={styles.secondaryButton}
                onClick={closeCancelModal}
                disabled={cancelingOrderId !== null}
              >
                Keep Order
              </button>

              <button
                type="button"
                style={styles.confirmButton}
                onClick={confirmCancelOrder}
                disabled={cancelingOrderId !== null}
              >
                {cancelingOrderId !== null ? "Cancelling..." : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Return Order Modal */}
      {orderToReturn && (
        <div
          style={styles.modalOverlay}
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              closeReturnModal();
            }
          }}
        >
          <div
            style={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="return-order-title"
          >
            <h2 id="return-order-title" style={styles.modalTitle}>
              Return Order #{orderToReturn.id}
            </h2>

            <p>Tell us why you want to return this order.</p>

            <label htmlFor="return-reason">Reason for return</label>

            <textarea
              id="return-reason"
              style={styles.modalTextarea}
              placeholder="Example: Size does not fit, product damaged..."
              value={returnReasonInput}
              onChange={(event) => setReturnReasonInput(event.target.value)}
            />

            {returnError && <p style={styles.modalError}>{returnError}</p>}

            <div style={styles.modalActions}>
              <button
                type="button"
                style={styles.secondaryButton}
                onClick={closeReturnModal}
                disabled={returningOrderId !== null}
              >
                Close
              </button>

              <button
                type="button"
                style={styles.confirmReturnButton}
                onClick={confirmReturnOrder}
                disabled={returningOrderId !== null}
              >
                {returningOrderId !== null ? "Sending..." : "Request Return"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
