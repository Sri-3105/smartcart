import { useEffect, useState } from "react";
import DressUploadeForm from "./DressUploadeForm";
import axios from "axios";

export default function CartDesign({
  
  products,
  fetchData,
  addToWishlist,
  addToCart,
}) {
  const [message, setMessage] = useState("");

  // Wishlist Message
  const handleAddToWishlist = async (item) => {
    await addToWishlist(item);

    setMessage("❤️ Added To Wishlist");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  // Cart Message
  const handleAddToCart = async (item) => {
    await addToCart(item);

    setMessage("✅ Added To Cart");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <>
      <div className="collection">
        

        {message && (
          <div className="cart-message">
            {message}
          </div>
        )}

        <div className="cards">
          {products.map((item) => (
            <div className="card" key={item.id}>
              <img
                src={item.image}
                alt={item.name}
              />

              <h3>{item.name}</h3>

              <p>₹{item.price}</p>

              <h4
                style={{
                  backgroundColor:
                    item.stock > 0 ? "green" : "red",
                }}
              >
                {item.stock > 0
                  ? `Stock : ${item.stock}`
                  : "Out Of Stock"}
              </h4>

              <button
                onClick={() => handleAddToWishlist(item)}
              >
                ❤️
              </button>

              <br />
              <br />

              <button
                onClick={() => handleAddToCart(item)}
                disabled={item.stock === 0}
              >
                Add To Cart
              </button>

              
            </div>
          ))}
        </div>
      </div>

      <DressUploadeForm fetchData={fetchData} />
    </>
  );
}
