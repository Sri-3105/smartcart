import { Router } from "express";
import { wishlists, users, products } from "./data.js";

const wishlistRouter = Router();

// GET Wishlist
wishlistRouter.get("/wishlist/:userId", (req, res) => {
  const { userId } = req.params;

  const wishlist = wishlists.find(
    (item) => item.user_id == userId
  );

  if (!wishlist) {
    return res.json([]);
  }

  const productList = wishlist.items.map((item) => {
    const product = products.find(
      (p) => p.id == item.product_id
    );

    return {
      id: product.id,
      name: product.name,
      image: product.image,
      price: product.price,
    };
  });

  res.json(productList);
});

// POST Wishlist
wishlistRouter.post("/wishlist", (req, res) => {
  const { user_id, product_id } = req.body;

  let wishlist = wishlists.find(
    (item) => item.user_id == user_id
  );

  if (!wishlist) {
    wishlist = {
      id: wishlists.length + 1,
      user_id,
      items: [],
    };

    wishlists.push(wishlist);
  }

  const exists = wishlist.items.find(
    (item) => item.product_id == product_id
  );

  if (!exists) {
    wishlist.items.push({ product_id });
  }

  res.json({
    message: "Wishlist Updated",
    data: wishlist,
  });
});

// DELETE Wishlist
wishlistRouter.delete("/wishlist/:userId/:productId", (req, res) => {
  const { userId, productId } = req.params;

  const wishlist = wishlists.find(
    (item) => item.user_id == userId
  );

  if (!wishlist) {
    return res.status(404).json({
      message: "Wishlist not found",
    });
  }

  wishlist.items = wishlist.items.filter(
    (item) => item.product_id != productId
  );

  res.json({
    message: "Removed Successfully",
  });
});

export default wishlistRouter;