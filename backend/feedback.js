import { Router } from "express";

const feedbackRouter = Router();

const TYPES = ["Feedback", "Report a Problem", "Order Issue", "Suggestion"];
const STATUSES = ["Open", "In Progress", "Resolved"];

// stored in memory (same as products) — resets when backend restarts
let feedbackList = [];

// USER: send feedback / report
feedbackRouter.post("/feedback", (req, res) => {
  const { user_id, name, email, type, subject, message, rating, orderId } =
    req.body;

  if (!user_id) {
    return res.status(400).json({ message: "Please login first" });
  }

  if (!TYPES.includes(type)) {
    return res.status(400).json({ message: "Please select a valid type" });
  }

  if (!message || !String(message).trim()) {
    return res.status(400).json({ message: "Message is required" });
  }

  const ratingValue = Number(rating);

  const newFeedback = {
    id: (feedbackList.at(-1)?.id || 0) + 1,
    user_id,
    name: name || "",
    email: email || "",
    type,
    subject: String(subject || "").trim(),
    message: String(message).trim(),
    rating:
      type === "Feedback" && ratingValue >= 1 && ratingValue <= 5
        ? ratingValue
        : null,
    orderId: orderId ? String(orderId).trim() : "",
    status: "Open",
    adminReply: "",
    createdAt: new Date().toISOString(),
    repliedAt: null,
  };

  feedbackList.push(newFeedback);

  res.status(201).json({
    message: "Thank you! Your message has been sent to the admin.",
    feedback: newFeedback,
  });
});

// ADMIN: get all
feedbackRouter.get("/feedback", (req, res) => {
  res.status(200).json(feedbackList);
});

// USER: get only my messages (to see admin reply)
feedbackRouter.get("/feedback/user/:userId", (req, res) => {
  const { userId } = req.params;

  const mine = feedbackList.filter((item) => item.user_id == userId);

  res.status(200).json(mine);
});

// ADMIN: change status / reply
feedbackRouter.patch("/feedback/:id", (req, res) => {
  const { id } = req.params;
  const { status, adminReply } = req.body;

  const index = feedbackList.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.status(404).json({ message: "Feedback not found" });
  }

  if (status !== undefined && !STATUSES.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const current = feedbackList[index];

  const updated = {
    ...current,
    status: status ?? current.status,
  };

  if (adminReply !== undefined) {
    updated.adminReply = String(adminReply).trim();
    updated.repliedAt = updated.adminReply ? new Date().toISOString() : null;
  }

  feedbackList[index] = updated;

  res.status(200).json({
    message: "Feedback updated",
    feedback: updated,
  });
});

// ADMIN: delete
feedbackRouter.delete("/feedback/:id", (req, res) => {
  const { id } = req.params;

  const index = feedbackList.findIndex((item) => item.id == id);

  if (index === -1) {
    return res.status(404).json({ message: "Feedback not found" });
  }

  const [removed] = feedbackList.splice(index, 1);

  res.status(200).json({ message: "Feedback deleted", feedback: removed });
});

export default feedbackRouter;