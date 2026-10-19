import { useEffect, useState } from "react";
import axios from "axios";
import Offers from "../componends/Offers";

const DISCOUNT_STORAGE_KEY = "smartcartDiscountPercent";

const spinRewards = [
  "5% OFF",
  "10% OFF",
  "Free Delivery",
  "Try Again",
  "15% OFF",
  "5% OFF",
];

export default function Home({
  cart,
  setCart,
  wishlist,
  setWishlist,
}) {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
  const [loading, setLoading] = useState(true);

  // Spin Wheel state
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState("");

  // ================= USER =================

  const getUser = () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  };

  // ================= QUIZ =================

  const handleQuizComplete = () => {
    setShowQuiz(false);
  };

  const handleQuizSkip = () => {
    setShowQuiz(false);
  };

  // ================= MESSAGE / TOAST =================

  const showMessage = (text) => {
    setMessage(text);

    // Clear the previous timer so messages don't disappear early.
    window.clearTimeout(showMessage.timer);

    showMessage.timer = window.setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  // ================= SPIN WHEEL =================

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSpinResult("");

    const selectedIndex = Math.floor(
      Math.random() * spinRewards.length
    );

    const selectedReward = spinRewards[selectedIndex];

    const segmentAngle = 360 / spinRewards.length;
    const selectedCenterAngle =
      selectedIndex * segmentAngle + segmentAngle / 2;

    // Make the selected segment stop at the top pointer.
    const currentAngle = wheelRotation % 360;

    const alignmentRotation =
      (360 - ((currentAngle + selectedCenterAngle) % 360)) % 360;

    const extraSpins = 360 * 5;

    const finalRotation =
      wheelRotation + extraSpins + alignmentRotation;

    setWheelRotation(finalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSpinResult(selectedReward);

      // Save percentage rewards for Cart and Checkout.
      const percentMatch = selectedReward.match(
        /(\d+)%\s*OFF/i
      );

      if (percentMatch) {
        localStorage.setItem(
          DISCOUNT_STORAGE_KEY,
          percentMatch[1]
        );
      } else {
        // Remove any previous percentage discount if the new
        // result is not a percentage reward.
        localStorage.removeItem(DISCOUNT_STORAGE_KEY);
      }
    }, 4200);
  };

  // ================= FETCH PRODUCTS =================

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "http://localhost:3000/product"
      );

      const formatted = res.data.map((p) => ({
        id: p.id,
        name: p.name,
        title: p.name,
        image: p.image,
        price: p.price,
        stock: p.stock,
        category: p.category,
      }));

      setData(formatted);
    } catch (err) {
      console.log("Product fetch error:", err);
      showMessage("Unable to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= WISHLIST =================

  const addToWishlist = async (item) => {
    try {
      const user = getUser();

      if (!user) {
        showMessage("Please login to use Wishlist");
        return;
      }

      await axios.post(
        "http://localhost:3000/wishlist",
        {
          user_id: user.id,
          product_id: item.id,
        }
      );

      setWishlist((prev) => {
        const alreadyExists = prev.some(
          (p) => p.id === item.id
        );

        if (alreadyExists) {
          return prev;
        }

        return [...prev, item];
      });

      showMessage("Added to Wishlist ❤️");
    } catch (err) {
      console.log("Wishlist error:", err);
      showMessage("Unable to add to Wishlist");
    }
  };

  // ================= CART =================

  const addToCart = async (item) => {
    try {
      const user = getUser();

      if (!user) {
        showMessage("Please login to add items to Cart");
        return;
      }

      if (item.stock !== undefined && item.stock <= 0) {
        showMessage("This product is out of stock");
        return;
      }

      await axios.post(
        "http://localhost:3000/cart",
        {
          user_id: user.id,
          items: [
            {
              product_id: item.id,
              quantity: 1,
            },
          ],
        }
      );

      setCart((prev) => {
        const existing = prev.find(
          (p) => p.id === item.id
        );

        if (existing) {
          return prev.map((p) =>
            p.id === item.id
              ? {
                  ...p,
                  quantity: (p.quantity || 1) + 1,
                }
              : p
          );
        }

        return [
          ...prev,
          {
            ...item,
            quantity: 1,
          },
        ];
      });

      showMessage("Added to Cart 🛒");
    } catch (err) {
      console.log("Cart error:", err);
      showMessage("Unable to add to Cart");
    }
  };

  // ================= UI =================

  return (
    <>
      {/* Animated banner and toast styles */}
      <style>
        {`
          @keyframes smartCartMarquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          @keyframes smartCartGlow {
            0%, 100% {
              box-shadow: 0 8px 24px rgba(40, 20, 95, 0.12);
            }
            50% {
              box-shadow: 0 12px 32px rgba(40, 20, 95, 0.28);
            }
          }

          @keyframes smartCartFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-6px);
            }
          }

          @keyframes smartCartToastIn {
            from {
              opacity: 0;
              transform: translateY(-12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .smartcart-promo {
            position: relative;
            overflow: hidden;
            max-width: 1100px;
            margin: 28px auto;
            padding: 34px 24px;
            border-radius: 20px;
            box-sizing: border-box;
            color: white;
            text-align: center;
            background: linear-gradient(
              120deg,
              #28145f,
              #5633a5,
              #8b5cf6
            );
            animation: smartCartGlow 4s ease-in-out infinite;
          }

          .smartcart-promo::before {
            content: "";
            position: absolute;
            width: 220px;
            height: 220px;
            border-radius: 50%;
            background: rgba(255,255,255,0.08);
            top: -100px;
            left: -50px;
            pointer-events: none;
          }

          .smartcart-promo::after {
            content: "";
            position: absolute;
            width: 180px;
            height: 180px;
            border-radius: 50%;
            background: rgba(255,255,255,0.07);
            bottom: -100px;
            right: -30px;
            pointer-events: none;
          }

          .smartcart-promo-content {
            position: relative;
            z-index: 1;
          }

          .smartcart-promo-tag {
            display: inline-block;
            padding: 7px 15px;
            margin-bottom: 12px;
            border: 1px solid rgba(255,255,255,0.45);
            border-radius: 30px;
            background: rgba(255,255,255,0.13);
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 1px;
          }

          .smartcart-promo-title {
            margin: 0;
            font-size: clamp(28px, 5vw, 48px);
            font-weight: 800;
            line-height: 1.15;
          }

          .smartcart-promo-description {
            margin: 12px 0 20px;
            color: #f2edff;
            font-size: 16px;
          }

          .smartcart-promo-marquee {
            width: 100%;
            overflow: hidden;
            margin: 18px 0 22px;
            padding: 10px 0;
            border-top: 1px solid rgba(255,255,255,0.22);
            border-bottom: 1px solid rgba(255,255,255,0.22);
          }

          .smartcart-promo-marquee span {
            display: inline-block;
            white-space: nowrap;
            min-width: max-content;
            font-weight: 700;
            letter-spacing: 1px;
            animation: smartCartMarquee 13s linear infinite;
          }

          .smartcart-promo-button {
            display: inline-block;
            padding: 13px 28px;
            border: none;
            border-radius: 30px;
            background: #ffcf56;
            color: #28145f;
            font-size: 15px;
            font-weight: 800;
            text-decoration: none;
            cursor: pointer;
            transition: transform 0.2s ease, background 0.2s ease;
          }

          .smartcart-promo-button:hover {
            transform: translateY(-3px);
            background: #ffe08a;
          }

          .smartcart-promo-icon {
            display: inline-block;
            margin-bottom: 8px;
            font-size: 42px;
            animation: smartCartFloat 2.5s ease-in-out infinite;
          }

          .smartcart-toast {
            position: fixed;
            top: 90px;
            right: 20px;
            z-index: 9999;
            max-width: min(360px, calc(100vw - 40px));
            padding: 13px 20px;
            border-radius: 10px;
            background: #28145f;
            color: #ffffff;
            font-size: 15px;
            font-weight: 500;
            box-shadow: 0 5px 18px rgba(0, 0, 0, 0.22);
            animation: smartCartToastIn 0.25s ease-out;
          }

          @media (max-width: 600px) {
            .smartcart-promo {
              margin: 20px 12px;
              padding: 28px 16px;
              border-radius: 16px;
            }

            .smartcart-promo-description {
              font-size: 14px;
            }

            .smartcart-toast {
              top: 75px;
              right: 12px;
              left: 12px;
              max-width: none;
              text-align: center;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .smartcart-promo,
            .smartcart-promo-icon,
            .smartcart-promo-marquee span,
            .smartcart-toast {
              animation: none;
            }
          }
        `}
      </style>

      {/* Website toast notification - not a browser alert */}
      {message && (
        <div
          className="smartcart-toast"
          role="status"
          aria-live="polite"
        >
          {message}
        </div>
      )}

      {/* Offers Section */}
      <Offers />

      {/* Animated SmartCart Promo Banner */}
      <section className="smartcart-promo">
        <div className="smartcart-promo-content">
          <div className="smartcart-promo-icon">🛍️</div>

          <div>
            <span className="smartcart-promo-tag">
              WELCOME TO SMARTCART
            </span>
          </div>

          <h1 className="smartcart-promo-title">
            Your Shopping, Your Way!
          </h1>

          <p className="smartcart-promo-description">
            Discover your favourites, explore exciting offers,
            and enjoy a smarter shopping experience.
          </p>

          <div className="smartcart-promo-marquee">
            <span>
              ✨ EXPLORE PRODUCTS &nbsp; • &nbsp;
              🎁 DISCOVER OFFERS &nbsp; • &nbsp;
              🎡 SPIN AND WIN &nbsp; • &nbsp;
              🛒 SHOP SMART WITH SMARTCART &nbsp; • &nbsp;
            </span>
          </div>

          <a
            href="#home-products"
            className="smartcart-promo-button"
          >
            Explore Products ↓
          </a>
        </div>
      </section>

      {/* Spin Wheel Section */}
      <section
        style={{
          margin: "30px auto",
          padding: "30px 20px",
          maxWidth: "1100px",
          background: "linear-gradient(135deg, #fff7e6, #f2eaff)",
          borderRadius: "18px",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            color: "#28145f",
            marginTop: 0,
            marginBottom: "8px",
          }}
        >
          🎡 Spin & Win
        </h2>

        <p style={{ color: "#555", marginBottom: "25px" }}>
          Spin the wheel and discover your demo shopping reward!
        </p>

        <div
          style={{
            position: "relative",
            width: "min(300px, 80vw)",
            height: "min(300px, 80vw)",
            margin: "0 auto 25px",
          }}
        >
          {/* Pointer */}
          <div
            style={{
              position: "absolute",
              top: "-8px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 3,
              width: 0,
              height: 0,
              borderLeft: "17px solid transparent",
              borderRight: "17px solid transparent",
              borderTop: "35px solid #28145f",
              filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.2))",
            }}
          />

          {/* Wheel */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "8px solid #28145f",
              boxSizing: "border-box",
              position: "relative",
              overflow: "hidden",
              background:
                "conic-gradient(#ffcf56 0deg 60deg, #ff8a65 60deg 120deg, #80cbc4 120deg 180deg, #b39ddb 180deg 240deg, #90caf9 240deg 300deg, #f48fb1 300deg 360deg)",
              transform: `rotate(${wheelRotation}deg)`,
              transition: isSpinning
                ? "transform 4s cubic-bezier(0.12, 0.75, 0.15, 1)"
                : "none",
              boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
            }}
          >
            {spinRewards.map((reward, index) => {
              const angle =
                index * (360 / spinRewards.length) +
                360 / spinRewards.length / 2;

              return (
                <div
                  key={`${reward}-${index}`}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "90px",
                    marginLeft: "-45px",
                    marginTop: "-13px",
                    textAlign: "center",
                    fontWeight: "800",
                    fontSize: "13px",
                    color: "#28145f",
                    transform: `rotate(${angle}deg) translateY(-91px) rotate(90deg)`,
                    transformOrigin: "center",
                  }}
                >
                  {reward}
                </div>
              );
            })}
          </div>

          {/* Center Button */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "#28145f",
              border: "5px solid white",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "800",
              fontSize: "13px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              zIndex: 2,
            }}
          >
            SMART
          </div>
        </div>

        <button
          type="button"
          onClick={handleSpin}
          disabled={isSpinning}
          style={{
            background: isSpinning ? "#999" : "#28145f",
            color: "white",
            border: "none",
            borderRadius: "25px",
            padding: "13px 35px",
            fontSize: "16px",
            fontWeight: "700",
            cursor: isSpinning ? "not-allowed" : "pointer",
            boxShadow: "0 4px 12px rgba(40,20,95,0.2)",
          }}
        >
          {isSpinning ? "Spinning..." : "SPIN NOW 🎡"}
        </button>

        {spinResult && (
          <div
            role="status"
            style={{
              margin: "20px auto 0",
              maxWidth: "400px",
              padding: "16px",
              background: "white",
              border: "2px solid #42b883",
              borderRadius: "12px",
              color: "#234d35",
            }}
          >
            <h3 style={{ margin: "0 0 8px" }}>
              🎉 You got: {spinResult}
            </h3>

            <p style={{ margin: 0, fontSize: "13px" }}>
              {spinResult.match(/(\d+)%\s*OFF/i)
                ? "Your demo discount is saved for Cart and Checkout."
                : spinResult === "Free Delivery"
                ? "Demo reward only. Free delivery is not applied to checkout yet."
                : "Better luck next time! Spin again to try another reward."}
            </p>
          </div>
        )}
      </section>

      {/* Products Section */}
      <section
        id="home-products"
        style={{
          padding: "30px 5%",
          scrollMarginTop: "30px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Our Products
        </h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>
            Loading products...
          </p>
        ) : data.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            No products available.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "25px",
            }}
          >
            {data.map((item) => (
              <div
                key={item.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "15px",
                  textAlign: "center",
                  background: "white",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
                }}
              >
                {/* Product Image */}
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                      marginBottom: "10px",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f5f5f5",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  >
                    No Image
                  </div>
                )}

                {/* Product Details */}
                <h3>{item.name}</h3>

                {item.category && (
                  <p style={{ color: "#777" }}>
                    {item.category}
                  </p>
                )}

                <h3 style={{ color: "#222" }}>
                  ₹{item.price}
                </h3>

                {item.stock > 0 ? (
                  <p>Stock: {item.stock}</p>
                ) : (
                  <p
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      background: "#ffe5e5",
                      padding: "8px",
                      borderRadius: "6px",
                    }}
                  >
                    SOLD OUT
                  </p>
                )}

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(item)}
                  disabled={
                    item.stock !== undefined &&
                    item.stock <= 0
                  }
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "8px",
                    border: "none",
                    borderRadius: "6px",
                    background:
                      item.stock <= 0 ? "#999" : "#222",
                    color: "white",
                    cursor:
                      item.stock <= 0
                        ? "not-allowed"
                        : "pointer",
                  }}
                >
                  {item.stock <= 0
                    ? "Out of Stock"
                    : "Add to Cart 🛒"}
                </button>

                {/* Add to Wishlist */}
                <button
                  onClick={() => addToWishlist(item)}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #222",
                    borderRadius: "6px",
                    background: "white",
                    color: "#222",
                    cursor: "pointer",
                  }}
                >
                  Add to Wishlist ❤️
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}