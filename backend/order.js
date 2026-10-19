import { Router } from "express";
import mongoose from "mongoose";

const orderRouter = Router();

const allowedStatuses = [
  "Placed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

// Delivery in 3 days (any weekday) or Saturday / Sunday if customer chooses
const allowedDeliveryDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Return request status (managed by admin)
const allowedReturnStatuses = ["Approved", "Rejected", "Refunded"];

// ---- Rules (change these numbers if needed) ----
const CANCEL_WINDOW_DAYS = 5; // cancel allowed within 5 days of placing the order
const RETURN_WINDOW_DAYS = 5; // return allowed within 5 days of delivery

const DAY_MS = 24 * 60 * 60 * 1000;

const daysSince = (date) => (Date.now() - new Date(date).getTime()) / DAY_MS;

// MongoDB Order model
const orderSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    user_id: {
      type: Number,
      required: true,
    },
    items: {
      type: [mongoose.Schema.Types.Mixed],
      required: true,
    },
    items_total: {
      type: Number,
      required: true,
    },
    delivery_charge: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    payment_method: {
      type: String,
      default: "cod",
    },
    delivery_day: {
      type: String,
      required: true,
    },
    delivery_date: {
      type: String,
      required: true,
    },
    address: {
      type: mongoose.Schema.Types.Mixed,
      default: "",
    },
    status: {
      type: String,
      default: "Placed",
    },
    deliveryMessage: {
      type: String,
      default: "",
    },
    cancellationReason: {
      type: String,
      default: "",
    },

    // Set when admin marks the order as Delivered
    deliveredAt: {
      type: Date,
      default: null,
    },

    // Return request details
    // returnStatus: "" (no return) | "Requested" | "Approved" | "Rejected" | "Refunded"
    returnStatus: {
      type: String,
      default: "",
    },
    returnReason: {
      type: String,
      default: "",
    },
    returnRequestedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    collection: "orders",
  }
);

const Order = mongoose.models.Order ||
  mongoose.model("Order", orderSchema);

// Get all orders — Admin dashboard
orderRouter.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    return res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

// Get orders for one user
orderRouter.get("/orders/user/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    if (!Number.isFinite(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const userOrders = await Order.find({ user_id: userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(userOrders);
  } catch (error) {
    console.error("Get user orders error:", error);
    return res.status(500).json({
      message: "Failed to fetch user orders",
    });
  }
});

// Create order — delivery is in 3 days, or Saturday / Sunday if the customer chooses.
orderRouter.post("/orders", async (req, res) => {
  try {
    const {
      user_id,
      items,
      total,
      items_total,
      delivery_charge,
      delivery_day,
      delivery_date,
      address,
      payment_method,
    } = req.body;

    if (!user_id || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "User and items are required",
      });
    }

    const numericUserId = Number(user_id);
    const numericTotal = Number(total);
    const numericItemsTotal = Number(items_total);
    const numericDeliveryCharge = Number(delivery_charge);

    if (!Number.isFinite(numericUserId) || numericUserId <= 0) {
      return res.status(400).json({
        message: "Please provide a valid user ID",
      });
    }

    if (!Number.isFinite(numericTotal) || numericTotal < 0) {
      return res.status(400).json({
        message: "Please provide a valid order total",
      });
    }

    if (
      !Number.isFinite(numericItemsTotal) ||
      numericItemsTotal < 0
    ) {
      return res.status(400).json({
        message: "Please provide a valid items total",
      });
    }

    if (
      !Number.isFinite(numericDeliveryCharge) ||
      numericDeliveryCharge < 0
    ) {
      return res.status(400).json({
        message: "Please provide a valid delivery charge",
      });
    }

    if (!allowedDeliveryDays.includes(delivery_day)) {
      return res.status(400).json({
        message: "Please select a valid delivery day",
      });
    }

    if (!delivery_date) {
      return res.status(400).json({
        message: "Please select a delivery date",
      });
    }

    // Generate the next numeric order ID for the current demo app
    const latestOrder = await Order.findOne().sort({ id: -1 });
    const nextId = latestOrder ? latestOrder.id + 1 : 1;

    const newOrder = await Order.create({
      id: nextId,
      user_id: numericUserId,
      items,
      items_total: numericItemsTotal,
      delivery_charge: numericDeliveryCharge,
      total: numericTotal,
      payment_method: payment_method || "cod",
      delivery_day,
      delivery_date,
      address: address || "",
      status: "Placed",
      deliveryMessage: `Your order has been placed. Scheduled delivery: ${delivery_day}, ${delivery_date}.`,
      cancellationReason: "",
    });

    return res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({
      message: "Failed to place order",
    });
  }
});

// Cancel order — only within CANCEL_WINDOW_DAYS days of placing it
orderRouter.patch("/orders/:orderId/cancel", async (req, res) => {
  try {
    const orderId = Number(req.params.orderId);
    const { cancellationReason } = req.body;

    const order = await Order.findOne({ id: orderId });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status === "Delivered") {
      return res.status(400).json({
        message: "Delivered orders cannot be cancelled. You can request a return instead.",
      });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({
        message: "Order is already cancelled",
      });
    }

    if (daysSince(order.createdAt) > CANCEL_WINDOW_DAYS) {
      return res.status(400).json({
        message: `Orders can be cancelled only within ${CANCEL_WINDOW_DAYS} days of placing the order.`,
      });
    }

    order.status = "Cancelled";
    order.cancellationReason =
      cancellationReason || "Cancelled by customer";
    order.deliveryMessage = "This order has been cancelled.";

    await order.save();

    return res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error("Cancel order error:", error);
    return res.status(500).json({
      message: "Failed to cancel order",
    });
  }
});

// Request a return — customer. Only Delivered orders, within RETURN_WINDOW_DAYS days of delivery
orderRouter.patch("/orders/:orderId/return", async (req, res) => {
  try {
    const orderId = Number(req.params.orderId);
    const returnReason = String(req.body.returnReason || "").trim();

    const order = await Order.findOne({ id: orderId });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status !== "Delivered") {
      return res.status(400).json({
        message: "Only delivered orders can be returned",
      });
    }

    if (order.returnStatus) {
      return res.status(400).json({
        message: "A return has already been requested for this order",
      });
    }

    if (!returnReason) {
      return res.status(400).json({
        message: "Please enter a reason for the return",
      });
    }

    // Older orders may not have deliveredAt, so use the order date instead
    const deliveredOn = order.deliveredAt || order.createdAt;

    if (daysSince(deliveredOn) > RETURN_WINDOW_DAYS) {
      return res.status(400).json({
        message: `Returns are accepted only within ${RETURN_WINDOW_DAYS} days of delivery.`,
      });
    }

    order.returnStatus = "Requested";
    order.returnReason = returnReason;
    order.returnRequestedAt = new Date();
    order.deliveryMessage = "Return requested. Waiting for admin approval.";

    await order.save();

    return res.status(200).json({
      message: "Return request sent successfully",
      order,
    });
  } catch (error) {
    console.error("Return order error:", error);
    return res.status(500).json({
      message: "Failed to request return",
    });
  }
});

// Update return status — Admin (Approved / Rejected / Refunded)
orderRouter.patch("/orders/:orderId/return-status", async (req, res) => {
  try {
    const orderId = Number(req.params.orderId);
    const { returnStatus } = req.body;

    const order = await Order.findOne({ id: orderId });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (!order.returnStatus) {
      return res.status(400).json({
        message: "No return request for this order",
      });
    }

    if (!allowedReturnStatuses.includes(returnStatus)) {
      return res.status(400).json({
        message: "Invalid return status",
        allowedReturnStatuses,
      });
    }

    order.returnStatus = returnStatus;
    order.deliveryMessage = `Return ${returnStatus.toLowerCase()}.`;

    await order.save();

    return res.status(200).json({
      message: "Return status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update return status error:", error);
    return res.status(500).json({
      message: "Failed to update return status",
    });
  }
});

// Update order status and delivery message — Admin
orderRouter.patch("/orders/:orderId/status", async (req, res) => {
  try {
    const orderId = Number(req.params.orderId);
    const { status, deliveryMessage } = req.body;

    const order = await Order.findOne({ id: orderId });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
        allowedStatuses,
      });
    }

    if (order.status === "Cancelled") {
      return res.status(400).json({
        message: "Cancelled orders cannot be updated",
      });
    }

    order.status = status;
    order.deliveryMessage =
      typeof deliveryMessage === "string"
        ? deliveryMessage
        : `Order status: ${status}`;

    // Remember when the order was delivered (used for the return window)
    if (status === "Delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }

    await order.save();

    return res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({
      message: "Failed to update order status",
    });
  }
});

export default orderRouter;