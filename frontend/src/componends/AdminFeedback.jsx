import { useEffect, useState } from "react";

const API = "http://localhost:3000";
const STATUSES = ["Open", "In Progress", "Resolved"];

function AdminFeedback() {
  const [list, setList] = useState([]);
  const [replies, setReplies] = useState({});
  const [error, setError] = useState("");

  const loadAll = async () => {
    try {
      const res = await fetch(`${API}/feedback`);
      const data = await res.json();
      setList(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Feedback load aagala. Backend run aagudha paarunga.");
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const changeStatus = async (id, status) => {
    await fetch(`${API}/feedback/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadAll();
  };

  const sendReply = async (id) => {
    const text = (replies[id] || "").trim();
    if (!text) return;
    await fetch(`${API}/feedback/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminReply: text, status: "Resolved" }),
    });
    setReplies({ ...replies, [id]: "" });
    loadAll();
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;
    await fetch(`${API}/feedback/${id}`, { method: "DELETE" });
    loadAll();
  };

  return (
    <div className="fb-page">
      <h2>User Feedback ({list.length})</h2>
      {error && <p className="fb-error">{error}</p>}
      {list.length === 0 && !error && <p>No feedback yet</p>}

      {[...list].reverse().map((item) => (
        <div key={item.id} className="fb-card">
          <div className="fb-card-head">
            <b>{item.type}</b>
            <select
              value={item.status}
              onChange={(e) => changeStatus(item.id, e.target.value)}
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <p>{item.name} ({item.email})</p>
          {item.subject && <p><b>{item.subject}</b></p>}
          {item.orderId && <p>Order: {item.orderId}</p>}
          {item.rating && <p>Rating: {item.rating}/5</p>}
          <p>{item.message}</p>

          {item.adminReply && (
            <div className="fb-reply">
              <b>Your reply:</b> {item.adminReply}
            </div>
          )}

          <textarea
            placeholder="Type reply..."
            value={replies[item.id] || ""}
            onChange={(e) =>
              setReplies({ ...replies, [item.id]: e.target.value })
            }
          />
          <div className="fb-actions">
            <button onClick={() => sendReply(item.id)}>Send Reply</button>
            <button className="fb-delete" onClick={() => remove(item.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminFeedback;