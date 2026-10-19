import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API = "http://localhost:3000";
const MAX_LENGTH = 500;

const TYPES = [
  { value: "Feedback", icon: "💬", hint: "Tell us what you think" },
  { value: "Report a Problem", icon: "🐞", hint: "Something is not working" },
  { value: "Order Issue", icon: "📦", hint: "Problem with an order" },
  { value: "Suggestion", icon: "💡", hint: "Ideas to improve SmartCart" },
];

const getSavedUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

// Text shown in the order dropdown
// Example: "#10 — Printed Summer Dress — 3 Oct 2026"
const getOrderLabel = (order) => {
  const items = Array.isArray(order.items) ? order.items : [];
  const firstName = items[0]?.name || items[0]?.title || "Order";
  const extra = items.length > 1 ? ` +${items.length - 1} more` : "";

  const date = order.createdAt
    ? new Date(order.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";

  return `#${order.id} — ${firstName}${extra}${date ? ` — ${date}` : ""}`;
};

const HelpFeedback = () => {
  const user = getSavedUser();
  const userId = user?.id ?? user?.user_id ?? user?.userId;
  const isAdmin = user?.role === "admin";

  const [type, setType] = useState("Feedback");
  const [subject, setSubject] = useState("");
  const [orderId, setOrderId] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const [alert, setAlert] = useState({ kind: "", text: "" });
  const [sending, setSending] = useState(false);

  const [myMessages, setMyMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // This user's orders (for the "Order Issue" dropdown)
  const [myOrders, setMyOrders] = useState([]);

  // Load this user's earlier messages (to show admin replies)
  const loadMessages = useCallback(async () => {
    if (!userId || isAdmin) return;

    try {
      setLoadingMessages(true);

      const response = await fetch(`${API}/feedback/user/${userId}`);
      const data = await response.json();

      setMyMessages(Array.isArray(data) ? [...data].reverse() : []);
    } catch (error) {
      console.error("Unable to load messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  }, [userId, isAdmin]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  // Load this user's orders
  useEffect(() => {
    if (!userId || isAdmin) return;

    const loadOrders = async () => {
      try {
        const response = await fetch(`${API}/orders/user/${userId}`);
        const data = await response.json();

        setMyOrders(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Unable to load orders:", error);
      }
    };

    loadOrders();
  }, [userId, isAdmin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ kind: "", text: "" });

    if (!message.trim()) {
      setAlert({ kind: "error", text: "Please write your message." });
      return;
    }

    try {
      setSending(true);

      const response = await fetch(`${API}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          name: user?.name || "",
          email: user?.gmail || user?.email || "",
          type,
          subject: subject.trim(),
          message: message.trim(),
          rating: type === "Feedback" ? rating : 0,
          orderId: type === "Order Issue" ? String(orderId).trim() : "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setAlert({
          kind: "error",
          text: data.message || "Could not send your message.",
        });
        return;
      }

      setAlert({
        kind: "success",
        text: data.message || "Your message has been sent to the admin.",
      });

      setSubject("");
      setOrderId("");
      setRating(0);
      setMessage("");

      loadMessages();
    } catch (error) {
      console.error(error);
      setAlert({
        kind: "error",
        text: "Server error. Please check that the backend is running.",
      });
    } finally {
      setSending(false);
    }
  };

  // ---------- Not logged in ----------
  if (!user) {
    return (
      <div className="contact-page">
        <div className="contact-card contact-locked">
          <h2>Please login first</h2>
          <p>Login to send feedback or report a problem to our team.</p>
          <Link to="/login" className="contact-submit">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // ---------- Admin ----------
  if (isAdmin) {
    return (
      <div className="contact-page">
        <div className="contact-card contact-locked">
          <h2>You are logged in as Admin</h2>
          <p>
            Feedback and reports sent by customers appear in your dashboard.
          </p>
          <Link to="/admin" className="contact-submit">
            Open Admin Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const selectedType = TYPES.find((item) => item.value === type);

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Help &amp; Feedback</h1>
        <p>
          Found a problem or want to share your thoughts? Send it straight to
          our admin team.
        </p>
      </div>

      <div className="contact-layout">
        {/* ========== SEND MESSAGE ========== */}
        <form className="contact-card" onSubmit={handleSubmit}>
          <h2>Send a message</h2>

          <p className="contact-from">
            Sending as <strong>{user.name || "User"}</strong>
            {(user.gmail || user.email) && (
              <> ({user.gmail || user.email})</>
            )}
          </p>

          <label className="contact-label">What is this about?</label>

          <div className="type-chips">
            {TYPES.map((item) => (
              <button
                key={item.value}
                type="button"
                className={`type-chip ${type === item.value ? "active" : ""}`}
                onClick={() => setType(item.value)}
              >
                <span className="type-icon">{item.icon}</span>
                <span>{item.value}</span>
              </button>
            ))}
          </div>

          <p className="type-hint">{selectedType?.hint}</p>

          {type === "Feedback" && (
            <>
              <label className="contact-label">Your rating (optional)</label>

              <div className="star-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`star ${star <= rating ? "on" : ""}`}
                    onClick={() => setRating(star === rating ? 0 : star)}
                    aria-label={`${star} star`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </>
          )}

          {type === "Order Issue" && (
            <>
              <label className="contact-label" htmlFor="orderId">
                Select your order (optional)
              </label>

              <select
                id="orderId"
                className="contact-input"
                style={{ colorScheme: "dark" }}
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              >
                <option value="">
                  {myOrders.length === 0
                    ? "You have no orders yet"
                    : "Select an order"}
                </option>

                {myOrders.map((order) => (
                  <option key={order.id} value={order.id}>
                    {getOrderLabel(order)}
                  </option>
                ))}
              </select>
            </>
          )}

          <label className="contact-label" htmlFor="subject">
            Subject (optional)
          </label>

          <input
            id="subject"
            className="contact-input"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Short title"
            maxLength={80}
          />

          <label className="contact-label" htmlFor="message">
            Message
          </label>

          <textarea
            id="message"
            className="contact-input contact-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value.slice(0, MAX_LENGTH))}
            placeholder="Write your message here..."
          />

          <div className="char-count">
            {message.length} / {MAX_LENGTH}
          </div>

          {alert.text && (
            <div className={`contact-alert ${alert.kind}`}>{alert.text}</div>
          )}

          <button
            type="submit"
            className="contact-submit"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send to Admin"}
          </button>
        </form>

        {/* ========== MY MESSAGES ========== */}
        <div className="contact-card">
          <h2>My messages ({myMessages.length})</h2>

          {loadingMessages ? (
            <p className="empty-messages">Loading...</p>
          ) : myMessages.length === 0 ? (
            <p className="empty-messages">
              You have not sent any message yet.
            </p>
          ) : (
            <div className="my-messages">
              {myMessages.map((item) => (
                <article className="my-message" key={item.id}>
                  <div className="my-message-top">
                    <span className="type-badge">{item.type}</span>

                    <span
                      className={`status-badge status-${item.status
                        .replace(/\s+/g, "-")
                        .toLowerCase()}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {item.subject && <h3>{item.subject}</h3>}

                  {item.rating ? (
                    <div className="my-rating">
                      {"★".repeat(item.rating)}
                      {"☆".repeat(5 - item.rating)}
                    </div>
                  ) : null}

                  <p className="my-message-text">{item.message}</p>

                  {item.orderId && (
                    <small className="my-message-meta">
                      Order #{item.orderId}
                    </small>
                  )}

                  <small className="my-message-meta">
                    {formatDate(item.createdAt)}
                  </small>

                  {item.adminReply ? (
                    <div className="admin-reply">
                      <strong>Admin reply</strong>
                      <p>{item.adminReply}</p>
                      <small>{formatDate(item.repliedAt)}</small>
                    </div>
                  ) : (
                    <div className="admin-reply waiting">
                      Waiting for admin reply...
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpFeedback;