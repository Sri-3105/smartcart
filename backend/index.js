import express from "express";
import mongoose from "mongoose";
import productRouter from "./product.js";
import userRouter from "./user.js";
import cartRouter from "./cart.js";
import wishlistRouter from "./wishlist.js";
import orderRouter from "./order.js";
import cors from "cors";
import feedbackRouter from "./feedback.js";
import supplierRouter from "./supplier.js";
const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Routes
app.use(productRouter);
app.use(userRouter);
app.use(cartRouter);
app.use(wishlistRouter);
app.use(orderRouter);
app.use(feedbackRouter);
app.use(supplierRouter);
// Connect MongoDB, then start server
mongoose
  .connect("mongodb://127.0.0.1:27017/smartcart")
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });


  