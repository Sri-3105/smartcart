import { useState } from "react";

function DressUploadeForm({ fetchData }) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categoryOptions = {
    women: ["dresses", "sarees", "tops", "footwear"],
    men: ["shirts", "pants", "tshirts", "footwear"],
    kids: ["boys", "girls"],
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setSubCategory("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setIsError(false);

    if (!category || !subCategory) {
      setMessage("Please select category and subcategory.");
      setIsError(true);
      return;
    }

    const newItem = {
      image: image.trim(),
      name: name.trim(),
      stock: Number(stock),
      price: Number(amount),
      category,
      subCategory,
    };

    try {
      setIsLoading(true);

      const response = await fetch("http://localhost:3000/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to add product.");
        setIsError(true);
        return;
      }

      setMessage("Product Added Successfully ✅");
      setIsError(false);

      setImage("");
      setName("");
      setStock("");
      setAmount("");
      setCategory("");
      setSubCategory("");

      if (fetchData) {
  try {
    await fetchData();
  } catch (error) {
    console.error("Refresh product list error:", error);
  }
}
    } catch (err) {
      console.error("Product upload error:", err);
      setMessage("Something went wrong. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Upload Product</h2>

      <form onSubmit={handleSubmit}>
        {/* Category */}
        <select
          value={category}
          onChange={handleCategoryChange}
          required
        >
          <option value="">Select Category</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kids">Kids</option>
        </select>

        {/* Subcategory */}
        <select
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          required
          disabled={!category}
        >
          <option value="">Select Subcategory</option>

          {(categoryOptions[category] || []).map((item) => (
            <option key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          ))}
        </select>

        {/* Image URL */}
        <input
          type="url"
          placeholder="Enter Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        {/* Image Preview */}
        {image && (
          <img
            src={image}
            alt="Product Preview"
            width="200"
            height="200"
            style={{ objectFit: "contain" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
            onLoad={(e) => {
              e.currentTarget.style.display = "block";
            }}
          />
        )}

        {/* Product Name */}
        <input
          type="text"
          placeholder="Enter Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Stock */}
        <input
          type="number"
          placeholder="Enter Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          min="0"
          required
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Enter Price"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="1"
          required
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Add Product"}
        </button>
      </form>

      {message && (
        <p style={{ color: isError ? "red" : "green" }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default DressUploadeForm;