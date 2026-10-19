import { Router } from "express";
import { products } from "./data.js";

const productRouter = Router();

let productList = products;

// GET ALL PRODUCTS
productRouter.get("/product", (req, res) => {
  res.status(200).json(productList);
});

// GET SINGLE PRODUCT
productRouter.get("/product/:productId", (req, res) => {
  const { productId } = req.params;

  const product = productList.find(
    (item) => item.id == productId
  );

  if (product) {
    res.status(200).json({
      message: "Product found",
      product,
    });
  } else {
    res.status(404).json({
      message: "Product not found",
    });
  }
});

// ADD PRODUCT
productRouter.post("/product", (req, res) => {
  const data = req.body;

  const lastId = productList.at(-1)?.id || 0;

  const newProduct = {
    id: lastId + 1,
    ...data,
  };

  productList.push(newProduct);

  res.status(201).json({
    message: "Product created",
    product: newProduct,
  });
});

// UPDATE PRODUCT
productRouter.patch("/product/:productId", (req, res) => {
  const { productId } = req.params;
  const data = req.body;

  const index = productList.findIndex(
    (item) => item.id == productId
  );

  if (index !== -1) {
    productList[index] = {
      ...productList[index],
      ...data,
    };

    res.status(200).json({
      message: "Product updated",
      product: productList[index],
    });
  } else {
    res.status(404).json({
      message: "Product not found",
    });
  }
});

// DELETE PRODUCT
productRouter.delete("/product/:productId", (req, res) => {
  const { productId } = req.params;

  const index = productList.findIndex(
    (item) => item.id == productId
  );

  if (index !== -1) {
    const deletedProduct = productList[index];

    // Keep the shared products array connected
    productList.splice(index, 1);

    res.status(200).json({
      message: "Product deleted",
      product: deletedProduct,
    });
  } else {
    res.status(404).json({
      message: "Product not found",
    });
  }
});

export default productRouter;