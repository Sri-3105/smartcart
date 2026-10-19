import { useEffect, useState } from "react";

const API = "http://localhost:3000";
const TYPES = ["Feedback", "Report a Problem", "Order Issue", "Suggestion"];

const EMPTY_FORM = {
  type: "Feedback",
  subject: "",
  message: "",
  rating: 5,
  orderId: "",
};

function FeedbackForm() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id || user?._id || user?.user_id;

  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("");
  const [mine, setMine] = useState([]);

  const loadMine = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${API}/feedback/user/${userId}`);
      const data = await res.json();
      setMine(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadMine();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setStatus("Please login first");
      return;
    }

    try {
      const res = await fetch(`${API}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          name: user?.name || "",
          email: user?.gmail || "",
          ...form,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.message || "Something went wrong");
        return;
      }

      setStatus(data.message);
      setForm(EMPTY_FORM);
      loadMine();
    } catch (err) {
      console.error(err);
      setStatus("Server error. Backend run aagudha paarunga.");
    }
  };

  return (
    <div className="fb-page">
      <form className="fb-form" onSubmit={handleSubmit}>
        <h2>Send Feedback</h2>

        <select name="type" value={form.type} onChange={handleChange}>
          {TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
        />

        {form.type === "Order Issue" && (
          <input
            name="orderId"
            placeholder="Order ID"
            value={form.orderId}
            onChange={handleChange}
          />
        )}

        {form.type === "Feedback" && (
          <select name="rating" value={form.rating} onChange={handleChange}>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Average</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Very Bad</option>
          </select>
        )}

        <textarea
          name="message"
          placeholder="Your message"
          value={form.message}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit</button>
        {status && <p className="fb-status">{status}</p>}
      </form>

      <div className="fb-list">
        <h3>My Messages</h3>
        {mine.length === 0 && <p>No messages yet</p>}
        {mine.map((item) => (
          <div key={item.id} className="fb-card">
            <div className="fb-card-head">
              <b>{item.type}</b>
              <span className={`fb-badge fb-${item.status.replace(" ", "")}`}>
                {item.status}
              </span>
            </div>
            {item.subject && (
              <p>
                <b>{item.subject}</b>
              </p>
            )}
            <p>{item.message}</p>
            {item.adminReply ? (
              <div className="fb-reply">
                <b>Admin Reply:</b> {item.adminReply}
              </div>
            ) : (
              <p className="fb-wait">Admin reply waiting...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedbackForm;