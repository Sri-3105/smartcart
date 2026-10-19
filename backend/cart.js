import { Router } from "express";
import { carts, users, products } from "./data.js";

const cartRouter = Router();

// GET CART
cartRouter.get("/cart/:userId", (req, res) => {
  const { userId } = req.params;

  const cart = carts.find((c) => c.user_id == userId);

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  const user = users.find((u) => u.id == userId);

  const productList = cart.items
    .map((item) => {
      const product = products.find(
        (p) => p.id == item.product_id
      );

      // Product deleted or not found
      if (!product) {
        return null;
      }

      return {
        id: product.id,
        name: product.name,
        image: product.image,
        price: Number(product.price) || 0,
        stock: Number(product.stock) || 0,
        quantity: Number(item.quantity) || 1,
      };
    })
    .filter((item) => item !== null);

  res.json({
    message: "Cart Found",
    data: {
      id: cart.id,
      user,
      productList,
    },
  });
});

// ADD TO CART
cartRouter.post("/cart", (req, res) => {
  const { user_id, items } = req.body;

  if (!user_id || !Array.isArray(items)) {
    return res.status(400).json({
      message: "Invalid cart data",
    });
  }

  const user = users.find((u) => u.id == user_id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  let cart = carts.find((c) => c.user_id == user_id);

  if (!cart) {
    cart = {
      id: carts.length + 1,
      user_id,
      items: [],
    };

    carts.push(cart);
  }

  items.forEach((newItem) => {
    const product = products.find(
      (p) => p.id == newItem.product_id
    );

    if (!product) return;

    const quantity = Number(newItem.quantity) || 1;

    const existing = cart.items.find(
      (i) => i.product_id == newItem.product_id
    );

    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.items.push({
        product_id: newItem.product_id,
        quantity,
      });
    }
  });

  res.status(200).json({
    message: "Cart Updated Successfully",
    data: cart,
  });
});

// DELETE PRODUCT FROM CART
cartRouter.delete("/cart/:userId/:productId", (req, res) => {
  const { userId, productId } = req.params;

  const cart = carts.find(
    (c) => c.user_id == userId
  );

  if (!cart) {
    return res.status(404).json({
      message: "Cart not found",
    });
  }

  cart.items = cart.items.filter(
    (item) => item.product_id != productId
  );

  res.json({
    message: "Item Removed",
    data: cart,
  });
});

export default cartRouter;